import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      borderBottom: '1px solid #ccc'
    }}>
      <Link to="/">Home</Link>
      <Link to="/collapsible">Collapsible Panel</Link>
      <Link to="/transformer">String Array Transformer</Link>
    </nav>
  );
};

export default Navbar;