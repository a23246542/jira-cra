import { useMatch, useResolvedPath } from 'react-router-dom';

enum ProjectRoute {
  KANBAN = 'kanban',
  EPIC = 'epic',
}

export const useRouteType = () => {
  const resolver = useResolvedPath('');

  const matchKanban = useMatch(
    `${resolver.pathname}/${ProjectRoute.KANBAN}`,
  );
  const matchEpic = useMatch(
    `${resolver.pathname}/${ProjectRoute.EPIC}`,
  );

  if (!!matchKanban) return ProjectRoute.KANBAN;

  if (!!matchEpic) return ProjectRoute.EPIC;

  return ProjectRoute.KANBAN;
};
