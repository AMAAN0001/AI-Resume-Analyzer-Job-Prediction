import { CandidateSubmission } from '../types';

const RESUMES_STORAGE_KEY = 'ResAI-submitted-resumes';

class ResumeStorageService {
  // Get all stored resumes from localStorage
  getAllResumes(): CandidateSubmission[] {
    try {
      const stored = localStorage.getItem(RESUMES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get resumes from localStorage:', error);
      return [];
    }
  }

  // Save a resume submission
  saveResume(resume: CandidateSubmission): void {
    try {
      const resumes = this.getAllResumes();
      // Add _id if not present
      if (!resume._id) {
        resume._id = `resume-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }
      resumes.unshift(resume); // Add to beginning for latest first
      localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
    } catch (error) {
      console.error('Failed to save resume to localStorage:', error);
    }
  }

  // Get resume by ID
  getResume(id: string): CandidateSubmission | null {
    try {
      const resumes = this.getAllResumes();
      return resumes.find(r => r._id === id) || null;
    } catch (error) {
      console.error('Failed to get resume from localStorage:', error);
      return null;
    }
  }

  // Delete a resume
  deleteResume(id: string): void {
    try {
      const resumes = this.getAllResumes();
      const filtered = resumes.filter(r => r._id !== id);
      localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete resume from localStorage:', error);
    }
  }

  // Clear all resumes
  clearAll(): void {
    try {
      localStorage.removeItem(RESUMES_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear resumes:', error);
    }
  }
}

export const resumeStorageService = new ResumeStorageService();
