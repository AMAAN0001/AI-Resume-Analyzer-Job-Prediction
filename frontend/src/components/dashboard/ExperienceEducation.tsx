import React from 'react';
import Card from '../common/Card';
import { Experience, Education } from '../../types';

interface ExperienceEducationProps {
  experience?: Experience[];
  education?: Education[];
}

const BriefcaseIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const AcademicCapIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25m20-11.002c-5.5 0-10 4.747-10 11.002M12 6.253L4.5 11.5v5.75c0 5.368 3.2 9.998 7.5 11.002" /></svg>
);

const CalendarIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

const ExperienceEducation: React.FC<ExperienceEducationProps> = ({ experience, education }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <Card title="Work Experience" icon={<BriefcaseIcon className="h-6 w-6 text-indigo-600"/>}>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="relative pb-6 last:pb-0">
                {/* Timeline connector */}
                {index < experience.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-16 bg-indigo-200"></div>
                )}
                
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 border-2 border-indigo-600">
                      <BriefcaseIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow pt-1">
                    <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                    <p className="text-indigo-600 font-semibold">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{exp.duration}</span>
                    </div>
                    <p className="text-gray-700 mt-2 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <Card title="Education" icon={<AcademicCapIcon className="h-6 w-6 text-purple-600"/>}>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="relative pb-6 last:pb-0">
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-16 bg-purple-200"></div>
                )}
                
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 border-2 border-purple-600">
                      <AcademicCapIcon className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow pt-1">
                    <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-purple-600 font-semibold">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{edu.year}</span>
                    </div>
                    {edu.details && (
                      <p className="text-gray-700 mt-2 text-sm">{edu.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ExperienceEducation;
