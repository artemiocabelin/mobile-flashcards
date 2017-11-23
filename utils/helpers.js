import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function getDecks() {
    return AsyncStorage.getAllKeys().then(keys => {

        const deckKeys = keys.filter((key) => key != NOTIFICATION_KEY)

        return AsyncStorage.multiGet(deckKeys).then(decks => {
            let deckList = {}
            
            decks.map(deck => {
                let key = deck[0]
                let value = JSON.parse(deck[1])
                deckList[key] = value
            })
            return deckList
        })
    })
}

export function saveDeckTitle(title) {
    const deckValue = {
        title,
        questions: []
    }
    return AsyncStorage.setItem(title, JSON.stringify(deckValue))
        .then(() => ({[title] : deckValue}))
}

export function addCardToDeck(deckId, card) {
    return AsyncStorage.getItem(deckId)
        .then(JSON.parse)
        .then(deck => {
            deck.questions.push(card)
            AsyncStorage.mergeItem(deckId, JSON.stringify(deck))
            return deck
        })
}

export function startQuizSession(deckId) {
    let initialQuizSettings = {
        state: {
            activeQuestionIndex: 0,
            correctAns: 0,
            incorrectAns: 0,
            finished: false,
            percentage: 0
        }
    }

    return AsyncStorage.getItem(deckId)
        .then(JSON.parse)
        .then(deck => {
            return Object.assign({}, deck, initialQuizSettings)
        })
}

export function getNewState(state, score, idx) {
    let newState = {...state}
    newState.activeQuestionIndex = idx
    if(score === 'correct') {
        newState.correctAns ++
    } else if (score === 'incorrect') {
        newState.incorrectAns ++
    }
    return newState
}

export function setFinishedState(state) {
    let newState = {...state}
    newState.finished = true
    newState.percentage = Math.floor((newState.correctAns / (newState.correctAns + newState.incorrectAns)) * 100)
    return newState
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Start a Quiz!',
    body: "Don't forget to complete at least one quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() * 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItems(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}