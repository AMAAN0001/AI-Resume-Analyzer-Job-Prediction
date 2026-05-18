import express, { Router, Request, Response } from "express";
import { User } from "../models/User";
import { verifyGoogleToken, handleGoogleAuth, generateJWT } from "../services/googleAuthService";

const router = Router();

// Register user
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      email,
      password, // In production, hash this password
      firstName,
      lastName,
      role: role || "applicant",
    });

    await newUser.save();

    // Generate JWT
    const token = generateJWT(
      newUser._id.toString(),
      newUser.email,
      newUser.role
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        userId: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check password (in production, use bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT
    const token = generateJWT(user._id.toString(), user.email, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Google OAuth endpoint
router.post("/google", async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Google token is required" });
    }

    // Verify Google token
    const googleData = await verifyGoogleToken(token);

    // Handle Google authentication
    const result = await handleGoogleAuth(googleData);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message || "Google authentication failed" });
  }
});

// Get user by ID
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
