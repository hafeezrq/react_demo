import React from 'react';
import { useContext } from 'react';
import DataContext from '../context/DataContex';

import { Link } from 'react-router-dom';

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav className='Nav'>
      <form className='searchForm'>
        <label htmlFor='search'>Search</label>
        <input
          id='search'
          type='text'
          placeholder='Search Posts'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/post'>Post</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
