
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './BottomTab'
import AuthPage from './AuthPage'
import { useAppSelector } from '../redux/store'
import axios from 'axios'

const MainRouting = () => {
    const { token } = useAppSelector(state => state.food.User);
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    return (
        <NavigationContainer >
            {
                token ?
                    <BottomTab />
                    :
                    <AuthPage />
            }
        </NavigationContainer>
    )
}

export default MainRouting 