import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import { AuthScreen } from 'screens';
import { LoginLayout } from 'layouts/loginLayout';

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      {
        path: '',
        element: <AuthScreen />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default function RouteView() {
  const element = useRoutes(routes);
  return element;
}
