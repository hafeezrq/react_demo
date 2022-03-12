import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import api from './api/posts';

import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import Missing from './components/Missing';
import About from './components/About';
import EditPost from './components/EditPost';
import useWindowSize from './hooks/useWindowSize';

function App() {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const { width } = useWindowSize();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('posts');
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          // Response is not 200 range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      post =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async e => {
    e.preventDefault();
    const id = posts.length >= 0 ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      // const allPosts = [...posts, newPost];
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

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
    <div className='App'>
      <Header title='React JS Blog' width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path='/'>
          <Home posts={searchResults} />
        </Route>
        <Route exact path='/post'>
          <NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
        </Route>
        <Route path='/edit/:id'>
          <EditPost
            posts={posts}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
            handleEdit={handleEdit}
          />
        </Route>
        <Route path='/posts/:id'>
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path='/about' component={About} />
        <Route path='*' component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
