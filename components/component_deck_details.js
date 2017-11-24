import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux' 

import * as colors from '../utils/colors'

import ErrorMsg from './common/component_error'
import Loading from './common/component_loading'
import Button from './common/component_button'

class DeckDetails extends Component {
  state = { error: '' }

  static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params
        return {
            title: deckId
        }
  }

  toNewCard = (deckId) => {
    this.setState({error:''})
    this.props.navigation.navigate('NewCard', { deckId })
  }

  toQuizCard = (deckId, questions) => {
    questions.length > 0 
      ? this.props.navigation.navigate('QuizCard', { deckId }) 
      : this.setState({error: 'Cannot start an empty quiz'})
  }

  render() {
    const { deckId } = this.props.navigation.state.params
    const { decks } = this.props
    const props = this.props

    if(!decks[deckId]) {
      return (
        <Loading />
      )
    }

    const { title, questions } = decks[deckId]

    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text style={styles.cardsStyle}>{questions.length} {questions.length > 1 ? 'cards' : 'card'}</Text>
            <Button 
              text={'Add Card'} 
              textBtnStyle={styles.submitBtnText} 
              onClick={() => this.toNewCard(deckId)} 
              iosStyle={styles.iosSubmitBtn}
              androidStyle={styles.androidSubmitBtn} />
            <Button 
              text={'Start Quiz'} 
              textBtnStyle={styles.submitBtnText} 
              onClick={()=> this.toQuizCard(deckId, questions)} 
              iosStyle={styles.iosSubmitBtn}
              androidStyle={styles.androidSubmitBtn} />
            <ErrorMsg error={this.state.error} />
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
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
  },
  submitBtnText: {
      color: colors.white,
      fontSize: 18,
      textAlign: 'center',
  },
});

function mapStateToProps({ decks }) {
  return { decks }
}

export default connect(mapStateToProps)(DeckDetails)