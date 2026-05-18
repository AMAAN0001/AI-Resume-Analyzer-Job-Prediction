import React, { useState, useMemo } from 'react';
import { Candidate } from '../types';

interface ShortlistedCandidatesProps {
  jobId: string;
}

type SortField = 'name' | 'matchScore' | 'similarityScore' | 'classificationScore' | 'matchedSkillsCount';
type SortOrder = 'asc' | 'desc';

const ShortlistedCandidates: React.FC<ShortlistedCandidatesProps> = ({ jobId }) => {
  const [sortField, setSortField] = useState<SortField>('matchScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'shortlisted' | 'rejected' | 'pending'>('all');

  // Mock data - replace with API call
  const allCandidates: Candidate[] = [
    {
      id: 'cand-001',
      name: 'Aisha Kumar',
      email: 'aisha.kumar@email.com',
      matchScore: 92,
      similarityScore: 88,
      classificationScore: 94,
      matchedSkillsCount: 18,
      totalSkills: 20,
      status: 'shortlisted',
      appliedFor: 'Senior Full Stack Developer',
    },
    {
      id: 'cand-002',
      name: 'Raj Patel',
      email: 'raj.patel@email.com',
      matchScore: 85,
      similarityScore: 82,
      classificationScore: 88,
      matchedSkillsCount: 16,
      totalSkills: 20,
      status: 'pending',
      appliedFor: 'Senior Full Stack Developer',
    },
    {
      id: 'cand-003',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      matchScore: 78,
      similarityScore: 75,
      classificationScore: 81,
      matchedSkillsCount: 14,
      totalSkills: 20,
      status: 'pending',
      appliedFor: 'Senior Full Stack Developer',
    },
    {
      id: 'cand-004',
      name: 'Mohammad Ali',
      email: 'mohammad.ali@email.com',
      matchScore: 65,
      similarityScore: 62,
      classificationScore: 68,
      matchedSkillsCount: 10,
      totalSkills: 20,
      status: 'rejected',
      appliedFor: 'Senior Full Stack Developer',
    },
    {
      id: 'cand-005',
      name: 'Deepak Singh',
      email: 'deepak.singh@email.com',
      matchScore: 88,
      similarityScore: 86,
      classificationScore: 90,
      matchedSkillsCount: 17,
      totalSkills: 20,
      status: 'shortlisted',
      appliedFor: 'Senior Full Stack Developer',
    },
  ];

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return filterStatus === 'all'
      ? allCandidates
      : allCandidates.filter((c) => c.status === filterStatus);
  }, [filterStatus]);

  // Sort candidates
  const sortedCandidates = useMemo(() => {
    const sorted = [...filteredCandidates].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'name') {
        aVal = (aVal as string).toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredCandidates, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Determine row color based on match score
  const getRowColor = (candidate: Candidate) => {
    if (candidate.matchScore >= 85) return 'bg-green-50 hover:bg-green-100';
    if (candidate.matchScore >= 75) return 'bg-blue-50 hover:bg-blue-100';
    if (candidate.matchScore >= 65) return 'bg-yellow-50 hover:bg-yellow-100';
    return 'bg-red-50 hover:bg-red-100';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-blue-100 text-blue-800';
    if (score >= 65) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" /></svg>;
    return sortOrder === 'asc'
      ? <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4V4m0 0L13 8m0 0l4 4" /></svg>
      : <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Shortlisted Candidates</h2>
        <p className="text-gray-600 mt-1">Job ID: {jobId} • Total: {allCandidates.length}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            filterStatus === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({allCandidates.length})
        </button>
        <button
          onClick={() => setFilterStatus('shortlisted')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
            filterStatus === 'shortlisted'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          ✓ Shortlisted ({allCandidates.filter((c) => c.status === 'shortlisted').length})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
            filterStatus === 'pending'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          ⏳ Pending ({allCandidates.filter((c) => c.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilterStatus('rejected')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
            filterStatus === 'rejected'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          ✕ Rejected ({allCandidates.filter((c) => c.status === 'rejected').length})
        </button>
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                  >
                    Candidate ID
                    <SortIcon field="name" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                  <button
                    onClick={() => handleSort('matchScore')}
                    className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                  >
                    Match Score
                    <SortIcon field="matchScore" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                  <button
                    onClick={() => handleSort('similarityScore')}
                    className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                  >
                    Similarity Score
                    <SortIcon field="similarityScore" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                  <button
                    onClick={() => handleSort('classificationScore')}
                    className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                  >
                    Classification Score
                    <SortIcon field="classificationScore" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                  <button
                    onClick={() => handleSort('matchedSkillsCount')}
                    className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                  >
                    Matched Skills
                    <SortIcon field="matchedSkillsCount" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedCandidates.map((candidate) => (
                <tr key={candidate.id} className={`${getRowColor(candidate)} transition-colors duration-150`}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{candidate.name}</p>
                      <p className="text-xs text-gray-500">{candidate.id}</p>
                      <p className="text-xs text-gray-500 mt-1">{candidate.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getScoreBadgeColor(candidate.matchScore)}`}>
                      {candidate.matchScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getScoreBadgeColor(candidate.similarityScore)}`}>
                      {candidate.similarityScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getScoreBadgeColor(candidate.classificationScore)}`}>
                      {candidate.classificationScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-full"
                          style={{ width: `${(candidate.matchedSkillsCount / candidate.totalSkills) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{candidate.matchedSkillsCount}/{candidate.totalSkills}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition-colors duration-200 text-xs"
                        title="Shortlist"
                      >
                        ✓
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition-colors duration-200 text-xs"
                        title="Reject"
                      >
                        ✕
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded transition-colors duration-200 text-xs"
                        title="View Profile"
                      >
                        👁
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Score Legend */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-3">Score Color Legend:</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-200"></div>
            <span className="text-sm text-gray-700">Excellent (≥85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-200"></div>
            <span className="text-sm text-gray-700">Good (75-84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-200"></div>
            <span className="text-sm text-gray-700">Average (65-74%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-200"></div>
            <span className="text-sm text-gray-700">Below Average (&lt;65%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortlistedCandidates;
