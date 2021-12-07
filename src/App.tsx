import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticatedApp, UnauthenticatedApp } from 'routes/index';

import { useSelector } from 'react-redux';
import { selectUser } from 'redux/entities/auth.slice';
import './App.css';

function App() {
  const user = useSelector(selectUser);
  // const isLogin = false;
  return (
    <Router>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Router>
  );
}

export default App;
