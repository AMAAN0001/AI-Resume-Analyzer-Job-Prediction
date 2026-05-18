import React, { useState, useEffect } from 'react';
import { CandidateSubmission } from '../types';
import { resumeAPI } from '../services/apiClient';
import { resumeStorageService } from '../services/resumeStorageService';
import Spinner from './common/Spinner';

interface CandidateDetailProps {
  candidate: CandidateSubmission;
  isOpen: boolean;
  onClose: () => void;
}

const CandidateDetailModal: React.FC<CandidateDetailProps> = ({ candidate, isOpen, onClose }) => {
  if (!isOpen) return null;

  const analysis = candidate.analysisResult;
  const jobPrediction = candidate.jobPrediction;
  const atsScore = candidate.atsScore || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed right-0 top-0 h-screen w-full md:w-2/3 lg:w-1/2 bg-white overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{analysis?.summaryCard?.name || candidate.userName}</h2>
            <p className="text-white/80">{candidate.userEmail}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* ATS Score & Job Prediction */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">ATS Score</p>
              <p className="text-3xl font-bold text-purple-600">{atsScore}%</p>
            </div>
            {jobPrediction && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Predicted Role</p>
                <p className="text-lg font-bold text-blue-600">{jobPrediction.predictedRole}</p>
                <p className="text-xs text-blue-500 mt-1">Confidence: {(jobPrediction.confidenceScore * 100).toFixed(0)}%</p>
              </div>
            )}
          </div>

          {/* Summary Card */}
          {analysis?.summaryCard && (
            <div className="bg-white border-2 border-purple-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-3">Professional Summary</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {analysis.summaryCard.phone && (
                  <p><span className="font-semibold">Phone:</span> {analysis.summaryCard.phone}</p>
                )}
                {analysis.summaryCard.totalExperience && (
                  <p><span className="font-semibold">Experience:</span> {analysis.summaryCard.totalExperience}</p>
                )}
                {analysis.summaryCard.predictedLevel && (
                  <p><span className="font-semibold">Level:</span> {analysis.summaryCard.predictedLevel}</p>
                )}
                {analysis.summaryCard.topSkills?.length > 0 && (
                  <div>
                    <p className="font-semibold">Top Skills:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {analysis.summaryCard.topSkills.slice(0, 5).map((skill, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Matches */}
          {analysis?.jobMatches && analysis.jobMatches.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Matching Job Roles</h3>
              <div className="space-y-2">
                {analysis.jobMatches.slice(0, 5).map((match, idx) => (
                  <div key={idx} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{match.role}</p>
                        {match.company && <p className="text-sm text-gray-600">{match.company}</p>}
                      </div>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                        {(match.similarity * 100).toFixed(0)}%
                      </span>
                    </div>
                    {match.explanation && (
                      <p className="text-xs text-gray-600 mt-2">{match.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {analysis?.experience && analysis.experience.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Experience</h3>
              <div className="space-y-3">
                {analysis.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-purple-600 pl-4">
                    <p className="font-semibold text-gray-900">{exp.position}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">{exp.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {analysis?.education && analysis.education.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Education</h3>
              <div className="space-y-3">
                {analysis.education.map((edu, idx) => (
                  <div key={idx} className="border-l-4 border-blue-600 pl-4">
                    <p className="font-semibold text-gray-900">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job Prediction Details */}
          {jobPrediction && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">Job Category Analysis</h3>
              <p className="text-sm text-gray-700">{jobPrediction.explanation}</p>
            </div>
          )}

          {/* Gaps & Recommendations */}
          {analysis?.gapAnalysis && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Gap Analysis</h3>
              {analysis.gapAnalysis.strengths?.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold text-green-600 text-sm mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {analysis.gapAnalysis.strengths.slice(0, 3).map((strength, idx) => (
                      <li key={idx} className="text-sm text-gray-600">✓ {strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.gapAnalysis.gaps?.length > 0 && (
                <div>
                  <p className="font-semibold text-orange-600 text-sm mb-2">Areas to Develop</p>
                  <ul className="space-y-1">
                    {analysis.gapAnalysis.gaps.slice(0, 3).map((gap, idx) => (
                      <li key={idx} className="text-sm text-gray-600">• {gap.gap}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface EnhancedRecruiterDashboardProps {
  onViewCandidates?: (candidateId: string) => void;
}

const EnhancedRecruiterDashboard: React.FC<EnhancedRecruiterDashboardProps> = ({ onViewCandidates }) => {
  const [candidates, setCandidates] = useState<CandidateSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateSubmission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByRole, setFilterByRole] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await resumeAPI.getAllResumes();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.warn('Backend API failed, using localStorage:', err);
      // Fallback to localStorage if backend is unavailable
      const localCandidates = resumeStorageService.getAllResumes();
      setCandidates(localCandidates);
      
      if (localCandidates.length === 0) {
        setError('Unable to connect to server. Showing cached submissions only.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (candidate: CandidateSubmission) => {
    setSelectedCandidate(candidate);
    setIsDetailOpen(true);
  };

  // Filter and sort candidates
  let filteredCandidates = candidates.filter(candidate => {
    const searchMatch = 
      candidate.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.parsedData?.skills?.some(skill => skill?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const roleMatch = filterByRole === 'all' || candidate.jobPrediction?.predictedRole?.includes(filterByRole);
    
    return searchMatch && roleMatch;
  });

  if (sortBy === 'latest') {
    filteredCandidates.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  } else if (sortBy === 'ats-high') {
    filteredCandidates.sort((a, b) => (b.atsScore || 0) - (a.atsScore || 0));
  } else if (sortBy === 'name') {
    filteredCandidates.sort((a, b) => (a.userName || '').localeCompare(b.userName || ''));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-gray-600 mt-2">View all submitted resumes and candidate profiles</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-purple-600">{candidates.length}</p>
          <p className="text-gray-600 text-sm">Total Submissions</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Role */}
          <select
            value={filterByRole}
            onChange={(e) => setFilterByRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
            <option value="Engineer">Engineer</option>
            <option value="Designer">Designer</option>
            <option value="Analyst">Analyst</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="latest">Latest Submissions</option>
            <option value="ats-high">Highest ATS Score</option>
            <option value="name">By Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}

      {/* Candidates List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
            <button
              onClick={fetchCandidates}
              className="ml-4 underline hover:no-underline font-semibold"
            >
              Retry
            </button>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <p className="text-blue-700 font-semibold">No candidates found</p>
            <p className="text-blue-600 text-sm mt-1">
              {candidates.length === 0
                ? 'Waiting for students to submit resumes...'
                : 'Try adjusting your search filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate._id}
                className="bg-white border-2 border-gray-200 hover:border-purple-500 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg"
                onClick={() => handleViewDetails(candidate)}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{candidate.analysisResult?.summaryCard?.name || candidate.userName}</h3>
                    <p className="text-sm text-gray-600">{candidate.userEmail}</p>
                  </div>
                  {candidate.atsScore && (
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                      ATS: {candidate.atsScore}%
                    </div>
                  )}
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {candidate.jobPrediction && (
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="text-xs text-gray-600">Predicted Role</p>
                      <p className="text-sm font-bold text-blue-600">{candidate.jobPrediction.predictedRole}</p>
                    </div>
                  )}
                  {candidate.parsedData?.skills?.length > 0 && (
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-xs text-gray-600">Skills</p>
                      <p className="text-sm font-bold text-green-600">{candidate.parsedData.skills.length}+</p>
                    </div>
                  )}
                </div>

                {/* Skills Preview */}
                {candidate.parsedData?.skills?.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {candidate.parsedData.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {candidate.parsedData.skills.length > 4 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                          +{candidate.parsedData.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Job Matches */}
                {candidate.analysisResult?.jobMatches && candidate.analysisResult.jobMatches.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Top Match</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {candidate.analysisResult.jobMatches[0]?.role}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {candidate.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                  <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedRecruiterDashboard;
