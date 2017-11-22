import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux' 

import * as colors from '../utils/colors'

class DeckDetails extends Component {
  state = {
    error: ''
  }

  static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params
        return {
            title: deckId
        }
  }

  renderError = () => {
        if(this.state.error) {
            return (
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
            )
        } else {
            return null
        }
    }

  render() {
    const { deckId } = this.props.navigation.state.params
    const { decks } = this.props
    const { title, questions } = decks[deckId]

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.cardsStyle}>{questions.length} {questions.length > 1 ? 'cards' : 'card'}</Text>

            <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                onPress={() => {
                  this.setState({error:''})
                  this.props.navigation.navigate(
                    'NewCard',
                    { deckId }
                )}}
            >
                <Text style={styles.submitBtnText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                onPress={() => questions.length > 0 ? this.props.navigation.navigate(
                    'QuizCard',
                    { deckId }
                ) : this.setState({error: 'Cannot start an empty quiz'})}
            >
                <Text style={styles.submitBtnText}>Start Quiz</Text>
            </TouchableOpacity>
            {this.renderError()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  titleStyle: {
      fontSize: 40
  },
  cardsStyle: {
      fontSize: 25,
      color: '#111',
      marginBottom: 20,
  },
  iosSubmitBtn: {
      backgroundColor: colors.lightPurp,
      padding: 10,
      borderRadius: 7,
      height: 45,
      width: 200,
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 10,
  },
  androidSubmitBtn: {
      backgroundColor: colors.lightPurp,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 2,
      height: 45,
      width: 200,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
  },
  submitBtnText: {
      color: colors.white,
      fontSize: 18,
      textAlign: 'center',
  },
  errorText: {
      fontSize: 14,
      alignSelf: 'center',
      color: 'red',
      marginBottom: 10,
  }
});

function mapStateToProps({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(DeckDetails)