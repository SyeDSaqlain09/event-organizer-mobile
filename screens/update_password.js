import axios from 'axios';
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Colors from '../utils/colors';
import HOST from '../GLOBAL';

const UpdatePassword = ({ route, navigation }) => {

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');


  const { email } = route.params;

  const UpdateUserPassword = async () => {
    const res = await axios.post(`${HOST}user/updatePassword`, {
      email: email,
      password:password
    });
    if (res.status == 200) {
      navigation.navigate('loginScreen');
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
        }}>Update Password</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'Poppins-Medium' }}>Password</Text>
      </View>
      <View>
        <TextInput
          mode='outlined'
          placeholder='Enter your password'
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontFamily: 'Poppins-Medium' }}>Confirm Password</Text>
        <View>
          <TextInput
            mode='outlined'
            placeholder='Enter your password'
            onChangeText={text => setConfirmPassword(text)}
          />
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <Button
          mode='contained'
          contentStyle={{ height: 55 }}
          onPress={() => UpdateUserPassword()}
        >
          <Text style={{
            color: Colors.whiteColor,
            fontFamily: 'Poppins-Regular'
          }}>Change Password</Text>
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
  forgetMessages: {
    marginTop: 50,
  }
});

export default UpdatePassword;