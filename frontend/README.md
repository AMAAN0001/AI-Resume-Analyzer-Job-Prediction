# ResAI - Frontend Application

React + Vite frontend for the ResAI application with Google OAuth integration and Tailwind CSS styling.

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create or update the `.env.local` file:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run the Application

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm run preview
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── analytics/
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── CategorySplitPieChart.tsx
│   │   │   ├── PredictionsTable.tsx
│   │   │   └── RoleFitBarChart.tsx
│   │   ├── common/
│   │   │   ├── Card.tsx
│   │   │   └── Spinner.tsx
│   │   ├── dashboard/
│   │   │   ├── BulletRewrites.tsx
│   │   │   ├── CareerRoadmap.tsx
│   │   │   ├── ExperienceEducation.tsx
│   │   │   ├── FitScore.tsx
│   │   │   ├── GapAnalysis.tsx
│   │   │   ├── InterviewPrep.tsx
│   │   │   ├── JobMatches.tsx
│   │   │   ├── JobPredictionCard.tsx
│   │   │   ├── ReportGenerator.tsx
│   │   │   ├── ReportTemplate.tsx
│   │   │   └── SummaryCard.tsx
│   │   ├── ApiKeyModal.tsx
│   │   ├── ApplicantDashboard.tsx
│   │   ├── AuthModal.tsx
│   │   ├── Dashboard.tsx
│   │   ├── FileUpload.tsx
│   │   ├── LandingPage.tsx
│   │   ├── RecruiterDashboard.tsx
│   │   └── ShortlistedCandidates.tsx
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   ├── geminiService.ts
│   │   └── README.md
│   ├── utils/
│   │   └── fileProcessor.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── types.ts
│   ├── constants.ts
│   ├── config.ts
│   └── metadata.json
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.local
├── .gitignore
└── README.md
```

## Features

✅ **React 19** - Latest React version
✅ **Vite** - Lightning-fast build tool
✅ **Tailwind CSS** - Utility-first CSS framework
✅ **TypeScript** - Type-safe development
✅ **Google OAuth** - Seamless sign-in
✅ **JWT Authentication** - Secure token-based auth
✅ **Resume Analysis** - AI-powered insights via Gemini
✅ **Recruiter Dashboard** - Manage candidates
✅ **Applicant Dashboard** - Track applications
✅ **Responsive Design** - Works on all devices

## Environment Variables

### Required
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Optional
```
GEMINI_API_KEY=your_gemini_api_key
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Components

### AuthModal
Handles user authentication with email/password and Google OAuth.

### FileUpload
Allows users to upload resume files (PDF, DOCX) for analysis.

### Dashboard
Main application dashboard with resume analysis results.

### ApplicantDashboard
Personalized dashboard for job applicants with job matches and insights.

### RecruiterDashboard
Admin dashboard for recruiters to view and manage candidates.

### Analytics Dashboard
Visual analytics with charts and statistics.

## Services

### API Client (`services/apiClient.ts`)
Handles all backend API calls:
- Authentication (login, signup, Google OAuth)
- Resume operations (upload, retrieve, update)

### Auth Service (`services/authService.ts`)
Manages user authentication state and local storage.

### Gemini Service (`services/geminiService.ts`)
Integrates with Google's Gemini AI for resume analysis.

## Technologies

- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Programming language
- **Tailwind CSS** - Styling
- **React OAuth Google** - OAuth integration
- **Axios** - HTTP client (via Gemini API)

## Authentication Flow

1. User opens the app
2. Opens AuthModal
3. Enters email/password or clicks Google Sign-In
4. Frontend sends credentials to backend `/api/auth/login` or `/api/auth/google`
5. Backend verifies and returns JWT token
6. Frontend stores token in localStorage
7. Token used for subsequent API requests

## Resume Analysis Flow

1. User uploads resume file
2. Frontend reads file content
3. Extracts text from PDF/DOCX
4. Sends to backend for storage
5. Sends text to Gemini AI API
6. AI provides resume analysis and insights
7. Results displayed in Dashboard

## Building for Production

```bash
# Build
npm run build

# Output will be in dist/ folder
# Serve with: npm run preview
```

## Deployment

### Vercel / Netlify
```bash
# Install CLI
npm install -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

## Troubleshooting

### Port 3000 Already in Use
```bash
npx kill-port 3000
```

### API Connection Issues
- Check `VITE_API_BASE_URL` in `.env.local`
- Verify backend is running on port 5000
- Check browser console for detailed errors

### Google OAuth Not Working
- Verify `VITE_GOOGLE_CLIENT_ID` is set
- Check authorized URIs in Google Cloud Console
- Ensure GoogleOAuthProvider wraps App in index.tsx

### Gemini API Errors
- Verify `GEMINI_API_KEY` is correct
- Check API key has proper permissions
- Verify API is enabled in Google Cloud Console

## Performance Tips

- Code splitting with React.lazy()
- Lazy loading images
- Memoizing components with React.memo()
- Using Vite's build optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Support

For issues or questions, please refer to the main [README.md](../README.md) or open an issue in the repository.
