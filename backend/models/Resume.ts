import mongoose, { Document, Schema } from "mongoose";

export interface IResume extends Document {
  userId: string;
  userName: string;
  userEmail: string;
  fileName: string;
  fileContent: string;
  parsedData: {
    name?: string;
    email?: string;
    phone?: string;
    experience?: Array<{
      title: string;
      company: string;
      duration: string;
    }>;
    education?: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    skills?: string[];
  };
  analysisResult?: Record<string, any>; // Full AI analysis result
  jobMatches?: Array<{
    jobTitle: string;
    matchScore: number;
    company: string;
  }>;
  jobPrediction?: {
    category: string;
    predictedRole: string;
    confidenceScore: number;
    explanation: string;
  };
  atsScore?: number;
  fitScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileContent: {
      type: String,
      required: true,
    },
    parsedData: {
      name: String,
      email: String,
      phone: String,
      experience: [
        {
          title: String,
          company: String,
          duration: String,
        },
      ],
      education: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],
      skills: [String],
    },
    analysisResult: Schema.Types.Mixed,
    jobMatches: [
      {
        jobTitle: String,
        matchScore: Number,
        company: String,
      },
    ],
    jobPrediction: {
      category: String,
      predictedRole: String,
      confidenceScore: Number,
      explanation: String,
    },
    atsScore: Number,
    fitScore: Number,
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model<IResume>("Resume", ResumeSchema);
