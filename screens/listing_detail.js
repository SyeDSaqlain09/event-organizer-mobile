import React, { useState, useEffect } from 'react';
import {
  View, Image, TouchableWithoutFeedback,
  ScrollView, FlatList, Modal
} from 'react-native';
import { Button, Text, DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import 'react-native-gesture-handler';
import { ImageGallery } from '@georstat/react-native-image-gallery';
import HOST from '../GLOBAL';
import axios from 'axios';
import haversine from 'haversine-distance';

Icon.loadFont();


const ListingDetails = ({ route, navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [heart, setHeart] = useState(false);

  const { userLatitude, userLongitude } = route.params;

  const [Details, setDetails] = useState({});
  const [image, setImages] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [distance, setDistance] = useState('');


  const { venue_id } = route.params;
  useEffect(() => {
    getVenueById(venue_id);
    async function getVenueById(id) {
      const resp = await axios.post(`${HOST}venue/getVenueById`, {
        id: id
      });
      const detail = resp.data.data;
      const location = JSON.parse(detail.location);
      setImages(detail.images);
      setAvailableSlots(detail.availableSlots);
      setServices(detail.services);

      var newImages = [];

      detail.images.forEach((element, index) => {
        var img = {
          id: index,
          url: element
        }
        newImages.push(img);
      });
      setNewImages(newImages);
      setDetails(resp.data.data);

      const m = {
        latitude: userLatitude,
        longitude: userLongitude
      }
      const v = {
        latitude: location.lat,
        longitude: location.lng
      };
      const distanceFromMyLocation = haversine(m, v);
      const dInKms = distanceFromMyLocation / 1000;
      setDistance(dInKms.toFixed(2));
    }
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Image source={{ uri: image ? image[0] : "" }} resizeMode='cover'
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
            {/* <View style={{
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
            </View> */}
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
              {/* <Text style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                paddingTop: 5,
                color: Colors.whiteColor
              }}>{`Rs ${availableSlots[0].charges}`}</Text> */}
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
                }}>{`${distance} KM`}</Text>
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
                  data={image}
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
                  <ImageGallery
                    images={newImages}
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
                        }}>{item.title}</Text>
                      </View>
                    );
                  }}
                  key={item => item.id}
                />
              </View>
              {/* <View style={{ marginTop: 20 }}>
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
              </View> */}
              <View style={{ marginTop: 20}}>
                <Text style={{
                  fontSize: 18,
                }}>
                  Pricing Plan
                </Text>
                <View>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>From</DataTable.Title>
                      <DataTable.Title>To</DataTable.Title>
                      <DataTable.Title>Charges</DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                    data={availableSlots}
                    keyExtractor = {item => item.id}
                      renderItem={(item) => {
                        return (
                          <DataTable.Row>
                            <DataTable.Cell>{item.item.timing.from}</DataTable.Cell>
                            <DataTable.Cell>{item.item.timing.to}</DataTable.Cell>
                            <DataTable.Cell>{item.item.charges}</DataTable.Cell>
                          </DataTable.Row>
                        );
                      }}
                    />
                  </DataTable>
                </View>
              </View>
              <View style={{
                marginTop: 20, flexDirection: 'row',
                justifyContent: 'space-between', marginBottom: 10
              }}>
                <Button
                  mode='contained'
                  contentStyle={{ height: 55 }}
                  style={{ width: '49%', backgroundColor: Colors.greyColor }}
                  onPress={() => {
                    navigation.navigate('conversationScreen');
                  }}
                >
                  <Text style={{
                    color: Colors.whiteColor,
                    fontFamily: 'Poppins-Regular'
                  }}>Message Now</Text>
                </Button>
                <Button
                  mode='contained'
                  style={{ width: '49%' }}
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
    </>
  );
}

export default ListingDetails;