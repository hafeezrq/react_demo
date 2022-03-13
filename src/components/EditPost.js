import React, { useContext, useEffect, useState } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import api from '../api/posts';
import DataContext from '../context/DataContex';

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);
  const history = useHistory();

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async id => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map(post => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle('');
      setEditBody('');
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className='NewPost'>
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={e => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              id='editTitle'
              type='text'
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
              id='postBody'
              required
              value={editBody}
              onChange={e => setEditBody(e.target.value)}
            />
            <button type='submit' onClick={() => handleEdit(post.id)}>
              Edit Post
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post not found!</h2>
          <p>Well, that is disappointing.</p>
          <Link to='/'>Visit Home Page</Link>
        </>
      )}
    </main>
  );
};

export default EditPost;
