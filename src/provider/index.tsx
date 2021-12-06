import { Provider } from 'react-redux';

import { store } from 'redux/store';
import { AuthProvider } from './AuthProvider';

export const AppProvider = ({
  children,
}: {
  children: React.ReactChild;
}) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
