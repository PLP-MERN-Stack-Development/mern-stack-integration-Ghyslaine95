import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentPost, loadPost, updatePost, categories, loadCategories } = useBlog()
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
    loadCategories()
    if (id) {
      loadPost(id)
    }
  }, [id])

  useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title || '',
        content: currentPost.content || '',
        excerpt: currentPost.excerpt || '',
        category: currentPost.category?._id || '',
        author: currentPost.author || '',
        tags: currentPost.tags?.join(', ') || ''
      })
    }
  }, [currentPost])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      await updatePost(id, postData)
      navigate(`/posts/${id}`)
    } catch (error) {
      console.error('Error updating post:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!currentPost) {
    return <div className="loading">Loading post...</div>
  }

  return (
    <div>
      <div style={styles.pageHeader}>
        <h1>Edit Post</h1>
        <p>Update your post content</p>
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
          />
        </div>

        <div style={styles.formRow}>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="category">Category *</label>
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
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Post'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate(`/posts/${id}`)}
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

export default EditPost