
import React from 'react';
import Card from '../common/Card';

interface InterviewPrepProps {
  questions: string[];
}

const AcademicCapIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
);


const InterviewPrep: React.FC<InterviewPrepProps> = ({ questions }) => {
  return (
    <Card title="Interview Preparation" icon={<AcademicCapIcon className="h-6 w-6 text-indigo-600"/>}>
      <p className="text-gray-600 mb-4">
        Prepare for your interview with these questions tailored to the target role and your skillset. They range from foundational to advanced topics.
      </p>
      <ol className="list-decimal list-inside space-y-3 text-gray-700">
        {questions.map((q, index) => (
          <li key={index} className="pl-2">
            {q}
          </li>
        ))}
      </ol>
    </Card>
  );
};

export default InterviewPrep;
