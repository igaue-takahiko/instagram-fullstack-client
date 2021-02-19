import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { PageRender, PrivateRouter} from './customRouter';
import { Home, Login, Register } from './pages';
import { Alert, Header } from './components';
import { refreshToken } from './redux/auth/actions';

const App = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])

  return (
    <>
    <Alert />
    <input type="checkbox" id="theme" />
      <div className="App">
          {auth.token && <Header />}
        <div className="main">
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </>
  );
}

export default App;
