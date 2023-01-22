import axios from 'axios';
import React from 'react';
import { View,StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { Text,TextInput,Button } from 'react-native-paper';
import Colors from '../utils/colors';
import HOST from '../GLOBAL';

const ConfirmCode = ({route, navigation }) => {

  const [code,setCode] = React.useState('');

  const {email} = route.params;


  const confirmCode = async () => {
    const res = await axios.post(`${HOST}user/confirmCode`,{
      email: email,
      cc: code
    });
    if(res.status == 200){
        navigation.navigate('updatedPassword',{
          email:email
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
       }}>Verify Code</Text>
       <Text style={{
           fontSize: 12,
           paddingTop: 10,
           lineHeight: 18,
           fontFamily: 'Poppins-Regular'
       }}>
           Please check your email address.
       </Text>
      </View>
      <View style={{marginTop: 30}}>
      <Text style={{fontFamily: 'Poppins-Medium'}}>Confirmation Code</Text>
      <View>
        <TextInput
        mode='outlined'
        placeholder='Enter your code'
        keyboardType='phone-pad'
        onChangeText={text=>setCode(text)}
        />
      </View>
      </View>
      <View style={{marginTop: 30}}>
        <Button 
          mode='contained'
          contentStyle={{height: 55}}
          onPress = {() => confirmCode()}
        >
          <Text style={{color: Colors.whiteColor,
          fontFamily: 'Poppins-Regular'
          }}>Verify</Text>
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

export default ConfirmCode;