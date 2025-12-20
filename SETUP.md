# EBD Project - Setup and Run Instructions

## Project Overview

This is a full-stack Carbon Finance Platform with 6 main features:
1. **User Authentication** - Registration, Login, JWT, Password Hashing
2. **Farm Registration** - Form + GPS location capture + backend model
3. **AI Recommendations** - Simple rule-based engine for MVP
4. **Emission Tracking Dashboard** - Backend + basic frontend charts
5. **Carbon Credit Generation** - Simulated emission-to-credit logic
6. **Purchase Requests** - Company purchase page + request handling

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## Step 1: Install Dependencies

### Backend Dependencies
```bash
cd backend
npm install
```

### Frontend Dependencies
```bash
cd frontend
npm install
```

## Step 2: Configure Environment Variables

### Backend Configuration

Create a `.env` file in the `backend` folder:

```env
# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/ebd-project
# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ebd-project

# JWT Secret Key (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Frontend Configuration

Create a `.env` file in the `frontend` folder:

```env
# API Base URL
VITE_API_URL=http://localhost:5000/api
```

**Note:** If you don't create the `.env` file, the app will use default values:
- Backend: `mongodb://localhost:27017/ebd-project` and `PORT=5000`
- Frontend: `http://localhost:5000/api`

## Step 3: Start MongoDB

### Option A: Local MongoDB
Make sure MongoDB is running on your machine:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `backend/.env`

## Step 4: Run the Application

### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

You should see:
```
🚀 Server running in development mode on port 5000
MongoDB Connected: ...
```

### Terminal 2 - Start Frontend Server
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000` (or another port if 3000 is busy)

## Step 5: Access the Application

1. Open your browser and go to `http://localhost:3000`
2. You should see the homepage with navigation to all features

## Feature Access

### Public Routes (No Login Required)
- `/` - Homepage
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Login Required)
- `/dashboard` - User dashboard
- `/farm-registration` - Register a farm with GPS
- `/ai-recommendations` - View AI recommendations
- `/emission-dashboard` - View emission tracking charts
- `/carbon-credits` - Generate and view carbon credits
- `/purchase-requests` - View available credits for purchase (Student)
- `/create-purchase-request` - Create a purchase request (Student)
- `/my-purchase-requests` - View your purchase requests (Student)
- `/admin` - Admin dashboard (Admin only)
- `/admin/purchase-requests` - Admin purchase request management (Admin only)

## Testing the Features

### 1. User Authentication
1. Go to `/register`
2. Create an account (username, email, password, role)
3. You'll be automatically logged in and redirected to dashboard
4. Logout and test login at `/login`

### 2. Farm Registration
1. Login as any user
2. Go to `/farm-registration`
3. Fill in farm details
4. Click "Capture GPS Location" (allow browser location access)
5. Or enter coordinates manually
6. Submit the form

### 3. AI Recommendations
1. Login
2. Go to `/ai-recommendations`
3. View recommendations (currently uses hardcoded data for student ID 3)

### 4. Emission Tracking Dashboard
1. Login
2. Go to `/emission-dashboard`
3. View emission charts and data

### 5. Carbon Credit Generation
1. Login
2. Go to `/carbon-credits`
3. Enter farm ID, baseline emission, and actual emission
4. Click "Generate Credits"
5. View generated credits in the list below

### 6. Purchase Requests
1. Login as a student
2. Go to `/purchase-requests` to view available credits
3. Go to `/create-purchase-request` to create a new request
4. Go to `/my-purchase-requests` to view your requests
5. Login as admin to approve/reject requests at `/admin/purchase-requests`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Farms
- `POST /api/farms/register` - Register a farm
- `GET /api/farms` - Get all farms
- `GET /api/farms/:id` - Get farm by ID

### Credits
- `POST /api/credits/generate` - Generate carbon credits
- `GET /api/credits/all` - Get all credits

### Recommendations
- `GET /api/recommendations/student/:id` - Get recommendations for student

### Dashboard
- `GET /api/dashboard` - Get dashboard data (protected)

### Purchase Requests
- `POST /api/purchase-requests` - Create purchase request (student)
- `GET /api/purchase-requests/my-requests` - Get my requests (student)
- `GET /api/purchase-requests` - Get all requests (admin)
- `PUT /api/purchase-requests/:id/approve` - Approve request (admin)
- `PUT /api/purchase-requests/:id/reject` - Reject request (admin)

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct `MONGODB_URI`
- Check if port 5000 is already in use
- Look at console for error messages

### Frontend shows blank page
- Check browser console for errors (F12)
- Verify backend is running on port 5000
- Check if frontend `.env` has correct `VITE_API_URL`
- Try clearing browser cache

### CORS Errors
- Backend has CORS enabled for all origins in development
- If issues persist, check `backend/server.js` CORS configuration

### MongoDB Connection Errors
- Verify MongoDB is running (local) or connection string is correct (Atlas)
- Check network/firewall settings
- Ensure MongoDB URI format is correct

### Authentication Issues
- Verify JWT_SECRET is set in backend `.env`
- Check browser localStorage for token
- Clear localStorage and login again

## Project Structure

```
ebd-project/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Mongoose models
│   │   ├── Routes/         # Express routes
│   │   ├── Services/       # Business logic
│   │   └── utils/          # Utilities (JWT generation)
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service
│   │   └── App.jsx        # Main app component
│   └── package.json
└── SETUP.md               # This file
```

## Development Notes

- Backend uses Express.js with MongoDB (Mongoose)
- Frontend uses React with Vite
- Authentication uses JWT tokens stored in localStorage
- All API calls go through `frontend/src/services/api.js`
- Bootstrap 5 is used for UI styling

## Next Steps

1. Set up your `.env` files
2. Start MongoDB
3. Run `npm install` in both backend and frontend
4. Start both servers
5. Test all features
6. Customize as needed for your project

## Support

If you encounter issues:
1. Check the console/terminal for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check that ports 3000 and 5000 are available

