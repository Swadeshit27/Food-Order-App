
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '../screen/Auth';
import OuterScreen from '../screen/OuterScreen';
const Stack = createNativeStackNavigator();

const AuthPage = () => {
    return (
        <>
            <Stack.Navigator initialRouteName='Outer' >
                <Stack.Screen name='Outer' component={OuterScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Auth' component={Auth} options={{ headerShown: false }} />
            </Stack.Navigator>
        </>
    )
}

export default AuthPage 