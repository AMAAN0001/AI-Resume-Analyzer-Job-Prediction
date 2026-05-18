# Recruiter Dashboard - Quick Start Guide

## What's New? 👀

A **powerful recruiter dashboard** where all student resume submissions are automatically collected and displayed with AI analysis, job predictions, and matching opportunities.

## How It Works

### For Students/Applicants
1. Upload your resume (PDF or text)
2. Get AI analysis (ATS score, job predictions, matches, feedback)
3. Your resume **automatically appears on the recruiter dashboard**

### For Recruiters
1. Click **"👔 Recruiter Mode"** button in the header
2. View all submitted student resumes
3. See job predictions and ATS scores at a glance
4. Click any candidate to see detailed profile
5. Search, filter, and sort candidates

## Quick Demo

### Step 1: Upload a Resume (as Student)
```
1. Open http://localhost:5173
2. Click "Login / Sign Up"
3. Sign up with email or Google
4. Click "Upload & Analyze Resume"
5. Upload a PDF or paste resume text
6. Wait for AI analysis to complete
```

### Step 2: View on Recruiter Dashboard
```
1. After analysis completes, click header
2. Click "👔 Recruiter Mode" button
3. See your resume in the grid!
4. Click on your card to see full analysis
```

## Features at a Glance

| Feature | Description |
|---------|-------------|
| **Auto-Save** | Resumes automatically saved when analyzed |
| **Search** | Find candidates by name, email, or skills |
| **Filter** | Filter by predicted job role |
| **Sort** | Sort by latest, ATS score, or name |
| **Detailed View** | Click card to see full analysis in sidebar |
| **Offline Mode** | Works without backend using localStorage |
| **Multi-Candidate** | View all submissions in one place |

## Main Dashboard Components

### Candidate Card (Grid View)
```
┌─────────────────────────────┐
│ John Doe                    │ ← Candidate name
│ john@example.com            │ ← Email
│                             │
│ ATS: 85%        Predicted   │ ← Metrics
│                 Dev: ████   │
│                             │
│ Skills: React ✕ Node ✕ ... │ ← Top skills
│ +5 more                     │
│                             │
│ 5/8/2026      View Details→ │ ← Date & action
└─────────────────────────────┘
```

### Candidate Detail Modal (Side Panel)
```
┌──────────────────────────────────┐
│ John Doe                      [X] │ ← Name & close
│ john@example.com                 │
├──────────────────────────────────┤
│ ATS: 85%  │  Predicted: Full ...│ ← Scores
├──────────────────────────────────┤
│ Professional Summary             │
│ • Phone: +1234567890            │
│ • Experience: 5 years           │
│ • Level: Senior                 │
│ • Skills: React, Node, AWS...   │
├──────────────────────────────────┤
│ Matching Job Roles              │
│ • Full Stack Dev      ████ 92%   │
│ • Backend Dev         ███░ 78%   │
│ • Tech Lead           ██░░ 65%   │
├──────────────────────────────────┤
│ Experience                       │
│ • Senior Dev @ TechCorp (3 yrs) │
│ • Dev @ StartupXYZ (2 yrs)      │
├──────────────────────────────────┤
│ Education                        │
│ • BS Computer Science (2018)    │
│   State University              │
└──────────────────────────────────┘
```

## Using the Dashboard

### Search Candidates
```
1. Type in the search box
2. Search by:
   - Candidate name (e.g., "John")
   - Email (e.g., "@gmail.com")
   - Skills (e.g., "React")
3. Results update instantly
```

### Filter by Job Role
```
1. Click "All Roles" dropdown
2. Select role:
   - All Roles
   - Developer
   - Manager
   - Engineer
   - Designer
   - Analyst
3. Dashboard shows matching candidates
```

### Sort Candidates
```
1. Click sort dropdown
2. Choose sort order:
   - Latest Submissions (newest first)
   - Highest ATS Score (best first)
   - By Name (A-Z)
3. List reorganizes instantly
```

### View Candidate Details
```
1. Click on any candidate card
2. Sidebar opens on the right
3. Scroll to see full profile:
   - Professional summary
   - Job matching recommendations
   - Experience history
   - Education details
   - Strength and gaps analysis
4. Click X or outside to close
```

## Data Shown for Each Candidate

### Summary Card
- Full name
- Email address
- Phone number (if available)
- Total years of experience
- Current level (Junior/Senior/Lead)
- Top 5 skills

### Job Prediction
- Predicted role
- Job category (Tech/Non-Tech/Other)
- Confidence score (0-100%)
- Explanation of why this role fits

