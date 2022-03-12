import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);
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
