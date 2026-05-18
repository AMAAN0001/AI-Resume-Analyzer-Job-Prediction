
import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult } from '../types';
import { analyzeATSScore } from './atsService';
import { API_CONFIG } from '../config';

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
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          position: { type: Type.STRING, description: "Job title/position." },
          company: { type: Type.STRING, description: "Company name." },
          duration: { type: Type.STRING, description: "Duration, e.g., 'Jan 2020 - Present' or '2 years'." },
          description: { type: Type.STRING, description: "Brief description of responsibilities and achievements." },
        },
      },
      description: "Work experience chronology, ordered from most recent to oldest."
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING, description: "Degree name, e.g., 'B.S. in Computer Science'." },
          institution: { type: Type.STRING, description: "School/University name." },
          year: { type: Type.STRING, description: "Graduation year or period, e.g., '2020' or 'May 2020'." },
          details: { type: Type.STRING, description: "Optional additional details like GPA, honors, or relevant coursework." },
        },
      },
      description: "Educational background, ordered from most recent to oldest."
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
          industry: { type: Type.STRING, description: "Industry sector, e.g., 'Technology', 'Finance', 'Healthcare'." },
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
        range: { type: Type.STRING, description: "e.g., '₹25,00,000 - ₹30,00,000' (in Indian Rupees)." },
        level: { type: Type.STRING, description: "e.g., 'Senior Engineer (L5)'." },
      },
      description: "Salary expectation for the predicted role in the Indian market (in Indian Rupees)."
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
  const apiKey = API_CONFIG.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error("❌ API Key Error: Gemini API key is not configured. Please add your API key to config.ts");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    System: You are an expert career coach and resume analysis AI system. Your primary task is to first determine the most likely job role for the candidate based on their resume, and then provide a comprehensive analysis based on that predicted role. Your output MUST be a single, valid JSON object that adheres to the provided schema and nothing else. Do not include markdown formatting like \`\`\`json ... \`\`\`.

    Candidate Resume Text:
    ---
    ${resumeText}
    ---

    Analysis Tasks (all relative to the predicted top job role):
    1.  **Extract Resume Information:**
        - Extract all work experience entries in reverse chronological order (most recent first).
        - Extract all education entries in reverse chronological order (most recent first).
        - Populate the 'experience' and 'education' fields with chronological data.
    2.  **Job Role Prediction:** Based on the candidate's skills and projects, determine their most suitable job role.
        - Classify the profile as 'Tech' or 'Non-Tech'.
        - State the predicted job role (e.g., 'Backend Developer').
        - Provide a confidence score (0.0 to 1.0) for this prediction. This score represents the candidate's "Job Fit" for this role.
        - Write a brief explanation for your reasoning.
        - Populate the 'jobPrediction' field.
    3.  **Detailed Analysis:** Based on the predicted role from step 2, fill out the rest of the JSON schema:
        - **Gap Analysis:** Identify key skills or experiences missing for the predicted role. Be specific and quantify the gap where possible (e.g., "Needs 2 more years of experience with cloud platforms," or "Lacks a major project using modern state management libraries like Redux/Zustand.").
        - **Job Matches:** Recommend 3-5 similar job roles with industry information.
        - **Bullet Rewrites:** Improve bullet points to better align with the predicted role.
        - **Interview Questions:** Generate questions relevant to the predicted role.
        - **Salary Expectation:** Provide a salary estimate appropriate for the predicted role in the Indian market (in Indian Rupees, format: ₹X,XX,XXX - ₹X,XX,XXX).
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

    // Check if response exists and has text
    if (!response || !response.text) {
      throw new Error("Empty response from AI model. Please try again.");
    }

    const jsonText = response.text.trim();
    
    // Validate JSON response
    if (!jsonText || jsonText.length === 0) {
      throw new Error("Received empty response from AI. Please try again.");
    }

    let analysisResult;
    try {
      analysisResult = JSON.parse(jsonText) as AnalysisResult;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Response text:", jsonText.substring(0, 200));
      throw new Error("Failed to parse AI response. The response format may be invalid. Please try again.");
    }
    
    // Add ATS Score analysis
    const atsScore = analyzeATSScore(resumeText);
    analysisResult.atsScore = atsScore;
    
    return analysisResult;

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    
    // Handle specific error cases
    const errorMessage = error.message || error.toString();
    
    if (errorMessage.includes('API key') || errorMessage.includes('invalid') || errorMessage.includes('INVALID_ARGUMENT')) {
      throw new Error("❌ API Key Error: Your Gemini API key is invalid. Please check your API key and try again. Visit https://aistudio.google.com to verify your key.");
    }
    
    if (errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      throw new Error("⚠️ Rate Limit Error: You've exceeded your API quota. Please wait a few minutes before trying again or upgrade your API plan at https://aistudio.google.com");
    }
    
    if (errorMessage.includes('timeout') || errorMessage.includes('DEADLINE_EXCEEDED')) {
      throw new Error("⏱️ Timeout Error: The request took too long. Please check your internet connection and try again.");
    }
    
    if (errorMessage.includes('permission') || errorMessage.includes('PERMISSION_DENIED')) {
      throw new Error("🔒 Permission Error: Your API key doesn't have permission to use this model. Please check your API key permissions.");
    }
    
    if (errorMessage.includes('503') || errorMessage.includes('SERVICE_UNAVAILABLE')) {
      throw new Error("🔧 Service Unavailable: Google AI service is temporarily down. Please wait a few moments and try again.");
    }
    
    if (errorMessage.includes('network') || errorMessage.includes('Network')) {
      throw new Error("🌐 Network Error: Failed to connect to the AI service. Please check your internet connection and try again.");
    }
    
    if (errorMessage.includes('Empty response') || errorMessage.includes('parse')) {
      throw new Error("⚠️ Invalid Response: The AI service returned an invalid response. This might be temporary - please try again.");
    }
    
    // Default error message with troubleshooting steps
    throw new Error(
      "❌ Failed to analyze resume. This could be due to:\n" +
      "1. Invalid or expired API key\n" +
      "2. API quota exceeded (wait a few minutes)\n" +
      "3. Service temporarily unavailable (try again)\n" +
      "4. Network connectivity issues\n\n" +
      "Please verify your API key at https://aistudio.google.com and try again."
    );
  }
};
