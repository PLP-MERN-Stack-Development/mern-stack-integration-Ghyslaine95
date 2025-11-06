import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const Home = () => {
  const { posts, loading, loadPosts } = useBlog()

  useEffect(() => {
    loadPosts()
  }, [])

  const featuredPosts = posts.slice(0, 3)

  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to MERN Blog</h1>
          <p style={styles.heroSubtitle}>
            A modern blog application built with the MERN stack
          </p>
          <Link to="/posts" className="btn btn-primary">
            Explore Posts
          </Link>
        </div>
      </section>

      <section style={styles.featuredSection}>
        <div style={styles.sectionHeader}>
          <h2>Featured Posts</h2>
          <Link to="/posts" style={styles.viewAll}>
            View All Posts →
          </Link>
        </div>

        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : (
          <div style={styles.postsGrid}>
            {featuredPosts.map(post => (
              <div key={post._id} className="card">
                <h3 style={styles.postTitle}>
                  <Link to={`/posts/${post._id}`} style={styles.postLink}>
                    {post.title}
                  </Link>
                </h3>
                <p style={styles.postExcerpt}>{post.excerpt}</p>
                <div style={styles.postMeta}>
                  <span style={styles.postAuthor}>By {post.author}</span>
                  <span style={styles.postDate}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && featuredPosts.length === 0 && (
          <div className="empty-state">
            <p>No posts found. Be the first to create one!</p>
            <Link to="/create-post" className="btn btn-secondary">
              Create Post
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

const styles = {
  hero: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '4rem 0',
    textAlign: 'center',
    marginBottom: '3rem',
    borderRadius: '8px'
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9
  },
  featuredSection: {
    marginBottom: '3rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  viewAll: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500'
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  postTitle: {
    marginBottom: '1rem',
    fontSize: '1.25rem'
  },
  postLink: {
    color: '#333',
    textDecoration: 'none'
  },
  postExcerpt: {
    color: '#666',
    marginBottom: '1rem'
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#999'
  }
}

export default Home