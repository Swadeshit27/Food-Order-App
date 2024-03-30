import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../utils/Constants';
import Material from "react-native-vector-icons/MaterialIcons"
import { useAppDispatch } from '../../redux/store';
import { ResetAll } from '../../redux/slices/OrderSlice';
import { cartProps } from './CartCard';

const PaymentSuccess = ({ navigation }: { navigation: cartProps }) => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(ResetAll());
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: "center", justifyContent: "center" }}>
            <View style={styles.ImgContainer}>
                <View style={styles.SubImgContainer}>
                    <Material name='check-circle' color={colors.green_1} size={80} />
                </View>
            </View>
            <View style={styles.commonBox}>
                <Text style={styles.header}>Payment Successful</Text>
                <Text style={styles.para}> Your payment has been Successful </Text>
                <Text style={styles.para}>
                    Details of the transaction are included below
                </Text>
            </View>
            {/* <View style={styles.transactionContainer}>
                    <Text
                        style={[
                            styles.header,
                            {
                                fontSize: 18,
                                color: colors.title,
                                marginBottom: 0,
                                marginEnd: 6,
                            },
                        ]}>
                        Transaction Id:
                    </Text>
                    <Text style={{ color: colors.para, fontSize: 16 }}>123456</Text>
                </View>
                <View style={styles.commonBox2}>
                    <Text style={styles.subheader}>Total amount Paid</Text>
                    <Text style={[styles.para, { fontSize: 16 }]}>₹500</Text>
                </View>
                <View style={styles.commonBox2}>
                    <Text style={styles.subheader}>Paid By</Text>
                    <Text style={[styles.para, { fontSize: 16 }]}>Paytm UPI</Text>
                </View>
                <View style={styles.commonBox2}>
                    <Text style={styles.subheader}>Transaction Date</Text>
                    <Text style={[styles.para, { fontSize: 16 }]}>12 mar 2024, 5.30pm</Text>
                </View> */}
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CartItem')} >
                <Text style={{ fontSize: 18, fontWeight: '500', color: colors.white }}>
                    Order More
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
    ImgContainer: {
        width: "100%",
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SubImgContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#c5fac9",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonBox: {
        marginVertical: 15,
        paddingBottom: 15,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
    },
    transactionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        marginVertical: 12,
    },
    header: {
        color: colors.green_1,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8,
    },
    commonBox2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
        marginVertical: 6,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
    },
    subheader: {
        color: colors.subtitle,
        fontSize: 18,
        fontWeight: '500',
    },
    para: {
        color: colors.para,
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 5,
    },
    btn: {
        width: '60%',
        marginHorizontal: "20%",
        marginVertical: 20,
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.red_1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
