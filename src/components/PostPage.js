import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { Link, useParams, useHistory } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const getPostById = useStoreState(state => state.getPostById);
  const post = getPostById(id);
  const deletePost = useStoreActions(actions => actions.deletePost);
  const history = useHistory();

  const handleDelete = id => {
    deletePost(id);
    history.push('/');
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
