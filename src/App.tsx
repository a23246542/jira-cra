import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { FullPageLoading } from 'components/UI';
import './App.css';

const AuthenticatedApp = React.lazy(
  () => import('routes/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(
  () => import('routes/UnauthenticatedApp'),
);

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <React.Suspense fallback={<FullPageLoading />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </Router>
  );
}

export default App;
