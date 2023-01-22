import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    StyleSheet, View, Alert, Image, TouchableWithoutFeedback,
    DrawerLayoutAndroid
} from 'react-native';
import { Drawer, Text, List } from 'react-native-paper';
import { request } from 'react-native-permissions';
import GeoLocation from 'react-native-geolocation-service';
import Colors from '../utils/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HOST from '../GLOBAL';
import haversine from 'haversine-distance';



MaterialIcon.loadFont();

const HomeScreen = ({ route, navigation }) => {

    const LatLngPoints = [
        {
            id: 1,
            latitude: 31.5751,
            longitude: 74.3805,
        },
        {
            id: 2,
            latitude: 31.5843,
            longitude: 74.3828,
        },
        {
            id: 3,
            latitude: 31.5720,
            longitude: 74.4042,
        },
    ]

    const mapRef = useRef();
    const drawer = useRef(null);


    const [token, setToken] = useState({});

    const { value } = route.params;

    const [profileImage, setProfleImage] = useState();


    const [allVenues, setAllVenues] = useState([]);

    useEffect(() => {
        async function getUserById() {
            const resp = await axios.post(`${HOST}user/getUserById`, {
                id: value
            });
            setToken(resp.data.data);
            setProfleImage(`${HOST}uploads/user-profiles/${resp.data.data.profilePicture}`)
        }
        getUserById();
        getAllVenues();
        async function getAllVenues() {
            const resp = await axios.get(`${HOST}venue/allVenues`);
            var data = resp.data.data;
            var arrangedVenues = [];
            data.forEach((venue) => {
                var venueLocation = JSON.parse(venue.location);
                var myLocation = {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude
                };
                var distance = haversine(myLocation, venueLocation);
                var dInKms = distance / 1000;
                if (dInKms.toFixed(2) <= 20) {
                    arrangedVenues.push(venue);
                }
            });
            var filteredList = [];
            arrangedVenues.forEach((venue) => {
                var vl = JSON.parse(venue.location);
                var location = {
                    latitude: parseFloat(vl.lat),
                    longitude: parseFloat(vl.lng)
                }
                filteredList.push(location);
            });
            setAllVenues(filteredList);
        }
    }, []);
    const navigationView = () => (
        <View style={[styles.drawerContainer, styles.navigationContainer]}>
            <Drawer.Section>
                <View style={{ margin: 20 }}>
                    <Image
                        source={{ uri: profileImage }}
                        style={{ width: 80, height: 80, borderRadius: 80 }}
                    />
                </View>
                <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                    <Text style={{
                        fontFamily: 'Poppins-Bold',
                        fontSize: 16,
                    }}>{token.name}</Text>
                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 14,
                    }}>{token.email}</Text>
                </View>
            </Drawer.Section>
            <List.Item
                title='Profile'
                left={props => <List.Icon {...props} icon='account-outline' />}
                onPress={() => {
                    navigation.navigate('profileScreen', {
                        value: value
                    });
                }}
            />
            {/* <List.Item
                title='Messages'
                left={props => <List.Icon {...props} icon='android-messages' />}
                onPress={() => {
                    navigation.navigate('msgScreen');
                }}
            /> */}
            {/* <List.Item
                title='Favourite Items'
                left={props => <List.Icon {...props} icon='heart-outline' />}
                onPress={() => {
                    navigation.navigate('favScreen');
                }}
            /> */}
            {/* <List.Item
                title='Booking History'
                left={props => <List.Icon {...props} icon='book-open-page-variant-outline' />}
            /> */}
            <List.Item
                title='Logout'
                left={props => <List.Icon {...props} icon='logout' />}
                onPress={() => {
                    const removeStorage = async () => {
                        try {
                            await AsyncStorage.removeItem('event-organizer-user');
                            navigation.navigate('loginScreen');
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    removeStorage();
                }}
            />
        </View>
    );



    const getLocPermission = async () => {
        await GeoLocation.getCurrentPosition(
            ({ coords }) => {
                return coords;
            },
            (error) => {
                Alert.alert(error.message);
            },
            {
                enableHighAccuracy: true, timeout: 15000,
                maximumAge: 10000
            }
        );
    }

    const locData = getLocPermission();

    const [userLocation, setUserLocation] = useState({
        latitude: locData.latitude,
        longitude: locData.longitude
    });

    useEffect(() => {
        requestLocationPermission();
    }, []);



    const requestLocationPermission = async () => {
        var response = await request('android.permission.ACCESS_FINE_LOCATION');
        if (response == "granted") {
            GeoLocation.getCurrentPosition(
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
        }
    }

    return (
        <View style={styles.container}>
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition={'left'}
                renderNavigationView={navigationView}
            >
                <MapView
                    ref={(map) => { mapRef.current = map }}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    mapType="standard"
                    mapPadding={{ right: 5 }}
                    initialRegion={{
                        latitude: 31.3739,
                        longitude: 74.3675,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    maxZoomLevel={18}
                    showsUserLocation
                    showsMyLocationButton={false}
                    followsUserLocation={true}
                    showsCompass={false}
                    onMapLoaded={
                        () => {
                            mapRef.current.animateCamera({
                                center: {
                                    latitude: userLocation.latitude,
                                    longitude: userLocation.longitude,
                                },
                                heading: 20,
                                pitch: 0, 
                                zoom: 18
                            });
                        }
                    }
                >
                    {
                        allVenues.map((marker,index) => (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                    }}
                                    // pinColor={Colors.primaryColor}
                                    image={require('../assets/images/pin_marker.png')}
                                />
                        ))
                    }

                </MapView>
                <TouchableWithoutFeedback onPress={() => {
                    drawer.current.openDrawer();
                }}>
                    <View style={styles.sideBarButton}>
                        <MaterialIcon name='menu' color={Colors.blackColor}
                            size={30} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('profileScreen', {
                    value: value
                })}>
                    <View style={styles.profileImage}>
                        <Image source={{ uri: profileImage }}
                            resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 50 }} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    mapRef.current.animateCamera({
                        center: {
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        },
                        heading: 20,
                        pitch: 0,
                        zoom: 14
                    });
                }}>
                    <View style={styles.locationButton}>
                        <MaterialIcon name='crosshairs-gps' color={Colors.blackColor}
                            size={30} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() =>
                    navigation.navigate('searchVenues', {
                        userLatitude: userLocation.latitude,
                        userLongitude: userLocation.longitude
                    })}>
                    <View style={styles.searchBar}>
                        <MaterialIcon
                            name='search-web'
                            color={Colors.blackColor}
                            size={20}
                        />
                        <Text style={{
                            color: Colors.darkGrey,
                            fontSize: 14,
                            paddingHorizontal: 10
                        }}>Search your venues</Text>
                    </View>
                </TouchableWithoutFeedback>
            </DrawerLayoutAndroid>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%'
    },
    sideBarButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        top: 20,
        left: 20,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.7,
        shadowOffset: { width: -2, height: 4 },
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        top: 20,
        right: 20,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.7,
        shadowOffset: { width: -2, height: 4 },
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        bottom: 130,
        right: 20,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.7,
        shadowOffset: { width: -2, height: 4 },
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBar: {
        width: '90%',
        height: 55,
        borderRadius: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        bottom: 60,
        shadowColor: Colors.blackColor,
        shadowOpacity: 0.7,
        shadowOffset: { width: -2, height: 4 },
        alignItems: 'center',
        flexDirection: 'row'
    },
    drawerContainer: {
        flex: 1,
    },
    navigationContainer: {
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center",
        color: '#000'
    }
})

export default HomeScreen;