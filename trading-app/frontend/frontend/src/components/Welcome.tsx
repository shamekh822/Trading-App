import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <h1>Welcome to the Trading App. Please Login</h1>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Welcome;
