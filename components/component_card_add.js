import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View, TextInput} from 'react-native';

import * as colors from '../utils/colors'
import * as actions from '../actions/actions_deck'

import ErrorMsg from './common/component_error'
import SubmitButton from './common/component_button_submit'

// submit button moves if keyboard is up
// keyboard hides after submit

class NewCard extends Component {
  
    state = {
        questionText: '',
        answerText: '',
        error: ''
    }

    submit = () => {
        const { deckId } = this.props.navigation.state.params
        this.setState({error: ''})
        this.addCardToDeck(deckId)
    }

    addCardToDeck = (deckId) => {
        if(this.state.questionText === '' || this.state.answerText === '') {
            this.setState({error: 'Please complete the form before submitting'})
        } else {
            const cardData = {
                question: this.state.questionText,
                answer: this.state.answerText,
            }
            this.props.addCardToDeck(deckId, cardData)
            this.setState({
                questionText: '',
                answerText: '',
            })
            this.toDeck()
        }
    }

    toDeck = () => {
        const backAction = NavigationActions.back()
        this.props.navigation.dispatch(backAction)
    }

    

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Add a New Card</Text>
                <TextInput 
                    value={this.state.questionText}
                    onChangeText={ questionText => this.setState({ questionText })}
                    style={styles.textBox}
                    placeholder={'Enter the card question here'}
                />
                <TextInput 
                    value={this.state.answerText}
                    onChangeText={ answerText => this.setState({ answerText })}
                    style={styles.textBox}
                    placeholder={'Enter the card answer here'}
                />
                <ErrorMsg error={this.state.error} />
                <SubmitButton onClick={this.submit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    textBox: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        height: 50,
        textAlign: 'center',
        marginBottom: 10,
    },
});


export default connect(null, { ...actions })(NewCard)