import React, { useState, useEffect } from 'react';
import {
  View, Dimensions, StyleSheet, TouchableWithoutFeedback,
  Image
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import axios from 'axios';
import HOST from '../GLOBAL';
import AsyncStorage from '@react-native-async-storage/async-storage';

Icon.loadFont();

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const ProfileScreen = ({route, navigation }) => {

  const [token, setToken] = useState({});
  const {value} = route.params;

  const [profileImage,setProfileImage] = useState();

  useEffect(() => {
    async function getUserById() {
      const resp = await axios.post(`${HOST}user/getUserById`, {
        id: value
      });
      setToken(resp.data.data);
      setProfileImage(`${HOST}uploads/user-profiles/${resp.data.data.profilePicture}`)
    }
    getUserById();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        height: height / 2,
        backgroundColor: Colors.primaryColor,
        width: width,
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 18,
          textAlign: 'center',
          paddingVertical: 30,
          color: Colors.whiteColor,
          letterSpacing: 2
        }}>Profile</Text>
        <View style={{ marginTop: 20 }}>
          <Surface style={styles.surface}>
            <TouchableWithoutFeedback onPress={() => {
              navigation.navigate('editProfile',{
                value:value
              });
            }}>
              <Icon
                name='account-edit-outline'
                color={Colors.darkGrey}
                size={25}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20
                }}
              />
            </TouchableWithoutFeedback>
            <Image
              source={{ uri: profileImage}}
              style={{ width: 80, height: 80, borderRadius: 60 }}
              resizeMode="cover"
            />
            <Text style={{
              fontFamily: 'Poppins-Medium',
              paddingTop: 10
            }}>{token.name}</Text>
            <Text style={{
              fontFamily: 'Poppins-Regular',
            }}>{token.email}</Text>
          </Surface>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          marginTop: 50, marginBottom: 30
        }}>
          <Icon
            name='home-outline'
            color={Colors.darkGrey}
            size={30}
          />
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('homeScreen');
          }}>
            <Text style={{
              fontFamily: 'Poppins-Regular',
              paddingLeft: 15,
              fontSize: 18
            }}>Home Screen</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* <View style={{
          flexDirection: 'row', alignItems: 'center',
          marginBottom: 30
        }}>
          <Icon
            name='book-open-page-variant-outline'
            color={Colors.darkGrey}
            size={30}
          />
          <TouchableWithoutFeedback onPress={() => {
          }}>
            <Text style={{
              fontFamily: 'Poppins-Regular',
              paddingLeft: 15,
              fontSize: 18
            }}>  Booking History</Text>
          </TouchableWithoutFeedback>
        </View> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name='logout'
            color={Colors.darkGrey}
            size={30}
          />
          <TouchableWithoutFeedback onPress={() => {
             const removeStorage = async () => {
              try{
              await AsyncStorage.removeItem('event-organizer-user');
              navigation.navigate('loginScreen');
              }catch(err){
                  console.log(err);
              }
          }
          removeStorage();
          }}>
            <Text style={{
              fontFamily: 'Poppins-Regular',
              paddingLeft: 15,
              fontSize: 18
            }}>Logout</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    width: width / 1.19999,
    height: height / 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 5,
  },
});
export default ProfileScreen;