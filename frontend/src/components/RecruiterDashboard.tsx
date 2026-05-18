import React, { useState } from 'react';
import { RecruiterJob } from '../types';
import ShortlistedCandidates from './ShortlistedCandidates';

interface RecruiterDashboardProps {
  onViewCandidates?: (jobId: string) => void;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onViewCandidates }) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  // Mock data - replace with API call
  const recruiterJobs: RecruiterJob[] = [
    {
      id: 'job-001',
      title: 'Senior Full Stack Developer',
      domain: 'Technology',
      applicationsCount: 45,
      lastUpdated: '2 hours ago',
      status: 'active',
    },
    {
      id: 'job-002',
      title: 'Product Manager',
      domain: 'Product Management',
      applicationsCount: 28,
      lastUpdated: '1 day ago',
      status: 'active',
    },
    {
      id: 'job-003',
      title: 'DevOps Engineer',
      domain: 'Infrastructure',
      applicationsCount: 32,
      lastUpdated: '3 days ago',
      status: 'active',
    },
    {
      id: 'job-004',
      title: 'Data Scientist',
      domain: 'Data & Analytics',
      applicationsCount: 56,
      lastUpdated: '5 hours ago',
      status: 'active',
    },
    {
      id: 'job-005',
      title: 'UX/UI Designer',
      domain: 'Design',
      applicationsCount: 22,
      lastUpdated: '1 week ago',
      status: 'closed',
    },
  ];

  const handleViewCandidates = (jobId: string) => {
    setSelectedJobId(jobId);
    onViewCandidates?.(jobId);
  };

  if (selectedJobId) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedJobId(null)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </button>
        <ShortlistedCandidates jobId={selectedJobId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage job postings and view candidate applications</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200">
          + Post New Job
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Job Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Domain</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Applications</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recruiterJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {job.domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-semibold text-gray-900">{job.applicationsCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.lastUpdated}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      job.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {job.status === 'active' ? '🟢 Active' : '🔴 Closed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleViewCandidates(job.id)}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      View Candidates
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{recruiterJobs.filter(j => j.status === 'active').length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{recruiterJobs.reduce((sum, j) => sum + j.applicationsCount, 0)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646zM12 14a5 5 0 100-10 5 5 0 000 10z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Applications/Job</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {Math.round(recruiterJobs.reduce((sum, j) => sum + j.applicationsCount, 0) / recruiterJobs.length)}
              </p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
