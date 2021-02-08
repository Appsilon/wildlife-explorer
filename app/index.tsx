import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Action, Dispatch } from 'redux';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { classifierStateType } from './reducers/types';
import { statusOnline } from './actions/online';
import { logError } from './actions/logError';
import './app.global.css';

const initialState: classifierStateType = {
  online: {
    isConnected: navigator.onLine
  },
  logMessage: '',
  classify: {
    directoryChoice: '',
    savePath: ''
  }
};
const store = configureStore(initialState);

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
const translations = require('assets/translations.json');

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng:
      window.localStorage.getItem('language') || navigator.language.startsWith('fr') ? 'fr' : 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: [
        // eslint-disable-next-line
        'br', 'strong', 'i', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
      ]
    }
  });

// Detect online/offline events and dispatch to state:
function dispatchOnlineStatus() {
  (store.dispatch as Dispatch<Action>)(statusOnline(navigator.onLine));
}
window.addEventListener('online', dispatchOnlineStatus);
window.addEventListener('offline', dispatchOnlineStatus);

// Log application errors along the state:
window.onerror = (
  message: string | Event,
  url: string | undefined,
  line: number | undefined,
  column: number | undefined,
  error: Error | undefined
) => {
  (store.dispatch as Dispatch<Action>)(
    logError({ message, url, line, column, error, state: store.getState() })
  );
};

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
