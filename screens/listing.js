import React, { useState, useEffect } from 'react';
import {
  View, Image, TouchableWithoutFeedback,
  ScrollView, FlatList, Modal
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import bgImage from '../assets/images/bgimage.jpg';
import img1 from '../assets/images/1.jpg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

const Listing = ({ Details }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [heart, setHeart] = useState(false);

    const services = [
        {
          id: 1,
          name: 'Wifi'
        },
        {
          id: 2,
          name: 'Food'
        },
        {
          id: 3,
          name: 'DJ'
        },
        {
          id: 4,
          name: 'Parking'
        },
        {
          id: 5,
          name: 'Security'
        },
      ];

      console.log(Details)

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Image source={Details.images[0]} resizeMode='cover'
                        style={{ width: '100%', height: 400, borderRadius: 10 }} />
                    <View style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        backgroundColor: Colors.lightGrey,
                        padding: 10,
                        borderRadius: 50,
                    }}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <Icon name='arrow-left' color={Colors.darkGrey} size={30} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        backgroundColor: Colors.lightGrey,
                        padding: 10,
                        borderRadius: 50,
                    }}>
                        <TouchableWithoutFeedback onPress={() => setHeart(!heart)}>
                            {
                                heart ?
                                    <Icon name='cards-heart' color={'#ff0000'} size={30} /> :
                                    <Icon name='cards-heart-outline' color={Colors.darkGrey} size={30} />
                            }
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 30,
                        left: 20
                    }}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 18,
                            color: Colors.whiteColor
                        }}>{Details.title}</Text>
                        <Text style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: 14,
                            paddingTop: 5,
                            color: Colors.whiteColor
                        }}>{`Rs ${Details.availableSlots[0].charges}`}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <View style={{
                        backgroundColor: Colors.whiteColor,
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        flexDirection: 'row'
                    }}>
                        <Icon name='clock-time-eight-outline' color={Colors.darkGrey} size={30} />
                        <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                            <Text style={{
                                fontFamily: 'Poppins-Bold',
                                fontSize: 16
                            }}>743 KM</Text>
                            <Text style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: 16
                            }}>Distance</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 18,
                            paddingBottom: 20
                        }}>Images</Text>
                        <View style={{ marginHorizontal: -10 }}>
                            <FlatList
                                data={Details.images}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => {
                                            setModalVisible(true);
                                        }}>
                                            <Image source={{ uri: item }} resizeMode='cover'
                                                style={{
                                                    width: 140, height: 140, marginLeft: 10,
                                                    borderRadius: 10
                                                }}
                                            />
                                        </TouchableWithoutFeedback>
                                    );
                                }}
                                horizontal
                                keyExtractor={item => item}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Modal
                                visible={modalVisible}
                                transparent={true}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <ImageViewer imageUrls={Details.images}
                                />
                            </Modal>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 16
                        }}>What this place offers</Text>
                        <View style={{ marginTop: 20 }}>
                            <FlatList
                                horizontal
                                data={services}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            borderWidth: 2,
                                            borderColor: Colors.darkGrey,
                                            borderRadius: 10,
                                            padding: 20,
                                            marginLeft: 10
                                        }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontFamily: 'Poppins-Regular'
                                            }}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                key={item => item.id}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{
                                fontFamily: 'Poppins-Medium',
                                fontSize: 18,
                                paddingBottom: 10
                            }}>Discription</Text>
                            <Text style={{
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'justify'
                            }}>
                                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                            </Text>
                        </View>
                        {/* <View style={{marginTop: 20}}>
                 <Button 
                 mode='contained'
                 contentStyle= {{height: 55}}
                 onPress = {() => {
                   navigation.navigate('conversationScreen');
                 }}
                 >
                   <Text style={{
                     color: Colors.whiteColor,
                     fontFamily: 'Poppins-Regular'
                   }}>Message Now</Text>
                 </Button>
             </View> */}
                        <View style={{ marginTop: 15, marginBottom: 20 }}>
                            <Button
                                mode='contained'
                                contentStyle={{ height: 55 }}
                                onPress={() => {
                                    navigation.navigate('bookingSlot', {
                                        VenueId: Details._id
                                    });
                                }}
                            >
                                <Text style={{
                                    color: Colors.whiteColor,
                                    fontFamily: 'Poppins-Regular'
                                }}>Book Now</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Listing;