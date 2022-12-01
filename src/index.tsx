import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {WithConfirmationService} from "./Wrappers/WithConfirmationService";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <WithConfirmationService>
          <App />
      </WithConfirmationService>
  </React.StrictMode>
);
