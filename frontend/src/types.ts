export interface Gap {
  gap: string;
  suggestion: string;
}

export interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface RewrittenBullet {
  original: string;
  rewritten: string[];
}

export interface JobMatch {
  role: string;
  company: string;
  industry?: string;
  similarity: number;
  explanation: string;
}

export interface SkillToLearn {
  skill: string;
  reason: string;
  resource: string;
}

export interface JobPrediction {
  category: 'Tech' | 'Non-Tech' | 'Other';
  predictedRole: string;
  confidenceScore: number; // A value between 0 and 1
  explanation: string;
}

export interface ATSIssue {
  type: 'formatting' | 'keyword' | 'structure' | 'content';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  suggestion: string;
}

export interface ATSScore {
  overallScore: number; // 0-100
  keywordMatch: number; // 0-100
  formatting: number; // 0-100
  structure: number; // 0-100
  issues: ATSIssue[];
  strengths: string[];
  recommendations: string[];
  parseability: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface AnalysisResult {
  summaryCard: {
    name: string;
    email: string;
    phone: string;
    totalExperience: string;
    topSkills: string[];
    predictedLevel: string;
  };
  experience?: Experience[];
  education?: Education[];
  jobPrediction: JobPrediction;
  jobMatches: JobMatch[];
  gapAnalysis: {
    strengths: string[];
    gaps: Gap[];
  };
  bulletRewrites: RewrittenBullet[];
  interviewQuestions: string[];
  salaryExpectation: {
    range: string;
    level: string;
  };
  careerRoadmap: SkillToLearn[];
  atsScore?: ATSScore;
}

// Recruiter Dashboard Types
export interface RecruiterJob {
  id: string;
  title: string;
  domain: string;
  applicationsCount: number;
  lastUpdated: string;
  status: 'active' | 'closed';
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  matchScore: number;
  similarityScore: number;
  classificationScore: number;
  matchedSkillsCount: number;
  totalSkills: number;
  status: 'shortlisted' | 'rejected' | 'pending';
  appliedFor: string;
}

export interface CandidateSubmission {
  _id?: string;
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
  analysisResult?: AnalysisResult | Record<string, any>;
  jobPrediction?: JobPrediction | Record<string, any>;
  atsScore?: number;
  createdAt?: string;
  updatedAt?: string;
}
