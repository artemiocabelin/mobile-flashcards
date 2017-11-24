import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.loadingStyle}>Loading...</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingStyle: {
        fontSize: 18,
        textAlign: 'center',
    }
});


export default Loading