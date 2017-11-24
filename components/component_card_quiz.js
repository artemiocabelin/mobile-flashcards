import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native';
import { NavigationActions } from 'react-navigation'

import * as actions from '../actions/actions_card'
import * as colors from '../utils/colors'
import * as helpers from '../utils/helpers'

import Loading from './common/component_loading'
import QuestionDisplay from './common/component_display_question'
import FinishDisplay from './common/component_display_finish'

class QuizCard extends Component {
    
    state = {
        showAnswer: false,
    }

    componentDidMount() {
        const { deckId } = this.props.navigation.state.params
        this.props.startQuizSession(deckId)
    }

    getNextQuestion = (score) => {
        const { questions, state } = this.props.quiz
        const nextActiveQuestionIndex = state.activeQuestionIndex + 1
        const newState = helpers.getNewState(state, score, nextActiveQuestionIndex)
        if(nextActiveQuestionIndex <= questions.length - 1) {
            this.setState({showAnswer: false})
            this.props.getNextQuestion(newState)
        } else {
            this.setState({showAnswer: false})
            this.props.finishQuizSession(newState)
            helpers.clearLocalNotification()
                .then(helpers.setLocalNotification)
        }
    }

    toDeck = () => {
        const backAction = NavigationActions.back()
        this.props.navigation.dispatch(backAction)
    }

    renderShowAnswerText() {
        const { questions, state } = this.props.quiz
        return this.state.showAnswer 
            ? <Text style={styles.questionStyle}>{questions[state.activeQuestionIndex].answer}</Text>
            : <Text style={styles.questionStyle}>{questions[state.activeQuestionIndex].question}</Text>
        
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
            const btnTextFnColorList =[
                    ['Correct', () => this.getNextQuestion('correct'), 'green'],
                    ['Incorrect', () => this.getNextQuestion('incorrect'), 'red']
                ]
            return (
                <QuestionDisplay 
                    btnTextFnColorList={btnTextFnColorList} 
                    textList={[`Question ${state.activeQuestionIndex + 1} of ${questions.length}`, this.renderShowAnswerText()]} 
                    flipText={`See ${!this.state.showAnswer ? 'Answer' : 'Question'}`} 
                    flipFunc={() => this.state.showAnswer ? this.setState({showAnswer: false}) : this.setState({showAnswer: true})} 
                />
            )
        } else {
            const textList = ["Congratulations! You've finished the Quiz.", `Results: You answered ${state.percentage}% of the questions correctly`]
            const btnTextFnList =[
                    ['Restart Quiz', () => this.props.startQuizSession(deckId)],
                    ['Back To Deck', () => this.toDeck()]
                ]
            return (
                <FinishDisplay btnTextFnList={btnTextFnList} textList={textList} />
            )
        }

    }
}

const styles = StyleSheet.create({
  questionStyle: {
      fontSize: 25,
      marginBottom: 20,
      textAlign: 'center'
  },
});

function mapStateToProps({ quiz }) {
    return { quiz }
}

export default connect(mapStateToProps, { ...actions })(QuizCard)