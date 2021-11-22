import {
  useRoutes,
  RouteObject,
  Navigate,
} from 'react-router-dom';
import { AuthScreen } from 'screens';
import { AuthProvider } from 'provider';
import {
  AuthScreenContainer,
  ScreenContainer,
} from 'components/UI';

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <AuthScreenContainer />,
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
