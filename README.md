# ResAI - AI-Powered Resume Analysis & Job Prediction

This repository contains a full-stack AI-powered resume analysis application with MongoDB integration and Google OAuth authentication.

## Project Structure

```
AI-Resume-Analyzer-Job-Prediction/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
│
├── backend/                     # Node.js + Express backend
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.ts
│   ├── package.json
│   └── .env
│
└── README.md (this file)
```

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google OAuth credentials

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `/backend`:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

Run backend:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file in `/frontend`:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
```

Run frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Features

✅ **Google OAuth 2.0** - Seamless sign-in with Google  
✅ **MongoDB Integration** - Store user profiles and resumes  
✅ **JWT Authentication** - Secure token-based auth  
✅ **AI Resume Analysis** - Powered by Google Gemini  
✅ **Job Matching** - AI-powered job predictions  
✅ **Recruiter Dashboard** - Manage candidates  
✅ **Applicant Dashboard** - Track applications and insights  

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/:userId` - Get user profile

### Resumes
- `POST /api/resumes/upload` - Upload resume
- `GET /api/resumes/user/:userId` - Get user's resumes
- `GET /api/resumes/:resumeId` - Get specific resume
- `PUT /api/resumes/:resumeId` - Update resume
- `DELETE /api/resumes/:resumeId` - Delete resume

## Development

### Available Scripts

**Frontend:**
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

**Backend:**
```bash
npm run dev        # Start dev server with auto-reload
npm run build      # Compile TypeScript
npm start          # Start production server
```

## Environment Setup

### Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable OAuth 2.0
4. Create Web application credentials
5. Add authorized URIs:
   - `http://localhost:3000`
   - `http://localhost:5000/api/auth/google/callback`

### Get Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add to `.env.local`

### Setup MongoDB
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Add to backend `.env`

## Troubleshooting

**Port already in use?**
```bash
# Kill port 3000 (frontend)
npx kill-port 3000

# Kill port 5000 (backend)
npx kill-port 5000
```

**Module errors?**
```bash
# Clear and reinstall dependencies
cd frontend && rm -rf node_modules && npm install
cd backend && rm -rf node_modules && npm install
```

**MongoDB connection failed?**
- Check connection string in `.env`
- Ensure MongoDB cluster is active
- Verify IP whitelist in MongoDB Atlas

## Production Deployment

See individual README files in `/frontend` and `/backend` for deployment guides.

## Learn More

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Google OAuth Setup](./frontend/src/services/README.md)

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open an issue in the repository.
