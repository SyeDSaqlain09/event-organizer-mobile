import axios from 'axios';
import React from 'react';
import { View,StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { Text,TextInput,Button } from 'react-native-paper';
import Colors from '../utils/colors';
import HOST from '../GLOBAL';

const ForgetPassword = ({ navigation }) => {

  const [email,setEmail] = React.useState('');


  const sendConfirmationCode = async () => {
    const rand = Math.floor(Math.random() * 999999) + 100000;
    const res = await axios.post(`${HOST}user/sendConfirmationCode`,{
      email: email,
      cc: rand
    });
    if(res.status == 200){
      navigation.navigate('confirmCode',{
        email: email
      });
    }
    console.log(res);
  }

  return (
    <View style={styles.container}>
      <View style={styles.forgetMessages}>
       <Text style={{
           fontSize: 18,
           textTransform: 'capitalize',
           fontFamily: 'Poppins-Medium'
       }}>Forget Password</Text>
       <Text style={{
           fontSize: 12,
           paddingTop: 10,
           lineHeight: 18,
           fontFamily: 'Poppins-Regular'
       }}>
           Please enter your email address below to receive
           your password reset instructions.
       </Text>
      </View>
      <View style={{marginTop: 30}}>
      <Text style={{fontFamily: 'Poppins-Medium'}}>Email</Text>
      <View>
        <TextInput
        mode='outlined'
        placeholder='Enter your email'
        keyboardType='email-address'
        onChangeText={text=>setEmail(text)}
        />
      </View>
      </View>
      <View style={{marginTop: 30}}>
        <Button 
          mode='contained'
          contentStyle={{height: 55}}
          onPress = {() => sendConfirmationCode()}
        >
          <Text style={{color: Colors.whiteColor,
          fontFamily: 'Poppins-Regular'
          }}>Sent</Text>
        </Button>
      </View>
      <View style={{marginTop: 30}}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('loginScreen')}>
          <Text style={{textAlign: 'center',color: Colors.primaryColor,
            fontFamily: 'Poppins-Medium',fontSize: 16
            }}>Back to sign in</Text>
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
    forgetMessages: {
        marginTop: 50,
    }
});

export default ForgetPassword;