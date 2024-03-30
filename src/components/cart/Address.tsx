import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Constants'
import { Formik } from 'formik'
import * as Yup from "yup"
import { useAppDispatch } from '../../redux/store'
import { AddAddress } from '../../redux/slices/OrderSlice'
import { cartProps } from './CartCard'

const Address = ({ navigation }: { navigation: cartProps }) => { 
    const dispatch = useAppDispatch();
    const handelSave = (values: AddressType) => {
        dispatch(AddAddress(values));
        navigation.navigate('Payment')
    }
    const validate = Yup.object({
        name: Yup.string().required("Full Name is Required"),
        mobile: Yup.string().required("Mobile no is Required").min(10, "Invalid Mobile Number").max(10, "Invalid Mobile Number"),
        pin: Yup.string().required("Pin no is Required").min(6, "Invalid Pin Number").max(6, "Invalid Pin Number"),
        state: Yup.string().required("State is Required"),
        city: Yup.string().required("City is Required"),
        location: Yup.string().required("Location is Required"),
    })
    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Add Delivery Address</Text>
                <Formik
                    initialValues={{
                        name: '',
                        mobile: '',
                        pin: '',
                        state: '',
                        city: '',
                        location: '',
                    }}
                    onSubmit={values => handelSave(values)}
                    validationSchema={validate}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        handleReset,
                        touched,
                        values,
                        isValid,
                        errors,
                    }) => (
                        <View>
                            <View style={{ marginBottom: 12, }}>
                                <TextInput
                                    placeholder='Full Name*'
                                    style={styles.inputStyle}
                                    placeholderTextColor={colors.para}
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                />
                                {touched.name && errors.name && (
                                    <Text style={styles.error}>
                                        {errors.name}
                                    </Text>
                                )}
                            </View>
                            <View style={{ marginBottom: 12, }}>
                                <TextInput
                                    placeholder='Mobile No*'
                                    style={styles.inputStyle}
                                    placeholderTextColor={colors.para}
                                    onChangeText={handleChange('mobile')}
                                    value={values.mobile}
                                />
                                {touched.mobile && errors.mobile && (
                                    <Text style={styles.error}>
                                        {errors.mobile}
                                    </Text>
                                )}
                            </View>
                            <View style={{ marginBottom: 12, }}>
                                <TextInput
                                    placeholder='Pin no*'
                                    style={styles.inputStyle}
                                    placeholderTextColor={colors.para}
                                    onChangeText={handleChange('pin')}
                                    value={values.pin}
                                />
                                {touched.pin && errors.pin && (
                                    <Text style={styles.error}>
                                        {errors.pin}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.flexProp}>
                                <View style={{ marginBottom: 12, }}>
                                    <TextInput
                                        placeholder='City*'
                                        style={[styles.inputStyle, { width: "50%", minWidth: 160 }]}
                                        placeholderTextColor={colors.para}
                                        onChangeText={handleChange('city')}
                                        value={values.city}
                                    />
                                    {touched.city && errors.city && (
                                        <Text style={styles.error}>
                                            {errors.city}
                                        </Text>
                                    )}
                                </View>
                                <View style={{ marginBottom: 12, }}>
                                    <TextInput
                                        placeholder='State*'
                                        style={[styles.inputStyle, { width: "50%", minWidth: 160 }]}
                                        placeholderTextColor={colors.para}
                                        onChangeText={handleChange('state')}
                                        value={values.state}
                                    />
                                    {touched.state && errors.state && (
                                        <Text style={styles.error}>
                                            {errors.state}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <View style={{ marginBottom: 12, }}>
                                <TextInput
                                    placeholder='Landmark or full address*'
                                    style={[styles.inputStyle]}
                                    placeholderTextColor={colors.para}
                                    onChangeText={handleChange('location')}
                                    value={values.location}
                                />
                                {touched.location && errors.location && (
                                    <Text style={styles.error}>
                                        {errors.location}
                                    </Text>
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.btnContainer}
                                onPress={() => handleSubmit()}>
                                <Text style={styles.text2}>Save and Continue</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </>
    )
}

export default Address

const styles = StyleSheet.create({
    flexProp: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 15,
    },
    title: {
        color: colors.title,
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 20,
        marginTop: 10,
        textAlign: "center",
    },
    inputStyle: {
        width: "100%",
        borderColor: colors.inputBg,
        borderWidth: 1,
        borderRadius: 6,
        color: colors.title,
        paddingHorizontal: 12,
    },
    error: {
        fontSize: 12, color: 'red', marginVertical: 5
    },
    btnContainer: {
        marginTop: 12,
        width: '100%',
        backgroundColor: colors.red_1,
        borderRadius: 6,
    },
    text2: {
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 12,
        fontSize: 18,
    },
})