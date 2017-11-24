import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation'

import * as actions from '../actions/actions_card'
import * as colors from '../utils/colors'
import * as helpers from '../utils/helpers'

import Loading from './common/component_loading'

// bug on showAnswer switching

class QuizCard extends Component {
    
    state = {
        showAnswer: false
    }

    componentDidMount() {
        const { deckId } = this.props.navigation.state.params
        this.startQuiz(deckId)
    }

    startQuiz = (deckId) => {
        this.props.startQuizSession(deckId)
    }

    getNextQuestion = (score) => {
        const { questions, state } = this.props.quiz
        const nextActiveQuestionIndex = state.activeQuestionIndex + 1
        const newState = helpers.getNewState(state, score, nextActiveQuestionIndex)
        if(nextActiveQuestionIndex <= questions.length - 1) {
            this.props.getNextQuestion(newState)
        } else {
            this.props.finishQuizSession(newState)
            helpers.clearLocalNotification()
                .then(helpers.setLocalNotification)
        }
    }

    toDeck = () => {
        const backAction = NavigationActions.back()
        this.props.navigation.dispatch(backAction)
    }

    renderText() {
        const { questions, state } = this.props.quiz

        if(this.state.showAnswer) {
            return (
                <Text style={styles.questionStyle}>{questions[state.activeQuestionIndex].answer}</Text>
            )
        }

        return (
            <Text style={styles.questionStyle}>{questions[state.activeQuestionIndex].question}</Text>
        )
    }

    render() {
        const { questions, state } = this.props.quiz
        const { deckId } = this.props.navigation.state.params
        
        if(!questions) {
            return (
                <Loading />
            )
        }

        if(!state.finished) {
            return (
                <View style={styles.container}>
                    <Text style={styles.quizStatusStyle}>Question {state.activeQuestionIndex + 1} of {questions.length}</Text>
                    {this.renderText()}
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosFlipBtn : styles.androidFlipBtn}
                        onPress={() => this.state.showAnswer ? this.setState({showAnswer: false}) : this.setState({showAnswer: true})}
                    >
                        <Text style={styles.flipBtnText}>See {!this.state.showAnswer ? 'Answer' : 'Question'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.androidCorrectBtn}
                        onPress={() => this.getNextQuestion('correct')}
                    >
                        <Text style={styles.correctBtnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosIncorrectBtn : styles.androidIncorrectBtn}
                        onPress={() => this.getNextQuestion('incorrect')}
                    >
                        <Text style={styles.incorrectBtnText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.quizStatusStyle}>Congratulations! You've finished the Quiz.</Text>
                    <Text style={styles.quizStatusStyle}>Results: You answered {state.percentage}% of the questions correctly</Text>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosFinishBtn : styles.androidFinishBtn}
                        onPress={() => this.startQuiz(deckId)}
                    >
                        <Text style={styles.finishBtnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosFinishBtn : styles.androidFinishBtn}
                        onPress={() => this.toDeck()}
                    >
                        <Text style={styles.finishBtnText}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  quizStatusStyle: {
      fontSize: 15,
      marginBottom: 30,
      textAlign: 'center'
  },
  questionStyle: {
      fontSize: 25,
      marginBottom: 20,
      textAlign: 'center'
  },
  iosFlipBtn: {
      backgroundColor: colors.purple,
      padding: 10,
      borderRadius: 10,
      height: 35,
      width: 150,
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 50,
  },
  androidFlipBtn: {
      backgroundColor: colors.purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 5,
      height: 35,
      width: 150,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
  },
  flipBtnText: {
      color: colors.white,
      fontSize: 14,
      textAlign: 'center',
  },
  iosIncorrectBtn: {
      backgroundColor: colors.red,
      padding: 10,
      borderRadius: 7,
      height: 45,
      width: 200,
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 10,
  },
  androidIncorrectBtn: {
      backgroundColor: colors.red,
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
  incorrectBtnText: {
      color: colors.white,
      fontSize: 18,
      textAlign: 'center',
  },
  finishBtnText: {
      color: colors.purple,
      fontSize: 18,
      textAlign: 'center',
  },
  iosCorrectBtn: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 7,
      height: 45,
      width: 200,
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 10,
  },
  androidCorrectBtn: {
      backgroundColor: 'green',
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
  iosFinishBtn: {
      padding: 10,
      borderWidth: 1,
      borderColor: colors.purple,
      borderRadius: 7,
      height: 45,
      width: 200,
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 10,
  },
  androidFinishBtn: {
      backgroundColor: 'black',
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
  correctBtnText: {
      color: colors.white,
      fontSize: 18,
      textAlign: 'center',
  },
});

function mapStateToProps({ quiz }) {
    return { quiz }
}

export default connect(mapStateToProps, { ...actions })(QuizCard)