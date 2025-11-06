import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
  };

  return (
    <header style={headerStyle}>
      <h1>
        <Link to="/" style={linkStyle}>MERN Blog</Link>
      </h1>
      <nav>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/create-post" style={linkStyle}>Create Post</Link>
        {/* We'll add Login/Register links in Task 5 */}
      </nav>
    </header>
  );
};

export default Header;