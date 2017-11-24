import _ from 'lodash'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import * as colors from '../../utils/colors'
import Button from './component_button'

class FinishDisplay extends Component {

    renderTexts = (textList) => {
        return _.map(textList, (text) => {
            return (
                <Text key={text} style={styles.quizStatusStyle}>{text}</Text>
            )
        })
    }

    renderButtons = (btnTextFnList,) => {
        return _.map(btnTextFnList, (textFn) => {
            return (
                <Button 
                    key={textFn[0]} 
                    text={textFn[0]} 
                    textBtnStyle={styles.finishBtnText} 
                    onClick={textFn[1]} 
                    iosStyle={styles.iosFinishBtn}
                    androidStyle={styles.androidFinishBtn} />
            )
        })
        
    }
    
    render() {
        const { btnTextFnList, textList } = this.props
        return (
            <View style={styles.container}>
                {this.renderTexts(textList)}
                {this.renderButtons(btnTextFnList)}
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
    finishBtnText: {
        color: colors.purple,
        fontSize: 18,
        textAlign: 'center',
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
        backgroundColor: colors.gray,
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
});


export default FinishDisplay




