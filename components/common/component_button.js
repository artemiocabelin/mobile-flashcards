import React from 'react'
import { Platform, Text, View, TouchableOpacity } from 'react-native';

const Button = ({ text, textBtnStyle, onClick, iosStyle, androidStyle, backgroundColor }) => {
    const style = backgroundColor 
        ? [(Platform.OS === 'ios' ? iosStyle : androidStyle), { backgroundColor }] 
        : Platform.OS === 'ios' ? iosStyle : androidStyle
    return (
        <TouchableOpacity
            style={style}
            onPress={onClick}
        >
            <Text style={textBtnStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button
