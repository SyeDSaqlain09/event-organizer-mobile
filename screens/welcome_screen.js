import React from 'react';
import {View,StyleSheet,StatusBar
  ,Image} from 'react-native';
import logo from '../assets/images/logo.png';
import Colors from '../utils/colors';
import {Button,Text} from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
    return (
    <>
    <StatusBar barStyle="light-content"/>
    <View style={styles.container}>
        <View>
        <Text style={styles.heading}>welcome to eo</Text>
        </View>
        <View>
          <Image source={logo} style={styles.logoManage}/>
        </View>
        <View>
          <View>
            <Button mode="contained" color={Colors.greyColor} 
            contentStyle={{height: 55}} type="submit"
            onPress={() => navigation.navigate('loginScreen')}>
              <Text style={{color: Colors.whiteColor,
              fontFamily: 'Poppins-Regular'
              }}>Sign In</Text>
            </Button>
          </View>
          <View style={{width: 300,marginTop: 20}}>
          <Button mode="contained" style={Colors.whiteColor} contentStyle={{height: 55}} 
            onPress={() => navigation.navigate('signupScreen')}>
              <Text style={{color: Colors.whiteColor,
              fontFamily: 'Poppins-Regular'
              }}>Sign Up</Text>
            </Button>
          </View>
        </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 30,
    marginBottom: 80
  },
  heading:{
    paddingTop: 50,
    fontFamily: 'Poppins-Medium',
    color: Colors.blackColor,
    fontSize: 20
  },
  logoManage: {
    width: 200,
    height: '100%',
    resizeMode: 'center',
  },
});

export default WelcomeScreen;