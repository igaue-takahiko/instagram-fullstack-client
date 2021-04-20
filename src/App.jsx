import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';

import { PageRender, PrivateRouter } from './customRouter';
import { Home, Login, Register } from './pages';
import { Alert, Header, StatusModal } from './components';
import SocketClient from './SocketClient';

import { refreshToken } from './redux/auth/actions';
import { getPosts } from './redux/homePost/actions';
import { getSuggestions } from './redux/suggestions/actions';
import { getNotifies } from './redux/notify/actions';

import { globalTypes } from './redux/globalState/types';

const App = () => {
  const dispatch = useDispatch()
  const { auth, status, modal } = useSelector(state => state)

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({ type: globalTypes.SOCKET, payload: socket })
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  },[auth.token, dispatch])

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification")
    } else if (Notification.permission === "granted") {

    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {}
      })
    }
  },[])

  return (
    <>
    <Alert />
    <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
          {auth.token && <Header />}
        <div className="main">
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <div className="wrap_page">
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
