MERN Stack Blog Application
A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring complete CRUD operations, user authentication, and modern UI.

🚀 Features
Full CRUD Operations - Create, Read, Update, Delete blog posts

User Authentication - Secure user registration and login

Comments System - Add comments to blog posts

Categories - Organize posts by categories

Search & Filter - Find posts by title, content, or tags

Responsive Design - Works on all devices

RESTful API - Clean API architecture

Modern UI - Clean and intuitive user interface

🛠️ Tech Stack
Frontend
React.js - UI framework

React Router DOM - Client-side routing

Axios - HTTP client for API calls

Context API - State management

CSS3 - Styling

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - NoSQL database

Mongoose - ODM for MongoDB

JWT - Authentication tokens

CORS - Cross-origin resource sharing

dotenv - Environment variables

📦 Installation & Setup
Prerequisites
Node.js (v18 or higher)

MongoDB (local or Atlas)

npm or yarn

1. Clone the Repository
bash
git clone <your-repository-url>
cd mern-stack-integration-Ghyslaine95
2. Backend Setup
bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev
3. Frontend Setup
bash
# Navigate to client directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
⚙️ Environment Variables
Server (.env)
env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
Client (.env)
env
VITE_API_BASE_URL=http://localhost:5000/api
🗄️ Database Setup
Option 1: MongoDB Atlas (Recommended)
Create a free account at MongoDB Atlas

Create a cluster and get your connection string

Update MONGODB_URI in your .env file

Option 2: Local MongoDB
Install MongoDB Community Server

Start MongoDB service

Use mongodb://localhost:27017/mern-blog as your connection string

Seed the Database
bash
cd server
node seeder.js
🚀 Running the Application
Development Mode
bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
Production Build
bash
# Build client
cd client
npm run build

# Start production server
cd ../server
npm start
📡 API Endpoints
Posts
GET /api/posts - Get all posts

GET /api/posts/:id - Get single post

POST /api/posts - Create new post

PUT /api/posts/:id - Update post

DELETE /api/posts/:id - Delete post

POST /api/posts/:id/comments - Add comment to post

Categories
GET /api/categories - Get all categories

POST /api/categories - Create new category

Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

🗂️ Project Structure
text
mern-blog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Main server file
└── README.md

🧪 Testing the Application
Visit the homepage: http://localhost:3000

Browse posts: http://localhost:3000/posts

Create a post: http://localhost:3000/create-post

Test API directly: http://localhost:5000/api/posts

📝 Usage Guide
Creating a Post
Navigate to "Create Post" from the navbar

Fill in the title, content, author, and select a category

Add optional tags separated by commas

Click "Publish Post"

Managing Posts
View all posts: Browse the posts page

Edit a post: Click "Edit" on any post

Delete a post: Use the delete functionality

Add comments: Scroll to the bottom of any post detail page

Searching and Filtering
Use the search bar to find posts by title or content

Filter posts by category using the category dropdown

👥 Authors
Ghyslaine

🙏 Acknowledgments
MERN stack documentation


React.js community

Express.js framework



