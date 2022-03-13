import React, { Fragment, useContext } from 'react';

import { Link, useParams, useHistory } from 'react-router-dom';

import api from '../api/posts';
import DataContext from '../context/DataContex';

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);
  const history = useHistory();

  const handleDelete = async id => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id.toString() !== id);
      setPosts(postsList);
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <button className='deletButton' onClick={() => handleDelete(id)}>
              Delete Post
            </button>
            <Link to={`/edit/${post.id}`}>
              <button className='editButton'>Edit Post</button>
            </Link>
          </>
        )}
        {!post && (
          <>
            <h2>Post not found!</h2>
            <p>Well, that is disappointing.</p>
            <Link to='/'>Visit Home Page</Link>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
