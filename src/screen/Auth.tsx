import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../utils/Constants';
import Login from '../components/Login';
import Register from '../components/Register';
// import Bg_1 from "../assets/bg-1.avif"

const Auth = (): React.JSX.Element => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <View style={style.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={style.imgContainer}>
          <Image source={{ uri: 'https://img.freepik.com/free-photo/traditional-indian-soup-lentils-indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18717.jpg?w=900' }} style={{ width: "100%", height: "100%", zIndex: 0 }} />
          <View style={style.titleBox}>
            <Text style={{ fontSize: 52, fontFamily: "cursive", fontWeight: "900", color: colors.red_1, marginVertical: 20 }}>HungerHub</Text>
          </View>
        </View>
        <View style={style.subContainer}>
          <Pressable
            style={[style.btn, !isLogin && style.borderBottom]}
            onPress={() => setIsLogin(false)}>
            <Text style={style.btnText}>Log in</Text>
          </Pressable>
          <Pressable
            style={[style.btn, isLogin && style.borderBottom]}
            onPress={() => setIsLogin(true)}>
            <Text style={style.btnText}>Register</Text>
          </Pressable>
        </View>
        {
          !isLogin ? <Login /> : <Register />
        }
      </ScrollView>
    </View>
  );
};

export default Auth;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  imgContainer: {
    width: "100%",
    height: 300,
    position: "relative"
    // backgroundColor: "green"
  },
  titleBox: {
    backgroundColor: "#DAE0E28C",
    height: 300,
    zIndex: 10,
    width: "100%",
    position: "absolute",
    top: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  subContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 32,
  },
  btn: {
    width: '40%',
    padding: 4,
  },
  borderBottom: {
    borderBottomColor: colors.red_1,
    borderBottomWidth: 4,
  },
  btnText: {
    textAlign: 'center',
    color: colors.red_1,
    fontWeight: '700',
    fontSize: 32,
  },
});
