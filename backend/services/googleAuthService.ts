import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid token payload");
    }

    // Validate required fields
    if (!payload.email || !payload.sub) {
      throw new Error("Google token missing required fields (email, sub)");
    }

    return {
      email: payload.email,
      name: payload.name || "User",
      picture: payload.picture,
      sub: payload.sub,
    };
  } catch (error) {
    throw new Error("Google token verification failed");
  }
};

export const handleGoogleAuth = async (googleData: {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}) => {
  try {
    // Check if user exists
    let user = await User.findOne({ email: googleData.email });

    if (!user) {
      // Create new user from Google data
      const nameParts = googleData.name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      user = new User({
        email: googleData.email,
        firstName,
        lastName,
        password: `google_${googleData.sub}`, // Google OAuth password
        role: "applicant",
      });

      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    return {
      success: true,
      token: jwtToken,
      user: {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  } catch (error) {
    throw new Error("Google authentication failed");
  }
};

export const generateJWT = (userId: string, email: string, role: string) => {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    process.env.JWT_SECRET || "your_jwt_secret_key",
    { expiresIn: "7d" }
  );
};
