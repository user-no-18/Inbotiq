# Full-Stack Authentication Application

A simple full-stack web application with role-based authentication (User/Owner), built with React + Vite frontend and Node.js + Express backend.

## 🌐 Live Demo

- **Frontend:** https://inbotiq-kappa.vercel.app
- **Backend API:** https://inbotiq-zjai.onrender.com

## 📋 Features

- ✅ User signup with role selection (User/Owner)
- ✅ Secure login with JWT authentication
- ✅ Protected dashboard route
- ✅ Role-based dashboard display
- ✅ Logout functionality
- ✅ Password hashing with bcrypt
- ✅ MongoDB database integration

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Bcrypt
- Cookie Parser
- CORS

## 📁 Project Structure

```
project-root/
├── Client/                 # Frontend application
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── SignUp.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── DashBoard.jsx
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   └── .env.production
│
└── Server/                 # Backend application
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   └── userController.js
    ├── middlewares/
    │   └── isAuth.js
    ├── models/
    │   └── userModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── userRoute.js
    ├── utils/
    │   └── token.js
    ├── index.js
    ├── package.json
    └── .env
```

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Backend Setup

```bash
# Navigate to Server folder
cd Server

# Install dependencies
npm install
```

Create `.env` file in Server folder:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/foodhub
PORT=5000
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

**Required packages:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- cors
- dotenv

```bash
# Start backend server
npm start
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to Client folder (from root)
cd Client

# Install dependencies
npm install
```

Create `.env` file in Client folder (optional for local):
```env
VITE_API_URL=http://localhost:5000/api
```

**Required packages:**
- react
- react-dom
- react-router-dom
- axios
- tailwindcss

```bash
# Start frontend development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

### 4. Test the Application

1. Open browser at `http://localhost:5173`
2. Click "Sign Up"
3. Fill in the form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: test1234 (min 6 characters)
   - Mobile: 1234567890 (exactly 10 digits)
   - Role: User or Owner
4. Click "Sign Up" → Should redirect to Dashboard
5. Test logout and login functionality

## 📡 API Endpoints

### Authentication Routes

#### POST `/api/auth/signup`
Create a new user account

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobile": "1234567890",
  "role": "user"
}
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "role": "user",
    "createdAt": "..."
  },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/signin`
Login to existing account

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { ... },
  "token": "jwt_token_here"
}
```

### User Routes

#### GET `/api/user/current`
Get current logged-in user information (Protected Route)

**Headers:**
```
Authorization: Bearer <token>
OR
Cookie: token=<jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "role": "user"
  }
}
```

## 🌍 Deployment

### Backend (Render)

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Configure:
   - **Name:** your-backend-name
   - **Root Directory:** `Server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add Environment Variables:
   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_secret>
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=5000
   ```
7. Deploy

### Frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import GitHub repository
3. Configure:
   - **Root Directory:** `Client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
5. Deploy

## 🔒 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 📝 Key Implementation Details

### Authentication Flow
1. User submits signup/login form
2. Backend validates credentials
3. Password is hashed using bcrypt (10 salt rounds)
4. JWT token is generated with 7-day expiry
5. Token is sent in response and stored in localStorage
6. Token is sent in subsequent requests via Authorization header
7. Backend middleware verifies token before accessing protected routes

### Security Features
- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies (optional)
- CORS configuration
- Protected routes with middleware
- Input validation (password min 6 chars, mobile 10 digits)

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB URI is correct
- Ensure port 5000 is not in use
- Verify all dependencies are installed

### Frontend can't connect to backend
- Check if backend is running
- Verify CORS configuration
- Check API URL in frontend config

### Login/Signup fails
- Check MongoDB connection
- Verify environment variables are set
- Check browser console for errors
- Look at backend logs for error messages

### CORS errors in production
- Ensure FRONTEND_URL in backend matches your Vercel URL exactly
- No trailing slash in URLs
- Both URLs should use HTTPS

## 👨‍💻 Author

Debjyoti Roy

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built as part of Full-Stack Mini Project Assignment
- Uses MongoDB Atlas for database hosting
- Deployed on Render (backend) and Vercel (frontend)
