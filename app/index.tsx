import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

// Todo: move translations to a JSON file and import them
const resources = {
  fr: {
    translation: {
      'Welcome to Mbaza AI!': 'FR Welcome to Mbaza AI!',
      Explore: 'FR Explore',
      Classify: 'FR Classify',
      Home: 'FR Home',
      Projects: 'FR Projects',
      'The first offline AI wildlife explorer':
        'FR The first offline AI wildlife explorer',
      'AI for species discovery': 'FR AI for species discovery',
      'Find animals!': 'FR Find animals!',
      'Choose directory with photos': 'FR Choose directory with photos',
      'Prediction progress': 'FR Prediction progress',
      'Choose results file to analyze': 'FR Choose results file to analyze'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// Detect online/offline events and dispatch to state:
function dispatchOnlineStatus() {
  store.dispatch(statusOnline(navigator.onLine));
}
window.addEventListener('online', dispatchOnlineStatus);
window.addEventListener('offline', dispatchOnlineStatus);

// Log application errors along the state:
window.onerror = (
  message: string | Event,
  url: string | undefined,
  line: number,
  column: number,
  error: Error
) => {
  store.dispatch(
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
