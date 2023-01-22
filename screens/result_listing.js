import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native';
import { Button, Text, Card, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import HOST from '../GLOBAL';
import axios from 'axios';

const ResultListing = ({ route, navigation }) => {


  const { userLatitude, userLongitude } = route.params;

  const [heart, setHeart] = useState(false);

  const [checked, setChecked] = useState('first');


  const refRBSheet = useRef();

  const {
    searchLocation,
    budgetValue,
    selectFirstDate,
    selectSecondDate,
    venueType,
    noOfPersons
  } = route.params;

  const [getData, setGetData] = useState();

  useEffect(() => {
    async function getallvenues() {
      const resp = await axios.get(`${HOST}venue/allVenues`);
      var data = resp.data.data
      if (typeof data === 'object') {
        var filteredData = [];
        data.forEach((venue) => {
          if (venue.address.includes(searchLocation)) {
            filteredData.push(venue);
          }
        })
        var budgetfiltered = [];
        filteredData.forEach((venue) => {
          var as = venue.availableSlots;
          as.forEach((slots) => {
            if (slots.charges <= budgetValue) {
              if (!budgetfiltered.includes(venue)) {
                budgetfiltered.push(venue);
              }
            }
          })
        })
        var typefiltered = [];
        budgetfiltered.forEach((venue) => {
          if (venue.type == venueType) {
            typefiltered.push(venue);
          }
        });
        setGetData(budgetfiltered);
      }
      // setGetData(resp.data.data);
    }
    getallvenues();
    // const filterVenues = (searchLocation, budgetValue) => {
    //   // console.log(getData)
    // }

    // filterVenues(searchLocation, budgetValue);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('listingDetails', {
        venue_id: item._id,
        userLatitude,
        userLongitude
      })}>
        <View style={{ marginBottom: 30 }}>
          <Card>
            <Card.Cover source={{ uri: item.images[0] }} />
            <Card.Title
              title={item.title}
              subtitle={item.address} />
          </Card>
          <Text style={{
            position: 'absolute',
            right: 10,
            bottom: 5,
            fontFamily: 'Poppins-Regular'
          }}>{`Rs ${item.availableSlots[0].charges}`}</Text>
          {/* <TouchableWithoutFeedback onPress={() => setHeart(!heart)}>
            {
              heart ?
                <Icon name='cards-heart' color='#FF0000'
                  size={25} style={{
                    position: 'absolute',
                    top: 20, right: 20
                  }} /> :
                <Icon name='cards-heart-outline' color={Colors.darkGrey}
                  size={25} style={{
                    position: 'absolute',
                    top: 20, right: 20
                  }} />
            }
          </TouchableWithoutFeedback> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 30, marginHorizontal: 20 }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: Colors.greyColor, paddingVertical: 15,
          justifyContent: 'space-between', borderRadius: 5,
          paddingHorizontal: 20
        }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon name='arrow-left' color={Colors.darkGrey}
              size={20} />
          </TouchableWithoutFeedback>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            textAlignVertical: 'center'
          }}>{`${searchLocation}`}</Text>
          <Text></Text>
        </View>
        <View style={{
          marginHorizontal: 10, marginTop: 5,
          flexDirection: 'row', justifyContent: 'space-between'
        }}>
          {/* <View style={{flexDirection: 'row',alignItems: 'center'}}>
                <Button
                mode='text'
                icon={props => <Icon name='sort' {...props} color={Colors.primaryColor}
                size={18}/>}
                onPress={() => {refRBSheet.current.open()}}
                >Sort</Button>
                <View style={{flex: 1}}>
                   <RBSheet
                     ref={refRBSheet} 
                     closeOnDragDown = {true}
                     closeOnPressMask = {false}
                     openDuration= {250}
                     height = {150}
                     customStyles = {{
                       container: {
                        //  justifyContent: 'center',
                        //  alignItems: 'center'
                       }
                     }}
                   >
                     <RadioButton.Group>
                       <RadioButton.Item value='Low to High'
                       label='Low to High' color={Colors.primaryColor}
                       status = {checked === 'first' ? 'checked' : 'unchecked'}
                       onPress = {() => {
                        setChecked('first')
                       }}
                       />
                       <RadioButton.Item value='High to Low'
                       label='High to Low' color={Colors.primaryColor}
                       status = {checked === 'second' ? 'checked' : 'unchecked'}
                       onPress = {() => {
                        setChecked('second')
                       }}
                       />
                     </RadioButton.Group>
                   </RBSheet>
                </View>
              </View> */}
          {/* <View style={{flexDirection: 'row',alignItems: 'center'}}>
                  <Button
                  mode='text'
                  icon={props => <Icon name='filter-outline' {...props} color={Colors.primaryColor}
                  size={18}/>}
                  onPress={() => navigation.navigate('filterScreen')}
                  >Filters</Button>
              </View> */}
        </View>
        <View style={{ marginTop: 40, marginBottom: 20 }}>
          <FlatList
            style={{ marginBottom: 160 }}
            data={getData}
            key={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  }
});
export default ResultListing;