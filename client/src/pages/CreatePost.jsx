import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const CreatePost = () => {
  const navigate = useNavigate()
  const { createPost, categories, loadCategories } = useBlog()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: '',
    tags: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    console.log('Loading categories...')
    loadCategories()
  }, [])

  useEffect(() => {
    console.log('Categories updated:', categories)
  }, [categories])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.category) {
      alert('Please select a category')
      return
    }
    
    setSubmitting(true)
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      await createPost(postData)
      navigate('/posts')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div style={styles.pageHeader}>
        <h1>Create New Post</h1>
        <p>Share your thoughts and ideas with the world</p>
        <p>Available categories: {categories.length}</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows="3"
            placeholder="Brief description of your post"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="10"
            placeholder="Write your post content here..."
          />
        </div>

        <div style={styles.formRow}>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="category">Category * ({categories.length} available)</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p style={{color: 'red', fontSize: '0.9rem'}}>
                No categories available. Please run the seeder.
              </p>
            )}
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="tag1, tag2, tag3"
          />
          <small style={styles.helpText}>Separate tags with commas</small>
        </div>

        <div style={styles.formActions}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting || categories.length === 0}
          >
            {submitting ? 'Publishing...' : 'Publish Post'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/posts')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

const styles = {
  pageHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  formGroup: {
    marginBottom: 0
  },
  helpText: {
    color: '#666',
    fontSize: '0.9rem'
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  }
}

export default CreatePost