import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const PostDetail = () => {
  const { id } = useParams()
  const { currentPost, loading, error, loadPost, addComment } = useBlog()
  const [commentData, setCommentData] = useState({ user: '', content: '' })
  const [commentSuccess, setCommentSuccess] = useState(false)

  useEffect(() => {
    if (id) {
      loadPost(id)
    }
  }, [id])

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    try {
      await addComment(id, commentData)
      setCommentSuccess(true)
      setCommentData({ user: '', content: '' })
      setTimeout(() => setCommentSuccess(false), 3000)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (loading) return <div className="loading">Loading post...</div>
  if (error) return <div className="error-message">{error}</div>
  if (!currentPost) return <div className="error-message">Post not found</div>

  return (
    <div>
      <div style={styles.breadcrumb}>
        <Link to="/posts">← Back to Posts</Link>
      </div>

      <article className="card">
        <header style={styles.postHeader}>
          <h1 style={styles.postTitle}>{currentPost.title}</h1>
          <div style={styles.postMeta}>
            <span style={styles.postAuthor}>By {currentPost.author}</span>
            <span style={styles.postDate}>
              {new Date(currentPost.createdAt).toLocaleDateString()}
            </span>
            {currentPost.category && (
              <span style={styles.postCategory}>
                Category: {currentPost.category.name}
              </span>
            )}
          </div>
        </header>

        <div style={styles.postContent}>
          {currentPost.content.split('\n').map((paragraph, index) => (
            <p key={index} style={styles.paragraph}>{paragraph}</p>
          ))}
        </div>

        <footer style={styles.postActions}>
          <Link to={`/edit-post/${currentPost._id}`} className="btn btn-secondary">
            Edit Post
          </Link>
        </footer>
      </article>

      <section className="card" style={styles.commentsSection}>
        <h3>Comments ({currentPost.comments?.length || 0})</h3>
        
        {commentSuccess && (
          <div className="success-message">
            Comment added successfully!
          </div>
        )}

        <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Your name"
              value={commentData.user}
              onChange={(e) => setCommentData({...commentData, user: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Write your comment..."
              value={commentData.content}
              onChange={(e) => setCommentData({...commentData, content: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </form>

        <div style={styles.commentsList}>
          {currentPost.comments && currentPost.comments.length > 0 ? (
            currentPost.comments.map((comment, index) => (
              <div key={index} style={styles.comment}>
                <div style={styles.commentHeader}>
                  <strong>{comment.user}</strong>
                  <span style={styles.commentDate}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={styles.commentContent}>{comment.content}</p>
              </div>
            ))
          ) : (
            <p style={styles.noComments}>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>
    </div>
  )
}

const styles = {
  breadcrumb: {
    marginBottom: '1rem'
  },
  postHeader: {
    marginBottom: '2rem'
  },
  postTitle: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  postMeta: {
    display: 'flex',
    gap: '1rem',
    color: '#666',
    fontSize: '0.9rem'
  },
  postContent: {
    lineHeight: '1.8',
    marginBottom: '2rem'
  },
  paragraph: {
    marginBottom: '1rem'
  },
  postActions: {
    borderTop: '1px solid #eee',
    paddingTop: '1rem'
  },
  commentsSection: {
    marginTop: '2rem'
  },
  commentForm: {
    marginBottom: '2rem'
  },
  commentsList: {
    space: '1rem'
  },
  comment: {
    borderBottom: '1px solid #eee',
    padding: '1rem 0'
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  commentDate: {
    color: '#666',
    fontSize: '0.9rem'
  },
  commentContent: {
    lineHeight: '1.6'
  },
  noComments: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  }
}

export default PostDetail