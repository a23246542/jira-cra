import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import RouteView from 'routes';
import AuthenticatedApp from 'routes/AuthenticatedApp';
import UnauthenticatedApp from 'routes/UnauthenticatedApp';

function App() {
  const isLogin = false;
  return <Router>{isLogin ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Router>;
}

export default App;
