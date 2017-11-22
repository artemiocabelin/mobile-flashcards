import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import promise from 'redux-promise';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'

import reducers from './reducers'
import * as colors from './utils/colors'
import DeckList from './components/component_deck_list'
import NewDeck from './components/component_deck_new'
import DeckDetails from './components/component_deck_details'
import NewCard from './components/component_card_add'


function UdaciStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-paper' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='playlist-plus' size={30} color={tintColor} />
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? colors.purple : colors.white,
    style : {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? colors.white : colors.purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.purple,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.purple,
      }
    }
  },
})

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)} >  
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={colors.purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

