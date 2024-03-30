
import { colors } from '../utils/Constants'
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import { loginUser } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/store';

const validate = Yup.object({
  email: Yup.string()
    .email('Provide a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain at least one uppercase,lowercase letter, number, special character and min 6 characters',
    ),
  name: Yup.string()
    .required('Full name is required')
});

interface userDetails {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [isPassView, setIsPassView] = useState(true);
  const dispatch = useAppDispatch();
  const handelRegister = async (values: userDetails) => {
    try {
      const { data } = await axios.post('https://food-delivery-app-backend-7q06.onrender.com/auth/register', values); 
      const { user, token, message } = data;
      dispatch(loginUser({ user, token }))
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.green_1,
        textColor: colors.white,
      });
    } catch (error: any) {
      let errorData = "internal error";
      errorData = error?.response?.data?.message;
      Snackbar.show({
        text: errorData,
        backgroundColor: colors.red_1,
        textColor: colors.white,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  return (
    <>
      <View style={style.formContainer}>
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          onSubmit={values => handelRegister(values)}
          validationSchema={validate}>
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
              <View style={style.inputBox}>
                <Text style={style.label}>Full Name</Text>
                <TextInput
                  placeholder="Full name"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  style={style.inputStyle}
                />
                {touched.name && errors.name && (
                  <Text style={{ fontSize: 12, color: 'red', marginVertical: 5 }}>
                    {errors.name}
                  </Text>
                )}
              </View>
              <View style={style.inputBox}>
                <Text style={style.label}>Email address</Text>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  style={style.inputStyle}
                />
                {touched.email && errors.email && (
                  <Text style={{ fontSize: 12, color: 'red', marginVertical: 5 }}>
                    {errors.email}
                  </Text>
                )}
              </View>
              <View style={style.inputBox}>
                <Text style={style.label}>Password</Text>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={isPassView}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  style={style.inputStyle}
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 12, color: 'red', marginVertical: 5 }}>
                    {errors.password}
                  </Text>
                )}
                <Pressable
                  style={style.eyeBtn}
                  onPress={() => setIsPassView(!isPassView)}>
                  {isPassView ? (
                    <Icon name={'eye'} size={20} color={colors.title} />
                  ) : (
                    <Icon name={'eye-slash'} size={20} color={colors.title} />
                  )}
                </Pressable>
              </View>
              <TouchableOpacity
                style={style.btnContainer}
                onPress={() => handleSubmit()}>
                <Text style={style.text2}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </>
  )
}

export default Register

const style = StyleSheet.create({

  formContainer: {
    width: '90%',
    // backgroundColor: "red",
    marginHorizontal: '5%',
    marginVertical: 40,
    paddingHorizontal: 0,
  },
  inputBox: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.title,
    marginBottom: 6,
  },
  inputStyle: {
    width: '100%',
    fontSize: 18,
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.title
  },
  eyeBtn: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
  btnContainer: {
    marginTop: 24,
    width: '80%',
    marginHorizontal: '10%',
    backgroundColor: colors.red_1,
    borderRadius: 15,
  },
  text2: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 18,
  },
})