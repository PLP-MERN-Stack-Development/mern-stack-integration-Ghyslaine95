import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const Posts = () => {
  const { posts, loading, error, loadPosts } = useBlog()

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <div>
      <div style={styles.pageHeader}>
        <h1>All Posts</h1>
        <p>Discover amazing articles and stories</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div style={styles.postsList}>
          {posts.map(post => (
            <div key={post._id} className="card">
              <h2 style={styles.postTitle}>
                <Link to={`/posts/${post._id}`} style={styles.postLink}>
                  {post.title}
                </Link>
              </h2>
              <p style={styles.postExcerpt}>{post.excerpt}</p>
              <div style={styles.postMeta}>
                <span style={styles.postAuthor}>By {post.author}</span>
                <span style={styles.postDate}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span style={styles.postCategory}>
                  {post.category?.name}
                </span>
              </div>
              <div style={styles.postActions}>
                <Link 
                  to={`/posts/${post._id}`} 
                  className="btn btn-primary"
                  style={styles.readMore}
                >
                  Read More
                </Link>
                <Link 
                  to={`/edit-post/${post._id}`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="empty-state">
          <p>No posts found. Create the first one!</p>
          <Link to="/create-post" className="btn btn-primary">
            Create Post
          </Link>
        </div>
      )}
    </div>
  )
}

const styles = {
  pageHeader: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  postsList: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  postTitle: {
    marginBottom: '1rem',
    fontSize: '1.5rem'
  },
  postLink: {
    color: '#333',
    textDecoration: 'none'
  },
  postExcerpt: {
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  postMeta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    color: '#999'
  },
  postActions: {
    display: 'flex',
    gap: '1rem'
  },
  readMore: {
    marginRight: '10px'
  }
}

export default Posts