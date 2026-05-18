const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Auth API calls
export const authAPI = {
  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        role,
      }),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

  googleLogin: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Google login failed");
    }
    return response.json();
  },

  getUser: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  },
};

// Resume API calls
export const resumeAPI = {
  uploadResume: async (
    userId: string,
    userName: string,
    userEmail: string,
    fileName: string,
    fileContent: string,
    parsedData: Record<string, any>,
    analysisResult?: Record<string, any>,
    jobPrediction?: Record<string, any>,
    atsScore?: number
  ) => {
    const response = await fetch(`${API_BASE_URL}/resumes/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userName,
        userEmail,
        fileName,
        fileContent,
        parsedData,
        analysisResult,
        jobPrediction,
        atsScore,
      }),
    });
    if (!response.ok) throw new Error("Resume upload failed");
    return response.json();
  },

  getAllResumes: async () => {
    const response = await fetch(`${API_BASE_URL}/resumes/all`);
    if (!response.ok) throw new Error("Failed to fetch resumes");
    return response.json();
  },

  getUserResumes: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/resumes/user/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch resumes");
    return response.json();
  },

  getResume: async (resumeId: string) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`);
    if (!response.ok) throw new Error("Failed to fetch resume");
    return response.json();
  },

  updateResume: async (
    resumeId: string,
    jobMatches?: Record<string, any>,
    fitScore?: number,
    analysisResult?: Record<string, any>,
    jobPrediction?: Record<string, any>,
    atsScore?: number
  ) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobMatches, fitScore, analysisResult, jobPrediction, atsScore }),
    });
    if (!response.ok) throw new Error("Failed to update resume");
    return response.json();
  },

  deleteResume: async (resumeId: string) => {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete resume");
    return response.json();
  },
};
