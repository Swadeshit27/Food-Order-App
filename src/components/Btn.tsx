import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { decrement, increment } from '../redux/slices/Cont';

const Btn = () => {
    const dispatch = useAppDispatch();
    const { value } = useAppSelector(state => state.food.Count)
    console.log(value);

    return (
        <View>
            <TouchableOpacity style={{ backgroundColor: "red", height: 40, marginBottom: 20 }}
                onPress={() => dispatch(decrement())}>
                <Text>
                    dec
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "green", height: 40, marginBottom: 20 }}
                onPress={() => dispatch(increment())}>
                <Text>
                    inc
                </Text>
            </TouchableOpacity>
            <Text style={{ color: "violet" }}>{value}</Text>
        </View>
    )
}

export default Btn

const styles = StyleSheet.create({})