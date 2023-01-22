import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Menu, Button, Checkbox, DataTable } from 'react-native-paper';
import Colors from '../utils/colors';

const BookingSlot = ({ route }) => {

  const [BookingSlots, setBookingSlots] = useState(false);

  const openBookingMenu = () => setBookingSlots(true);
  const closeBookingMenu = () => setBookingSlots(false);

  const [Persons, setPersons] = useState(false);

  const openPersonsMenu = () => setPersons(true);
  const closePersonsMenu = () => setPersons(false);

  const [food,setFood] = useState(false);

  const [ServicesArray, setServicesArray] = useState([]);

  const [Data, setData] = useState({});

  console.log(Data.services);

  const { VenueId } = route.params;

  useEffect(() => {
    async function getBookingDetails(id) {
      const resp = await axios.post('https://events-apis.herokuapp.com/venue/getVenueById', {
        id: id
      });
      setData(resp.data.data);
    }
    getBookingDetails(VenueId);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 18
      }}>Book Venue</Text>
      <View style={{
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row', justifyContent: 'space-between'
      }}>
        <Menu
          visible={BookingSlots}
          onDismiss={closeBookingMenu}
          anchor={<Button onPress={openBookingMenu}
            color={Colors.blackColor}
          >Booking Slot</Button>}
        >
          <Menu.Item title='<50' />
          <Menu.Item title='>100' />
          <Menu.Item title='>150' />
          <Menu.Item title='>200' />
        </Menu>
        <Menu
          visible={Persons}
          onDismiss={closePersonsMenu}
          anchor={<Button onPress={openPersonsMenu}
            color={Colors.blackColor}
          >Persons</Button>}
        >
          <Menu.Item title={Data.persons} />
        </Menu>
      </View>
      <Text style={{
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
        fontWeight: 'bold'
      }}>Services Included</Text>
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <View>
        <DataTable>
                      <DataTable.Header>
                        <DataTable.Title>

                        </DataTable.Title>
                        <DataTable.Title>
                          Name
                        </DataTable.Title>
                        <DataTable.Title>
                          Charges
                        </DataTable.Title>
                        <DataTable.Title>
                          Frequency
                        </DataTable.Title>
                      </DataTable.Header>
          {
            Data.services.map((item, index) => {
              return (
                <>
                      <DataTable.Row key={index}>
                        <DataTable.Cell>
                          <Checkbox 
                           status={food ? 'checked' : 'unchecked'}
                           onPress={() => setFood(!food)}
                           color={Colors.primaryColor}
                          />
                        </DataTable.Cell>
                          <DataTable.Cell>
                            {item.title}
                          </DataTable.Cell>
                          <DataTable.Cell>
                            {item.charges}
                          </DataTable.Cell>
                          <DataTable.Cell>
                            {item.frequency}
                          </DataTable.Cell>
                      </DataTable.Row>
                </>
              )
            })
          }
          </DataTable>
        </View>
      </View>
    </View>
  );
}

export default BookingSlot;