import { ATSScore, ATSIssue } from '../types';

// Common ATS-blocking elements and keywords
const ATS_ISSUES = {
  formatting: [
    { pattern: /table|column|text box/gi, issue: 'Tables detected - ATS cannot parse' },
    { pattern: /image|logo|graphic|picture/gi, issue: 'Images detected - ATS ignores visual content' },
    { pattern: /[^A-Za-z0-9\s\-\.,@()/#]/g, issue: 'Special characters that may not parse correctly' },
    { pattern: /header|footer/gi, issue: 'Headers/footers may be ignored by ATS' },
  ],
  structure: [
    { pattern: /contact|phone|email|address/gi, label: 'contact' },
    { pattern: /experience|employment|work history/gi, label: 'experience' },
    { pattern: /education|degree|certification|university|college/gi, label: 'education' },
    { pattern: /skills|technical|proficiency|expertise/gi, label: 'skills' },
    { pattern: /summary|objective|profile/gi, label: 'summary' },
  ],
};

// Common high-value keywords that ATS systems look for
const HIGH_VALUE_KEYWORDS = [
  'leadership', 'project management', 'team collaboration', 'problem-solving',
  'data analysis', 'communication', 'attention to detail', 'analytical',
  'technical', 'programming', 'python', 'javascript', 'react', 'vue',
  'angular', 'node.js', 'sql', 'database', 'aws', 'azure', 'cloud',
  'devops', 'ci/cd', 'docker', 'kubernetes', 'agile', 'scrum',
  'jira', 'git', 'rest api', 'microservices', 'machine learning',
  'data science', 'excel', 'salesforce', 'sap', 'erp',
];

export const analyzeATSScore = (resumeText: string): ATSScore => {
  const lowerResume = resumeText.toLowerCase();
  const issues: ATSIssue[] = [];
  let formattingScore = 100;
  let structureScore = 100;
  let keywordScore = 0;

  // 1. FORMATTING ANALYSIS
  const specialCharCount = (resumeText.match(/[^\w\s\-\.@()/#,]/g) || []).length;
  if (specialCharCount > 20) {
    formattingScore -= 20;
    issues.push({
      type: 'formatting',
      severity: 'warning',
      title: 'Excessive Special Characters',
      description: `Found ${specialCharCount} special characters that may not parse correctly.`,
      suggestion: 'Avoid bullets, symbols, and special formatting. Use standard dashes and periods instead.',
    });
  }

  if (/[^a-z0-9\s]/gi.test(resumeText) && /table|column|text box|graphic|image|logo|header|footer/gi.test(resumeText)) {
    formattingScore -= 25;
    issues.push({
      type: 'formatting',
      severity: 'critical',
      title: 'Complex Formatting Detected',
      description: 'Resume contains tables, images, or complex layouts that ATS systems cannot parse.',
      suggestion: 'Use a simple one-column format with clear text only. Avoid images, tables, and fancy formatting.',
    });
  }

  // Check for PDF/formatting issues
  if (resumeText.length < 300) {
    formattingScore -= 10;
    issues.push({
      type: 'content',
      severity: 'warning',
      title: 'Resume May Be Too Short',
      description: 'Very short resumes may miss important content that ATS systems index.',
      suggestion: 'Ensure your resume is between 300-1000 words for optimal ATS parsing.',
    });
  }

  if (resumeText.length > 5000) {
    formattingScore -= 10;
    issues.push({
      type: 'content',
      severity: 'info',
      title: 'Resume Is Quite Long',
      description: 'Long resumes may have parsing inconsistencies.',
      suggestion: 'Consider condensing to 1-2 pages for better ATS readability.',
    });
  }

  // 2. STRUCTURE ANALYSIS
  const sections = ATS_ISSUES.structure.map(s => ({
    label: s.label,
    found: s.pattern.test(lowerResume),
  }));

  const foundSections = sections.filter(s => s.found);
  structureScore = (foundSections.length / sections.length) * 100;

  sections.forEach(section => {
    if (!section.found) {
      issues.push({
        type: 'structure',
        severity: 'warning',
        title: `Missing ${section.label.charAt(0).toUpperCase() + section.label.slice(1)} Section`,
        description: `No clear "${section.label}" section detected in resume.`,
        suggestion: `Add a clear "${section.label}" section with proper headings.`,
      });
    }
  });

  // 3. KEYWORD ANALYSIS
  const keywordMatches = HIGH_VALUE_KEYWORDS.filter(keyword => {
    return new RegExp(`\\b${keyword}\\b`, 'gi').test(resumeText);
  });

  keywordScore = (keywordMatches.length / HIGH_VALUE_KEYWORDS.length) * 100;

  // 4. CONTACT INFO CHECK
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi.test(resumeText);
  const hasPhone = /\+?1?\s?(\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}/g.test(resumeText);

  if (!hasEmail) {
    issues.push({
      type: 'structure',
      severity: 'critical',
      title: 'Email Address Missing',
      description: 'ATS systems need a valid email to contact you.',
      suggestion: 'Add a clear email address at the top of your resume.',
    });
    structureScore -= 15;
  }

  if (!hasPhone) {
    issues.push({
      type: 'structure',
      severity: 'warning',
      title: 'Phone Number Missing',
      description: 'Most ATS systems look for a phone number.',
      suggestion: 'Add a phone number near the top of your resume.',
    });
    structureScore -= 10;
  }

  // Calculate overall score (weighted)
  const overallScore = Math.round(
    (formattingScore * 0.3 + structureScore * 0.4 + keywordScore * 0.3)
  );

  // Determine parseability
  let parseability: 'excellent' | 'good' | 'fair' | 'poor' = 'good';
  if (overallScore >= 85) parseability = 'excellent';
  else if (overallScore >= 70) parseability = 'good';
  else if (overallScore >= 50) parseability = 'fair';
  else parseability = 'poor';

  return {
    overallScore: Math.max(0, Math.min(100, overallScore)),
    keywordMatch: Math.max(0, Math.min(100, keywordScore)),
    formatting: Math.max(0, Math.min(100, formattingScore)),
    structure: Math.max(0, Math.min(100, structureScore)),
    issues,
    strengths: [
      ...keywordMatches.slice(0, 5).map(k => `Strong "${k}" keyword found`),
      foundSections.length >= 4 ? 'All major resume sections detected' : '',
      hasEmail ? 'Email address included' : '',
      hasPhone ? 'Phone number included' : '',
    ].filter(Boolean),
    recommendations: [
      overallScore < 70 ? 'Consider restructuring to improve ATS compatibility' : '',
      keywordScore < 50 ? 'Add more industry-specific keywords to your resume' : '',
      formattingScore < 80 ? 'Simplify formatting - use standard text only' : '',
      `Include more of these keywords: ${HIGH_VALUE_KEYWORDS.slice(0, 8).join(', ')}`,
    ].filter(Boolean),
    parseability,
  };
};
