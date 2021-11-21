import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import {
  LoginScreen,
  RegisterScreen,
  ProjectListScreen,
  ProjectScreen,
  KanbanScreen,
  EpicScreen,
} from 'screens';
import { AuthScreenContainer, ScreenContainer } from 'components/UI';

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <ScreenContainer />,
    children: [
      {
        path: 'projects',
        element: <ProjectListScreen />,
      },
      {
        path: 'project/:id',
        element: <ProjectScreen />,
        children: [
          {
            path: 'kanban',
            element: <KanbanScreen />,
          },
          {
            path: 'epic',
            element: <EpicScreen />,
          },
          {
            path: '',
            element: <Navigate to="kanban" replace />,
          },
        ],
      },
      {
        path: '',
        element: <Navigate to="projects" replace />,
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
