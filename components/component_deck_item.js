import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DeckItem extends Component {
  
    render() {
        const { title, questions} = this.props.item
        
        return (
            <View style={styles.container}>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={styles.cardsStyle}>{questions.length} {questions.length > 1 ? 'cards' : 'card'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5,
    padding: 50,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
        width: 0,
        height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  },
  titleStyle: {
      fontSize: 20
  },
  cardsStyle: {
      fontSize: 15,
      color: '#111'
  }
});