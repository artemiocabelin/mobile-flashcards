import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import * as colors from '../utils/colors'
import * as actions from '../actions/actions_deck'

import ErrorMsg from './common/component_error'
import SubmitButton from './common/component_button_submit'

// submit button moves if keyboard is up
// keyboard hides after submit

class NewDeck extends Component {
  
    state = {
        text: '',
        error: ''
    }

    submit = () => {
        this.setState({error: ''})
        this.createDeck()
    }

    createDeck = () => {
        const { text } = this.state
        const allDeckKeys = Object.keys(this.props.decks)

        if (text === '') {
            this.setState({error: 'Please enter a title for your deck'})
        } else if (allDeckKeys.includes(text)) {
            this.setState({error: 'Deck title already exists. Please enter another title.'})
        } else {
            this.props.createDeck(text, this.toDeck(text))
            this.setState({ text: ''})
        }
    }

    toDeck = (deckId) => {
        this.props.navigation.navigate('DeckDetails', { deckId })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>What is the title of your new deck?</Text>
                <TextInput 
                    value={this.state.text}
                    onChangeText={ text => this.setState({ text })}
                    style={styles.textBox}
                    placeholder={'Enter your title here'}
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
        backgroundColor: colors.white,
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

function mapStateToProps({ decks }) {
    return { decks }
}

export default connect(mapStateToProps, { ...actions })(NewDeck)