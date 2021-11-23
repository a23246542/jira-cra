import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import {
  AuthenticatedApp,
  UnauthenticatedApp,
} from 'routes/index';

function App() {
  const isLogin = true;
  return (
    <Router>
      {isLogin ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </Router>
  );
}

export default App;
