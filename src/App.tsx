import * as React from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './navigations/MainNavigation';
import store from './reducers/rootReducer';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}
