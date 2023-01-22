import React, { useState } from 'react';
import {
  View, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback,
  Alert
} from 'react-native';
import Colors from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import HOST from '../GLOBAL';


Icon.loadFont();

const SignUpScreen = ({ navigation }) => {

  const [hiddenPass, setPasswordRender] = useState(false);
  const [eyeButton, setEyeButton] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const registerUser = async () => {
    const requestBody = {
      name: name,
      email: email,
      password: password,
      contact: phone
    };
    const response =
      await axios.post(`${HOST}user/userRegister`, requestBody);
    if (response.status == 200) {
      navigation.navigate('loginScreen');
    }
    else if (response.status == 203) {
      Alert.alert(
        'Event Organizer Auth',
        'User already exist'
      );
    }
    else {
      Alert.alert(
        'Event Organizer Auth',
        'User not registered'
      );
    }
  }


  const passwordRendering = () => {
    setPasswordRender(!hiddenPass);
    setEyeButton(!eyeButton);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.signupText}>Create an account</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{
          color: Colors.darkGrey,
          fontFamily: 'Poppins-Regular'
        }}>Already have an account? </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('loginScreen')}>
          <Text style={styles.signInText}>Login</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{
          fontFamily: 'Poppins-Medium',
          color: Colors.darkGrey
        }}>Name</Text>
        <View>
          <TextInput
            mode='outlined'
            placeholder='Enter your name'
            onChangeText={name => setName(name)}
          />
        </View>
      </View>
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

      <View style={{ marginTop: 20 }}>
        <KeyboardAvoidingView behavior='padding'>
          <Text style={{
            fontFamily: 'Poppins-Medium',
            color: Colors.darkGrey
          }}>Phone</Text>
          <TextInput
            mode='outlined'
            placeholder='Enter your phone'
            keyboardType='phone-pad'
            onChangeText={userPhone => setPhone(userPhone)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={{ marginTop: 30 }}>
        <Button
          mode='contained'
          contentStyle={{ height: 55 }}
          onPress={() => {
            registerUser();
          }}
        >
          <Text style={{
            color: Colors.whiteColor,
            fontFamily: 'Poppins-Regular'
          }}>Sign Up</Text>
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },
  signupText: {
    color: Colors.blackColor,
    paddingTop: 50,
    fontSize: 20,
    fontFamily: 'Poppins-Bold'
  },
  signInText: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  }
});
export default SignUpScreen;