### Matching Jobs
- Top 5 matching job roles
- Match percentage for each
- Explanation for each match

### Experience
- Position titles
- Company names
- Duration in each role
- Job descriptions

### Education
- Degrees earned
- Institutions attended
- Graduation years

### ATS Analysis
- Overall ATS score (0-100)
- Keyword match score
- Formatting score
- Structure score
- Critical issues and recommendations

### Gap Analysis
- Key strengths identified
- Areas for development
- Skills to learn
- Learning resources

## Statistics Displayed

- **Total Submissions**: Count of all uploaded resumes
- **ATS Score Badge**: Color-coded (Green 80+, Yellow 60+, Red <60)
- **Skill Count**: Number of identified skills
- **Top Match %**: Best matching role percentage

## Tips & Tricks

### Finding Your Top Candidates
1. Sort by "Highest ATS Score"
2. Filter by role you're hiring for
3. Review cards with ATS > 80%
4. Check their detailed profiles

### Quick Screening
1. View multiple cards at once
2. Use search to narrow down
3. Check skills preview on card
4. Click to open details only for promising candidates

### Organizing Your Search
1. Search for specific skill (e.g., "React")
2. Filter by role
3. Sort by score
4. Review top 5 matches
5. Take notes on standouts

## Data Storage

### With Backend (Recommended)
- All resumes stored in MongoDB
- Recruiter dashboard synced across devices
- Professional setup
- **Setup**: Make sure backend is running on port 5001

### Without Backend (Fallback)
- Resumes stored in browser's localStorage
- Works offline
- Data in that browser only
- **Automatic**: No setup needed, activates if backend unavailable

## Getting Started

### Prerequisites
```bash
✓ Node.js 14+
✓ npm or yarn
✓ MongoDB (optional, uses localStorage fallback)
✓ Gemini API key (for resume analysis)
```

### Start Backend (Optional but Recommended)
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5001
```

### Start Frontend
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### First Test
1. Open http://localhost:5173
2. Sign up for an account
3. Upload a resume
4. Complete analysis
5. Click "👔 Recruiter Mode"
6. See your resume on the dashboard!

## Troubleshooting

### No candidates showing?
- [ ] Did you upload a resume? (analysis must complete)
- [ ] Is backend running? (optional but recommended)
- [ ] Check browser localStorage (DevTools > Application)
- [ ] Try uploading a test resume

### Can't find Recruiter Mode?
- [ ] Must be logged in first
- [ ] Look for "👔 Recruiter Mode" button in top header
- [ ] Try logging out and back in

### Candidates disappearing after refresh?
- [ ] If using localStorage, they should persist
- [ ] Check browser cache settings
- [ ] Ensure cookies are enabled
- [ ] Try different browser

### Backend not connecting?
- [ ] Is backend running on port 5001?
- [ ] Check `frontend/.env.local` for correct API URL
- [ ] Check backend `.env` for correct MongoDB URI
- [ ] Check browser Network tab for errors

## API Endpoints Used

```
POST   /api/resumes/upload     - Save resume with analysis
GET    /api/resumes/all        - Get all submissions (recruiter view)
GET    /api/resumes/:id        - Get specific resume
PUT    /api/resumes/:id        - Update resume
DELETE /api/resumes/:id        - Delete resume
```

## Security Notes

Currently, all recruiters can see all submissions. For production:
- Add role-based access control (RBAC)
- Implement data encryption
- Add audit logging
- Add GDPR compliance

## Next Steps

1. **Test Upload**: Upload a sample resume
2. **View Analysis**: See the AI-generated insights
3. **Check Dashboard**: View it in recruiter mode
4. **Try Filtering**: Search, filter, sort candidates
5. **Explore Details**: Click candidates to see full profiles

## Support

For detailed documentation, see:
- `RECRUITER_DASHBOARD_GUIDE.md` - Full feature guide
- `RECRUITER_DASHBOARD_IMPLEMENTATION.md` - Technical details

## What's Included

✅ Auto-save functionality
✅ Search & filter system
✅ Detailed candidate profiles
✅ Job matching & predictions
✅ ATS analysis display
✅ Experience & education timeline
✅ Gap analysis & recommendations
✅ Responsive design
✅ localStorage fallback
✅ Error handling

## Ready to Use!

The recruiter dashboard is fully integrated and ready to use. No additional configuration needed!

Simply:
1. Upload resumes as students
2. Click "👔 Recruiter Mode" as recruiters
3. Browse all submissions
4. Make better hiring decisions

Happy recruiting! 🚀
