import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import * as colors from '../utils/colors'

import DeckList from '../components/component_deck_list'
import NewDeck from '../components/component_deck_new'
import DeckDetails from '../components/component_deck_details'
import NewCard from '../components/component_card_add'
import QuizCard from '../components/component_card_quiz'

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
  swipeEnabled: true,
  animationEnabled: true,
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

export const MainNavigator = StackNavigator({
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
  QuizCard: {
    screen: QuizCard,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.purple,
      }
    }
  },
})
