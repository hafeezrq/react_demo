import React, { useEffect } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { format } from 'date-fns';

const EditPost = () => {
  const history = useHistory();
  const { id } = useParams();

  const editTitle = useStoreState(state => state.editTitle);
  const editBody = useStoreState(state => state.editBody);

  const editPost = useStoreActions(actions => actions.editPost);
  const setEditTitle = useStoreActions(actions => actions.setEditTitle);
  const setEditBody = useStoreActions(actions => actions.setEditBody);

  const getPostById = useStoreState(state => state.getPostById);
  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = id => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatePost);
    history.push(`/posts/${id}`);
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
