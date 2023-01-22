import React,{useState} from 'react';
import { View,TouchableWithoutFeedback,StyleSheet,Alert} from 'react-native';
import {Text,Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../utils/colors';
import { request } from 'react-native-permissions';
import GeoLocation from 'react-native-geolocation-service';

Icon.loadFont();
Entypo.loadFont();

const NotificationScreen = ({ navigation }) => {

    const [userLocation, setUserLocation] = useState({});

    const getLocPermission = async () => {
        var response = await request('android.permission.ACCESS_FINE_LOCATION');
        if (response == "granted") {
            await GeoLocation.getCurrentPosition(
                ({ coords }) => {
                    setUserLocation(coords);
                },
                (error) => {
                    Alert.alert(error.message);
                },
                {
                    enableHighAccuracy: true, timeout: 15000,
                    maximumAge: 10000
                }
            );
            setTimeout(() => {
                navigation.navigate('homeScreen',{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude
                });
            },1000);
        }
    }

  return (

    <View style={{marginVertical: 20,marginHorizontal: 20}}>
        <TouchableWithoutFeedback 
        onPress={() => navigation.navigate('homeScreen')}>
        <Icon name='times' color={Colors.darkGrey} size={30}/>
        </TouchableWithoutFeedback>
    <View style={{flex: 1,marginHorizontal: 20,alignItems: 'center',
    marginTop: 100}}>
      <View style={styles.locIcon}>
            <Entypo name='location-pin' color={Colors.whiteColor} size={40}/>
      </View>
    </View>
    <View style={{marginTop: 180,alignItems: 'center'}}>
        <Text style={{fontFamily: 'Poppins-Medium',
        fontSize: 22
    }}>Enable Location</Text>
    <Text style={{
        fontFamily: 'Poppins-Regular',textAlign: 'center',
        fontSize: 14,paddingBottom: 30
    }}>Choose your location to start find the {'\n'}
        request around you
    </Text>
    <Button
    mode='contained'
    style= {{width: '90%'}}
    contentStyle= {{height: 55}}
    onPress={getLocPermission}
    >
        <Text style={{
            fontFamily: 'Poppins-Regular',
            color: Colors.whiteColor,
            textAlignVertical: 'center'
        }}>Allow Access</Text>
    </Button>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('homeScreen')}>
    <Text style={{
            paddingTop: 30,
            fontFamily: 'Poppins-Medium',
            color: Colors.primaryColor
        }}>Skip for now</Text>
    </TouchableWithoutFeedback>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    locIcon: {
        width: 150,
        height: 150,
        backgroundColor: Colors.primaryColor,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default NotificationScreen;