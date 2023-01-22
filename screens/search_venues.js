import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Text, TextInput, Menu, Button, Modal,
  Portal,
  List
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import { Calendar } from 'react-native-calendars';


Icon.loadFont();

const SearchVenues = ({ route, navigation }) => {


  const { userLatitude, userLongitude } = route.params;

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [Datevisible, setDateVisible] = React.useState(false);

  const showDateModal = () => setDateVisible(true);
  const hideDateModal = () => setDateVisible(false);

  const [secondVisible, setSecondVisible] = useState(false);

  const openMenu_1 = () => setSecondVisible(true);
  const closeMenu_1 = () => setSecondVisible(false);

  const [Datevisible1, setDateVisible1] = React.useState(false);

  const showDateModal_1 = () => setDateVisible1(true);
  const hideDateModal_1 = () => setDateVisible1(false);

  const [visible1, setVisible1] = useState(false);

  const openMenu1 = () => setVisible1(true);
  const closeMenu1 = () => setVisible1(false);

  const [selectFirstDate, setFirstDate] = useState('');
  const [selectSecondDate, setSecondDate] = useState('');


  const [searchLocation, setSearchLocation] = useState('Lahore');
  const [budgetValue, setBudgetValue] = useState('');
  const [venueType, setVenueType] = useState(null);
  const [noOfPersons, setNoOfPersons] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.titleText}>Search your venues</Text>
      <View>
        <TextInput
          mode='outlined'
          defaultValue='Lahore'
          left={<TextInput.Icon name="source-commit-local" />}
          style={styles.marginLR}
          onChangeText={text => setSearchLocation(text)}
        />
        <TextInput
          mode='outlined'
          placeholder='Your budget'
          style={[styles.mar, styles.marginLR]}
          left={<TextInput.Icon name="cash" />}
          onChangeText={text => setBudgetValue(text)}
        />
      </View>
      {/* <View>
        <Text style={{
          marginHorizontal: 20,
          marginTop: 20,
          fontFamily: 'Poppins-Bold',
          fontSize: 16
        }}>Select Dates:</Text>
        <View style={{
          flexDirection: 'row'
          , marginHorizontal: 20,
          marginTop: 20,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View>
            <Text style={{
              fontFamily: 'Poppins-Regular'
            }}>From : {selectFirstDate}</Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={() => {
              showDateModal(true);
            }}>
              <Icon name='calendar' color={Colors.primaryColor}
                size={25} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{
          flexDirection: 'row'
          , marginHorizontal: 20,
          marginTop: 20,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View>
            <Text style={{
              fontFamily: 'Poppins-Regular'
            }}>To : {selectSecondDate}</Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={() => {
              showDateModal_1(true);
            }}>
              <Icon name='calendar' color={Colors.primaryColor}
                size={25} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Portal>
            <Modal visible={Datevisible}
              onDismiss={hideDateModal}
              contentContainerStyle={{
                backgroundColor: Colors.whiteColor,
                padding: 20,
                margin: 20,
                borderRadius: 5
              }}
            >
              <Calendar
                minDate={'2022-03-01'}
                onDayPress={(e) => {
                  setFirstDate(e.dateString);
                }}
              />
              <Button
                style={{ marginTop: 10 }}
                mode='outlined'
                onPress={hideDateModal}
              >
                <Text style={{
                  fontFamily: 'Poppins-Regular'
                }}>OK</Text>
              </Button>
            </Modal>
          </Portal>
        </View>
        <View style={{ flex: 1 }}>
          <Portal>
            <Modal visible={Datevisible1}
              onDismiss={hideDateModal_1}
              contentContainerStyle={{
                backgroundColor: Colors.whiteColor,
                padding: 20,
                margin: 20,
                borderRadius: 5
              }}
            >
              <Calendar
                minDate={'2022-03-01'}
                onDayPress={(e) => {
                  setSecondDate(e.dateString);
                }}
              />
              <Button
                style={{ marginTop: 10 }}
                mode='outlined'
                onPress={hideDateModal_1}
              >
                <Text style={{
                  fontFamily: 'Poppins-Regular'
                }}>OK</Text>
              </Button>
            </Modal>
          </Portal>
        </View>
      </View> */}
        <View style={{
          marginTop: 20,
          borderWidth: 1,
          borderColor: Colors.greyColor,
          padding: 7,
          marginHorizontal: 17,
          borderRadius: 5,
        }}>
          <Menu
          style={{width: '70%'}}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu} color={Colors.blackColor}>Venue Type</Button>}>
            <Menu.Item title='Banquet' onPress={() => setVenueType('banquet')} />
            <Menu.Item title='Farm House' onPress={() => setVenueType('farm-house')} />
          </Menu>
        </View>
      {/* <View style={{ marginTop: 20 ,
      borderWidth: 1,
      borderColor: Colors.greyColor,
      padding: 7,
      marginHorizontal: 17,
      borderRadius: 5,
      }}>
        <Menu
          visible={visible1}
          onDismiss={closeMenu1}
          anchor={<Button onPress={openMenu1}
            color={Colors.blackColor}
          >No Of Persons</Button>}
        >
          <Menu.Item title='<50' onPress={() => setNoOfPersons('<50')}/>
          <Menu.Item title='>100' onPress={() => setNoOfPersons('>100')} />
          <Menu.Item title='>150' onPress={() => setNoOfPersons('>150')} />
          <Menu.Item title='>200' onPress={() => setNoOfPersons('>200')} />
        </Menu>
      </View> */}
      <View style={{ marginTop: 20, marginHorizontal: 15 }}>
        <Button
          mode='contained'
          onPress={() => navigation.navigate('resultListing', {
            searchLocation,
            budgetValue,
            selectFirstDate,
            selectSecondDate,
            userLatitude,
            userLongitude,
            venueType,
            noOfPersons
          })}
          color={Colors.primaryColor}
          contentStyle={{ height: 55 }}
        >
          <Text style={{
            fontFamily: 'Poppins-Regular',
            color: Colors.whiteColor
          }}>Search</Text>
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    paddingVertical: 40
  },
  mar: {
    marginTop: 20
  },
  marginLR: {
    marginHorizontal: 15
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
  },
});

export default SearchVenues;