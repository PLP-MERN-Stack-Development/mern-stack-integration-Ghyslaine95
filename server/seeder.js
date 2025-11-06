const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Post = require('./models/Post');

dotenv.config();

const categories = [
  {
    name: 'Technology',
    description: 'Posts about technology and programming'
  },
  {
    name: 'Lifestyle', 
    description: 'Posts about lifestyle and personal development'
  },
  {
    name: 'Travel',
    description: 'Posts about travel experiences and tips'
  }
];

const posts = [
  {
    title: 'Welcome to MERN Blog',
    content: 'This is a complete MERN stack blog application with full CRUD functionality. Built with MongoDB, Express.js, React.js, and Node.js.',
    author: 'Admin',
    tags: ['mern', 'blog', 'tutorial']
  },
  {
    title: 'Getting Started with React',
    content: 'React is a powerful JavaScript library for building user interfaces. Learn how to create components and manage state effectively.',
    author: 'Jane Smith', 
    tags: ['react', 'javascript', 'frontend']
  },
  {
    title: 'Building REST APIs with Express',
    content: 'Express.js makes it easy to build robust RESTful APIs. This guide covers routing, middleware, and error handling.',
    author: 'John Doe',
    tags: ['express', 'nodejs', 'api']
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI not found in .env file');
    }
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');

    // Clear existing data
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} categories seeded`);

    // Create posts with category references
    const postsWithCategories = posts.map((post, index) => ({
      ...post,
      category: createdCategories[index % createdCategories.length]._id
    }));

    const createdPosts = await Post.insertMany(postsWithCategories);
    console.log(`✅ ${createdPosts.length} posts seeded`);

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Total categories: ${createdCategories.length}`);
    console.log(`📊 Total posts: ${createdPosts.length}`);
    
    // List all categories for verification
    console.log('\n📋 Categories:');
    createdCategories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat._id})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();