import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../utils/Constants';

const OuterScreen = ({ navigation }: { navigation: any }) => {
    const height = Dimensions.get('window').height;
    useEffect(() => {
        let interval = setInterval(() => {
            navigation.navigate('Auth');
        }, 2000);
        return () => clearInterval(interval);
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: "100%", height, position: "relative" }}>
                <Image src='https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg?t=st=1711827063~exp=1711830663~hmac=df36040f939e09a48425a517e87fbc02d4d710dd092ae8a11dc1fa03c3aeca47&w=360' style={{ width: "100%", height, objectFit: "cover" }} />
                <View style={[styles.container, { height }]}>
                    <Text style={{ fontSize: 24, fontWeight: "500", color: colors.title }}>Welcome to</Text>
                    <Text style={{ fontSize: 52, fontFamily: "cursive", fontWeight: "900", color: colors.red_1, marginVertical: 20 }}>HungerHub</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: colors.title }}>World most delicious food App</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OuterScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DAE0E2CC",
        zIndex: 10,
        width: "100%",
        position: "absolute",
        top: 0,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})