import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          MERN Blog
        </Link>
        <ul style={styles.navMenu}>
          <li style={styles.navItem}>
            <Link 
              to="/" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/' ? styles.activeLink : {})
              }}
            >
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/posts" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/posts' ? styles.activeLink : {})
              }}
            >
              Posts
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link 
              to="/create-post" 
              style={{
                ...styles.navLink,
                ...(location.pathname === '/create-post' ? styles.activeLink : {})
              }}
            >
              Create Post
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

const styles = {
  navbar: {
    backgroundColor: '#343a40',
    padding: '1rem 0',
    marginBottom: '2rem'
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem'
  },
  navItem: {
    margin: 0
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  activeLink: {
    backgroundColor: '#007bff'
  }
}

export default Navbar