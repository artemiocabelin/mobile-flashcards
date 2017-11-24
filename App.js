import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise';

import reducers from './reducers'
import * as colors from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import { MainNavigator } from './navigators'
import FlashCardStatusBar from './components/component_status_bar'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)} >  
        <View style={{flex: 1}}>
          <FlashCardStatusBar backgroundColor={colors.purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

