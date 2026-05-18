import express, { Router, Request, Response } from "express";
import { Resume } from "../models/Resume";

const router = Router();

// Upload/Create resume
router.post("/upload", async (req: Request, res: Response) => {
  try {
    const { userId, userName, userEmail, fileName, fileContent, parsedData, analysisResult, jobPrediction, atsScore } = req.body;

    const newResume = new Resume({
      userId,
      userName,
      userEmail,
      fileName,
      fileContent,
      parsedData,
      analysisResult,
      jobPrediction,
      atsScore,
    });

    await newResume.save();
    res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: newResume._id,
      resume: newResume,
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ error: "Resume upload failed" });
  }
});

// Get all resumes (for recruiter dashboard)
router.get("/all", async (req: Request, res: Response) => {
  try {
    const resumes = await Resume.find({}).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

// Get all resumes for a user
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

// Get resume by ID
router.get("/:resumeId", async (req: Request, res: Response) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resume" });
  }
});

// Update resume with job matches and fit score
router.put("/:resumeId", async (req: Request, res: Response) => {
  try {
    const { jobMatches, fitScore, analysisResult, jobPrediction, atsScore } = req.body;
    const resume = await Resume.findByIdAndUpdate(
      req.params.resumeId,
      { jobMatches, fitScore, analysisResult, jobPrediction, atsScore },
      { new: true }
    );
    res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update resume" });
  }
});

// Delete resume
router.delete("/:resumeId", async (req: Request, res: Response) => {
  try {
    await Resume.findByIdAndDelete(req.params.resumeId);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resume" });
  }
});

export default router;
