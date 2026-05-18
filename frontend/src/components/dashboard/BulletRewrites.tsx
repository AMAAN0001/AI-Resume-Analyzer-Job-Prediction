
import React, { useState } from 'react';
import Card from '../common/Card';
import { RewrittenBullet } from '../../types';

interface BulletRewritesProps {
  rewrites: RewrittenBullet[];
}

const PencilAltIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);
const ClipboardCopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition"
            title="Copy to clipboard"
        >
            {copied ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
                <ClipboardCopyIcon className="h-5 w-5" />
            )}
        </button>
    );
};

const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const BulletRewrites: React.FC<BulletRewritesProps> = ({ rewrites }) => {
  return (
    <Card title="Resume Bullet Point Suggestions" icon={<PencilAltIcon className="h-6 w-6 text-indigo-600"/>}>
      <div className="space-y-6">
        {rewrites.map((rewrite, index) => (
          <div key={index}>
            <p className="text-sm text-gray-500 mb-1">Original:</p>
            <blockquote className="border-l-4 border-gray-200 pl-4 py-1 text-gray-700 italic">
              "{rewrite.original}"
            </blockquote>
            <p className="text-sm text-gray-500 mt-3 mb-1">Suggestions:</p>
            <div className="space-y-2">
              {rewrite.rewritten.map((r, i) => (
                <div key={i} className="relative bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r-lg">
                  <p className="text-gray-800 pr-10">{r}</p>
                  <CopyButton textToCopy={r} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BulletRewrites;
