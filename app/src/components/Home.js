import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/new-form">
        <button>Log Recovery</button>
      </Link>
      <Link to="/view-forms">
        <button>View Recovery Logs</button>
      </Link>
    </div>
  );
};

export default Home;