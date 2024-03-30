import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Person from "../assets/avater.png"
import { colors } from '../utils/Constants'
import Material from "react-native-vector-icons/MaterialIcons"
import { useAppDispatch, useAppSelector } from '../redux/store'
import { logoutUser, profileUpdate } from '../redux/slices/userSlice'
import { Formik } from 'formik'
import axios from 'axios'
import Snackbar from 'react-native-snackbar'
import Loading from '../components/Loading'

const Profile = () => {
  const { user } = useAppSelector(state => state.food.User);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileDetail, setProfileDetails] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
    gender: user?.gender,
    bio: user?.bio
  });
  const updateProfile = async (values: ProfileData) => {
    try {
      setLoading(true);
      const { data } = await axios.post('https://food-delivery-app-backend-7q06.onrender.com/auth/profile', values);
      console.log(data);
      dispatch(profileUpdate(data.user));
      Snackbar.show({
        text: data.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.green_1,
        textColor: colors.white,
      });
    } catch (error) {
      console.log(error);

      let errorData = "internal error";
      // @ts-ignore
      errorData = error?.response?.data?.message;
      Snackbar.show({
        text: errorData,
        backgroundColor: colors.red_1,
        textColor: colors.white,
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {
        loading ? <Loading /> :
          <ScrollView
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: 'white',
              marginVertical: 10,
              padding: 20,
            }}>

            <View>
              <Image
                source={Person}
                style={{ width: 150, height: 150, marginHorizontal: '30%' }}
              />
            </View>
            <Formik
              initialValues={profileDetail}
              onSubmit={(values: ProfileData) => updateProfile(values)}>
              {({
                handleChange,
                handleSubmit,
                handleReset,
                touched,
                values,
                isValid,
                errors,
              }) => (
                <View style={{ marginVertical: 15 }}>
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.subtitle}>Full Name</Text>
                    <TextInput
                      value={values.name}
                      style={styles.inputStyle}
                      onChangeText={handleChange('name')}
                      editable={isEdit}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.subtitle}>Email Address</Text>
                    <TextInput
                      value={values.email}
                      style={styles.inputStyle}
                      editable={false}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.subtitle}>Mobile No</Text>
                    <TextInput
                      value={values.mobile}
                      style={styles.inputStyle}
                      onChangeText={handleChange('mobile')}
                      editable={isEdit}
                      keyboardType='numeric'
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.subtitle}>Gender</Text>
                    <TextInput
                      value={values.gender}
                      style={styles.inputStyle}
                      onChangeText={handleChange('gender')}
                      editable={isEdit}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.subtitle}>Bio</Text>
                    <TextInput
                      value={values.bio}
                      style={styles.inputStyle}
                      onChangeText={handleChange('bio')}
                      editable={isEdit}
                    />
                  </View>
                  {!isEdit ? <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => setIsEdit(!isEdit)}>
                    <Text style={styles.text2}>
                      Edit Profile
                    </Text>
                  </TouchableOpacity> :
                    <TouchableOpacity
                      style={styles.btnContainer}
                      onPress={() => (handleSubmit(), setIsEdit(!isEdit))}>
                      <Text style={styles.text2}>
                        Update Profile
                      </Text>
                    </TouchableOpacity>}
                  <TouchableOpacity
                    style={styles.logOutBtn}
                    onPress={() => dispatch(logoutUser())}>
                    <Material name="logout" color={colors.red_1} size={20} />
                    <Text
                      style={{
                        color: colors.red_1,
                        fontSize: 18,
                        fontWeight: '500',
                        marginStart: 8,
                      }}>
                      Log out
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
      }
    </>
  );
}

export default Profile

const styles = StyleSheet.create({
  subtitle: {
    color: colors.subtitle,
  },
  inputStyle: {
    color: colors.title,
    fontSize: 16,
    fontWeight: "600",
    borderBottomColor: colors.inputBg,
    borderBottomWidth: 1,
    paddingVertical: 6
  },
  btnContainer: {
    marginTop: 12,
    width: '100%',
    backgroundColor: colors.red_1,
    borderRadius: 6,
    marginBottom: 20,
  },
  text2: {
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 18,
  },
  logOutBtn: {
    width: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "38%"
  }
})