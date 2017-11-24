import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const ErrorMsg = ({ error }) => {
    return error ? ( <Text style={styles.errorText}>{error}</Text> ) : null
}

const styles = StyleSheet.create({
    errorText: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'red',
        marginBottom: 10,
    }
});


export default ErrorMsg