import React from 'react'
import { StyleSheet } from 'react-native';
import * as colors from '../../utils/colors'
import Button from './component_button'

const SubmitButton = ({onClick}) => {
    
    return (
        <Button 
            text={'Submit'} 
            textBtnStyle={styles.submitBtnText} 
            onClick={onClick} 
            iosStyle={styles.iosSubmitBtn}
            androidStyle={styles.androidSubmitBtn} />
    )
}

const styles = StyleSheet.create({
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
});

export default SubmitButton