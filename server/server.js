const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    // If MONGODB_URI is not set, use local MongoDB without auth
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-blog'
    
    const conn = await mongoose.connect(mongoURI, {
      // Remove auth if no username/password provided
      auth: mongoURI.includes('@') ? undefined : undefined,
      authSource: mongoURI.includes('@') ? undefined : undefined
    })
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    return true
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    
    // Check if it's an authentication error
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.log('💡 Tip: Try using local MongoDB without authentication')
      console.log('💡 Update your .env file with: MONGODB_URI=mongodb://localhost:27017/mern-blog')
    }
    
    return false
  }
}

// Import models
const Post = require('./models/Post')
const Category = require('./models/Category')

// Initialize database and start server
const startServer = async () => {
  const dbConnected = await connectDB()
  
  if (!dbConnected) {
    console.log('🚨 Starting server with MongoDB connection issues')
    console.log('💡 The API will work but database operations will fail')
    console.log('💡 Fix your MongoDB connection to enable full functionality')
  }

  // API Routes
  // Get all posts
  app.get('/api/posts', async (req, res) => {
    try {
      const { search, category, page = 1, limit = 10 } = req.query
      
      let query = { isPublished: true }
      
      // Search functionality
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ]
      }
      
      // Category filter
      if (category) {
        const categoryDoc = await Category.findOne({ name: new RegExp(category, 'i') })
        if (categoryDoc) {
          query.category = categoryDoc._id
        }
      }
      
      const posts = await Post.find(query)
        .populate('category', 'name description')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
      
      const total = await Post.countDocuments(query)
      
      res.json({
        success: true,
        count: posts.length,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        },
        data: posts
      })
    } catch (error) {
      console.error('Get posts error:', error)
      res.status(500).json({
        success: false,
        message: 'Error fetching posts',
        error: error.message
      })
    }
  })

  // Get single post
  app.get('/api/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('category', 'name description')
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        })
      }
      
      res.json({
        success: true,
        data: post
      })
    } catch (error) {
      console.error('Get post error:', error)
      res.status(500).json({
        success: false,
        message: 'Error fetching post',
        error: error.message
      })
    }
  })

  // Create new post
  app.post('/api/posts', async (req, res) => {
    try {
      const post = await Post.create(req.body)
      await post.populate('category', 'name description')
      
      res.status(201).json({
        success: true,
        data: post
      })
    } catch (error) {
      console.error('Create post error:', error)
      res.status(400).json({
        success: false,
        message: 'Error creating post',
        error: error.message
      })
    }
  })

  // Update post
  app.put('/api/posts/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      ).populate('category', 'name description')
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        })
      }
      
      res.json({
        success: true,
        data: post
      })
    } catch (error) {
      console.error('Update post error:', error)
      res.status(400).json({
        success: false,
        message: 'Error updating post',
        error: error.message
      })
    }
  })

  // Delete post
  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id)
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        })
      }
      
      res.json({
        success: true,
        message: 'Post deleted successfully'
      })
    } catch (error) {
      console.error('Delete post error:', error)
      res.status(500).json({
        success: false,
        message: 'Error deleting post',
        error: error.message
      })
    }
  })

  // Add comment to post
  app.post('/api/posts/:id/comments', async (req, res) => {
    try {
      const { user, content } = req.body
      
      const post = await Post.findById(req.params.id)
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        })
      }
      
      const comment = {
        user,
        content,
        createdAt: new Date()
      }
      
      post.comments.push(comment)
      await post.save()
      
      const newComment = post.comments[post.comments.length - 1]
      
      res.status(201).json({
        success: true,
        data: newComment
      })
    } catch (error) {
      console.error('Add comment error:', error)
      res.status(400).json({
        success: false,
        message: 'Error adding comment',
        error: error.message
      })
    }
  })

  // Get all categories
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await Category.find().sort({ name: 1 })
      
      res.json({
        success: true,
        count: categories.length,
        data: categories
      })
    } catch (error) {
      console.error('Get categories error:', error)
      res.status(500).json({
        success: false,
        message: 'Error fetching categories',
        error: error.message
      })
    }
  })

  // Create new category
  app.post('/api/categories', async (req, res) => {
    try {
      const category = await Category.create(req.body)
      
      res.status(201).json({
        success: true,
        data: category
      })
    } catch (error) {
      console.error('Create category error:', error)
      res.status(400).json({
        success: false,
        message: 'Error creating category',
        error: error.message
      })
    }
  })

  // Basic route
  app.get('/', (req, res) => {
    res.json({ 
      message: 'MERN Blog API is running!',
      version: '1.0.0',
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      endpoints: {
        posts: '/api/posts',
        categories: '/api/categories',
        health: '/api/health'
      }
    })
  })

  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      mongodb: mongoose.connection.readyState === 1 ? {
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        readyState: mongoose.connection.readyState
      } : 'Disconnected'
    })
  })

  const PORT = process.env.PORT || 5000

  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    console.log(`📡 API URL: http://localhost:${PORT}/api`)
    console.log(`💾 Database: ${dbConnected ? '✅ Connected' : '❌ Disconnected'}`)
    
    if (!dbConnected) {
      console.log('💡 To fix MongoDB:')
      console.log('   1. Install MongoDB locally, OR')
      console.log('   2. Use MongoDB Atlas with correct credentials')
      console.log('   3. Update MONGODB_URI in .env file')
    }
  })
}

// Start the server
startServer()