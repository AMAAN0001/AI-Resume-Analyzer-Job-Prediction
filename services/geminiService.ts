import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summaryCard: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Candidate's full name." },
        email: { type: Type.STRING, description: "Candidate's email address." },
        phone: { type: Type.STRING, description: "Candidate's phone number." },
        totalExperience: { type: Type.STRING, description: "Total years/months of experience, e.g., '8 years'." },
        topSkills: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Top 5 most relevant skills."
        },
        predictedLevel: { type: Type.STRING, description: "Predicted seniority, e.g., 'Senior', 'Mid-Level'." },
      },
    },
    jobPrediction: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          description: "Classify the profile as 'Tech' or 'Non-Tech'."
        },
        predictedRole: {
          type: Type.STRING,
          description: "The most likely job role, e.g., 'Backend Developer'."
        },
        confidenceScore: {
          type: Type.NUMBER,
          description: "A confidence score between 0.0 and 1.0 for the prediction. This represents the candidate's 'Job Fit' for this role."
        },
        explanation: {
          type: Type.STRING,
          description: "A brief, 1-2 sentence explanation for the predicted role based on skills and projects."
        }
      },
      description: "A prediction of the candidate's most likely job role based on their skills and projects."
    },
    jobMatches: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          company: { type: Type.STRING },
          similarity: { type: Type.NUMBER, description: "Similarity score from 0-100." },
          explanation: { type: Type.STRING, description: "Brief reason for the match." },
        },
      },
      description: "Top 3-5 matching job roles, similar to the predicted role."
    },
    gapAnalysis: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        gaps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              gap: { type: Type.STRING, description: "A specific weakness or missing skill/experience required for the predicted role. Be specific and quantify if possible (e.g., 'Lacks 2+ years of cloud experience')." },
              suggestion: { type: Type.STRING, description: "An actionable suggestion to address the gap." },
            },
          },
        },
      },
    },
    bulletRewrites: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING, description: "The original bullet point from the resume." },
          rewritten: { type: Type.ARRAY, items: { type: Type.STRING }, description: "1-2 achievement-focused rewrites, tailored to the predicted role." },
        },
      },
      description: "Up to 5 suggested bullet point improvements."
    },
    interviewQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "8 interview questions specific to the predicted role, from basic to advanced."
    },
    salaryExpectation: {
      type: Type.OBJECT,
      properties: {
        range: { type: Type.STRING, description: "e.g., '$150,000 - $180,000'." },
        level: { type: Type.STRING, description: "e.g., 'Senior Engineer (L5)'." },
      },
      description: "Salary expectation for the predicted role in the San Francisco, CA market."
    },
    careerRoadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING, description: "Skill to learn to improve for the predicted role." },
          reason: { type: Type.STRING, description: "Why it's important for the predicted role." },
          resource: { type: Type.STRING, description: "A suggested resource or course." },
        },
      },
    },
  },
};

export const analyzeResume = async (resumeText: string): Promise<AnalysisResult> => {
  const prompt = `
    System: You are an expert career coach and resume analysis AI system. Your primary task is to first determine the most likely job role for the candidate based on their resume, and then provide a comprehensive analysis based on that predicted role. Your output MUST be a single, valid JSON object that adheres to the provided schema and nothing else. Do not include markdown formatting like \`\`\`json ... \`\`\`.

    Candidate Resume Text:
    ---
    ${resumeText}
    ---

    Analysis Tasks (all relative to the predicted top job role):
    1.  **Job Role Prediction:** Based on the candidate's skills and projects, determine their most suitable job role.
        - Classify the profile as 'Tech' or 'Non-Tech'.
        - State the predicted job role (e.g., 'Backend Developer').
        - Provide a confidence score (0.0 to 1.0) for this prediction. This score represents the candidate's "Job Fit" for this role.
        - Write a brief explanation for your reasoning.
        - Populate the 'jobPrediction' field.
    2.  **Detailed Analysis:** Based on the predicted role from step 1, fill out the rest of the JSON schema:
        - **Gap Analysis:** Identify key skills or experiences missing for the predicted role. Be specific and quantify the gap where possible (e.g., "Needs 2 more years of experience with cloud platforms," or "Lacks a major project using modern state management libraries like Redux/Zustand.").
        - **Job Matches:** Recommend 3-5 similar job roles.
        - **Bullet Rewrites:** Improve bullet points to better align with the predicted role.
        - **Interview Questions:** Generate questions relevant to the predicted role.
        - **Salary Expectation:** Provide a salary estimate appropriate for the predicted role in the San Francisco, CA market.
        - **Career Roadmap:** Suggest skills to learn to become a stronger candidate for the predicted role.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.3,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};