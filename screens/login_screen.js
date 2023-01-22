import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableWithoutFeedback, Alert
} from 'react-native';
import Colors from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HOST from '../GLOBAL';


Icon.loadFont();

const LoginScreen = ({ navigation }) => {

  const [hiddenPass, setPasswordRender] = useState(false);
  const [eyeButton, setEyeButton] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const loginUser = async () => {
    const requestBody = {
      email: email,
      password: password,
    };
    const response =
      await axios.post(`${HOST}user/loginUser`, requestBody);
    if (response.status == 200) {
      const setStorage = async () => {
        try {
          await AsyncStorage.setItem('event-organizer-user', response.data.data._id);
        } catch (err) {
          console.log(err);
        }
      }
      setStorage();
      const getStorage = async () => {
        try{
        const value =  await AsyncStorage.getItem('event-organizer-user');
        navigation.navigate('homeScreen',{
          value: value
        });
        }catch(err){
          console.log(err);
        }
      }
      getStorage();
    }
    else {
      Alert.alert(
        'Event Organizer Auth',
        'Wrong Credentials',
      );
    }
  }

  const passwordRendering = () => {
    setPasswordRender(!hiddenPass);
    setEyeButton(!eyeButton);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back, Guy!</Text>
      <Text style={styles.signInText}>Sign in to your account</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={{
          fontFamily: 'Poppins-Medium',
          color: Colors.darkGrey
        }}>Email</Text>
        <View>
          <TextInput
            mode='outlined'
            placeholder='Enter your email'
            keyboardType='email-address'
            onChangeText={email => setEmail(email)}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{
          fontFamily: 'Poppins-Medium',
          color: Colors.darkGrey
        }}>Password</Text>
        <View>
          <TextInput
            mode='outlined'
            secureTextEntry={hiddenPass}
            placeholder='Enter your password'
            onChangeText={userpassword => setPassword(userpassword)}
            right={
              eyeButton ?
                <TextInput.Icon name='eye-outline' onPress={passwordRendering} /> :
                <TextInput.Icon name='eye-off-outline' onPress={passwordRendering}
                  color={Colors.lightGrey}
                />
            }
          />
        </View>
      </View>
      <View style={{
        marginTop: 15
      }}>
        <TouchableWithoutFeedback onPress={() => { navigation.navigate('forgetPassword') }}>
          <Text style={{
            textAlign: 'right',
            color: Colors.primaryColor
          }}>Forget your password ?</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ marginTop: 30 }}>
        <Button
          mode='contained'
          contentStyle={{ height: 55 }}
          onPress={() => { loginUser() }}
        >
          <Text style={{
            color: Colors.whiteColor,
            fontFamily: 'Poppins-Regular'
          }}>Sign In</Text>
        </Button>
      </View>
      <View style={{
        justifyContent: 'center', flexDirection: 'row',
        marginTop: 40
      }}>
        <Text style={{
          color: Colors.darkGrey,
          fontFamily: 'Poppins-Regular'
        }}>Don't have an account? </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('signupScreen')}>
          <Text style={{
            color: Colors.primaryColor,
            fontFamily: 'Poppins-Regular'
          }}>Sign Up</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    textTransform: 'capitalize',
    color: Colors.blackColor,
    paddingTop: 50,
    fontSize: 20,
  },
  signInText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.darkGrey,
    paddingTop: 5,
    fontSize: 14,
    fontWeight: '400',
  }
});
export default LoginScreen;