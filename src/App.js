import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import Missing from './components/Missing';
import About from './components/About';
import EditPost from './components/EditPost';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const setPosts = useStoreActions(actions => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className='App'>
      <Header title='React JS Blog' />
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Home isLoading={isLoading} fetchError={fetchError} />
        </Route>
        <Route exact path='/post' component={NewPost} />
        <Route path='/edit/:id' component={EditPost} />
        <Route path='/posts/:id' component={PostPage} />
        <Route path='/about' component={About} />
        <Route path='*' component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
