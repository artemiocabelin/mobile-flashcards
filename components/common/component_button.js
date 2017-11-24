import React from 'react'
import { Platform, Text, View, TouchableOpacity } from 'react-native';

const Button = ({ text, textBtnStyle, onClick, iosStyle, androidStyle }) => {
    
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? iosStyle : androidStyle}
            onPress={onClick}
        >
            <Text style={textBtnStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button
