import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page not found!</h2>
      <p>Well, that is disappointing.</p>
      <Link to='/'>Visit Home Page</Link>
    </main>
  );
};

export default Missing;
