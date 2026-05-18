# ResAI - Backend Server

Express.js + MongoDB backend server for the ResAI application with Google OAuth and JWT authentication.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create or update the `.env` file:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

### 3. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "applicant" | "recruiter"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "userId": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "applicant"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": { ... }
}
```

#### Google OAuth Login
```
POST /api/auth/google
Content-Type: application/json

{
  "token": "google_id_token"
}

Response:
{
  "success": true,
  "token": "jwt_token",
  "user": { ... }
}
```

#### Get User Profile
```
GET /api/auth/:userId

Response:
{
  "_id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "applicant",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Resumes

#### Upload Resume
```
POST /api/resumes/upload
Content-Type: application/json

{
  "userId": "user_id",
  "fileName": "resume.pdf",
  "fileContent": "base64_encoded_content",
  "parsedData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "experience": [
      {
        "title": "Software Engineer",
        "company": "Tech Corp",
        "duration": "2020-2024"
      }
    ],
    "education": [
      {
        "degree": "BS Computer Science",
        "institution": "University",
        "year": "2020"
      }
    ],
    "skills": ["JavaScript", "Python", "React"]
  }
}

Response:
{
  "message": "Resume uploaded successfully",
  "resumeId": "resume_id"
}
```

#### Get All User Resumes
```
GET /api/resumes/user/:userId

Response:
[
  {
    "_id": "resume_id",
    "userId": "user_id",
    "fileName": "resume.pdf",
    "parsedData": { ... },
    "jobMatches": [ ... ],
    "fitScore": 85,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Resume by ID
```
GET /api/resumes/:resumeId

Response:
{
  "_id": "resume_id",
  "userId": "user_id",
  "fileName": "resume.pdf",
  "parsedData": { ... },
  "jobMatches": [ ... ],
  "fitScore": 85,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Update Resume
```
PUT /api/resumes/:resumeId
Content-Type: application/json

{
  "jobMatches": [
    {
      "jobTitle": "Senior Software Engineer",
      "matchScore": 92,
      "company": "Tech Corp"
    }
  ],
  "fitScore": 85
}

Response:
{
  "message": "Resume updated successfully",
  "resume": { ... }
}
```

#### Delete Resume
```
DELETE /api/resumes/:resumeId

Response:
{
  "message": "Resume deleted successfully"
}
```

## Database Models

### User Model
```typescript
{
  _id: ObjectId
  email: string (unique, lowercase)
  password: string
  firstName: string
  lastName: string
  role: "applicant" | "recruiter"
  createdAt: Date
  updatedAt: Date
}
```

### Resume Model
```typescript
{
  _id: ObjectId
  userId: string
  fileName: string
  fileContent: string
  parsedData: {
    name?: string
    email?: string
    phone?: string
    experience?: Array<{
      title: string
      company: string
      duration: string
    }>
    education?: Array<{
      degree: string
      institution: string
      year: string
    }>
    skills?: string[]
  }
  jobMatches?: Array<{
    jobTitle: string
    matchScore: number
    company: string
  }>
  fitScore?: number
  createdAt: Date
  updatedAt: Date
}
```

## Features

✅ **Express.js Server** - Fast and scalable backend
✅ **MongoDB Integration** - NoSQL database for data persistence
✅ **Google OAuth 2.0** - Seamless Google sign-in
✅ **JWT Authentication** - Secure token-based auth
✅ **Resume Management** - Upload, store, and retrieve resumes
✅ **CORS Enabled** - Cross-origin requests supported

## Project Structure

```
backend/
├── models/
│   ├── User.ts
│   └── Resume.ts
├── routes/
│   ├── auth.ts
│   └── resume.ts
├── services/
│   └── googleAuthService.ts
├── server.ts
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md
```

## Technologies

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **Google Auth Library** - OAuth 2.0 verification
- **JWT** - Token authentication
- **TypeScript** - Type-safe development
- **Cors** - Cross-origin resource sharing

## Security Notes

⚠️ **Production Checklist**:
- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Implement password hashing with bcrypt
- [ ] Add input validation and sanitization
- [ ] Enable HTTPS
- [ ] Set CORS to specific frontend URL
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Use secure cookies for tokens
- [ ] Add CSRF protection
- [ ] Implement user permission checks

## Troubleshooting

**MongoDB Connection Error**
- Check MONGODB_URI in .env
- Ensure MongoDB cluster is active
- Verify IP whitelist in MongoDB Atlas

**Port Already in Use**
```bash
npx kill-port 5000
```

**Module Not Found**
```bash
npm install
npm run build
```

**Google OAuth Fails**
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Check authorized redirect URIs in Google Console
- Ensure token is properly formatted

## Support

For issues or questions, please refer to the main [README.md](../README.md) or open an issue in the repository.
