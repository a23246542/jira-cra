import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool';
import { AppProvider } from 'provider';

import 'antd/dist/antd.less';

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        <>
          <App />
          <DevTools />
        </>
      </AppProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
