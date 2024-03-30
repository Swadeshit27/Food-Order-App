import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/Constants'

const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.red_1} />
        </View>
    )
}

export default Loading 