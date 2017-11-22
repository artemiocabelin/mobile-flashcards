import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import * as colors from '../utils/colors'
import { createDeck } from '../actions'

class NewDeck extends Component {
  
    state = {
        text: '',
        error: ''
    }

    submit = () => {
        this.setState({error: ''})
        
        if(this.state.text === '') {
            this.setState({error: 'Please enter a title for your deck'})
        } else {
            this.props.createDeck(this.state.text)

            this.setState({
                text: '',
                error: '',
            })
            
            this.toDeckList()

        }
    }

    toDeckList = () => {
        const backAction = NavigationActions.back({
            key: 'NewDeck'
        })
        this.props.navigation.dispatch(backAction)
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
        return (
            <View style={styles.container}>
                <Text style={styles.label}>What is the title of your new deck?</Text>
                <TextInput 
                    value={this.state.text}
                    onChangeText={ text => this.setState({ text })}
                    style={styles.textBox}
                    placeholder={'Enter your title here'}
                />
                {this.renderError()}
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                    onPress={this.submit}
                >
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
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
    iosSubmitBtn: {
        backgroundColor: colors.purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: colors.purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        width: 200,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
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


export default connect(null, { createDeck })(NewDeck)