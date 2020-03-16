import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

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
      'Choose directory and start predictions!':
        'FR Choose directory and start predictions!'
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

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
