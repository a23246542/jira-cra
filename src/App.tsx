import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticatedApp, UnauthenticatedApp } from 'routes/index';

import { useAuth } from 'hooks/useAuth';

import './App.css';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Router>
  );
}

export default App;
