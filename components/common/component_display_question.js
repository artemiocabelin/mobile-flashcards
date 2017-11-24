import _ from 'lodash'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import * as colors from '../../utils/colors'
import Button from './component_button'

class QuestionDisplay extends Component {

    renderTexts = (textList) => {
        return _.map(textList, (text) => {
            return (
                <Text key={text} style={styles.quizStatusStyle}>{text}</Text>
            )
        })
    }

    renderButtons = (btnTextFnColorList,) => {
        return _.map(btnTextFnColorList, (textFnColor) => {
            return (
                <Button 
                    key={textFnColor[0]} 
                    text={textFnColor[0]} 
                    textBtnStyle={styles.correctBtnText} 
                    onClick={textFnColor[1]} 
                    iosStyle={styles.iosCorrectBtn}
                    androidStyle={styles.androidCorrectBtn}
                    backgroundColor={textFnColor[2]} />
            )
        })
        
    }
    
    render() {
        const { btnTextFnColorList, textList, flipText, flipFunc } = this.props
        return (
            <View style={styles.container}>
                {this.renderTexts(textList)}
                <Button 
                    text={flipText} 
                    textBtnStyle={styles.flipBtnText} 
                    onClick={flipFunc} 
                    iosStyle={styles.iosFlipBtn}
                    androidStyle={styles.androidFlipBtn} />
                {this.renderButtons(btnTextFnColorList)}
            </View>
        )
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
    correctBtnText: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center',
    },
    iosCorrectBtn: {
        padding: 10,
        borderRadius: 7,
        height: 45,
        width: 200,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 10,
    },
    androidCorrectBtn: {
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
});


export default QuestionDisplay




