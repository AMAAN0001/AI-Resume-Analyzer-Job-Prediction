export interface Gap {
  gap: string;
  suggestion: string;
}

export interface RewrittenBullet {
  original: string;
  rewritten: string[];
}

export interface JobMatch {
  role: string;
  company: string;
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

export interface AnalysisResult {
  summaryCard: {
    name: string;
    email: string;
    phone: string;
    totalExperience: string;
    topSkills: string[];
    predictedLevel: string;
  };
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
}