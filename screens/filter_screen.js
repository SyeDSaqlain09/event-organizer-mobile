import React, {useState} from 'react';
import { View,StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { Surface,Text,RadioButton, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import Colors from '../utils/colors';
 

Icon.loadFont();

const FilterScreen = ({ navigation }) => {

  const [value, setValue] = React.useState('first');

  return (
    <View style={{flex: 1}}>
      <Surface style={styles.surface}>
         <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
         <Icon name='cross' color={Colors.darkGrey} size={30}/>
         </TouchableWithoutFeedback>
         <Text style={{
           fontFamily: 'Poppins-Bold',
           fontSize: 16
         }}>Filters</Text>
         <TouchableWithoutFeedback onPress={() => {
           setValue(null);
         }}>
            <Text style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16
            }}>Reset</Text>
          </TouchableWithoutFeedback>
      </Surface>
      <View style={{marginTop: 20}}>
          <Text style={{
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
            fontSize: 18,
          }}>Your budget</Text>
          <View style={{
            marginTop: 20,
            marginHorizontal: 20
          }}>
          <RadioButton.Group
          onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={{flexDirection: 'row',alignItems: 'center',
          justifyContent: 'space-between'}}>
              <Text>PKR 0 - PKR 30000</Text>
              <RadioButton value="first" color={Colors.primaryColor}/>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',
          justifyContent: 'space-between',marginTop: 10}}>
              <Text>PKR 30000 - PKR 50000</Text>
              <RadioButton value="second" color={Colors.primaryColor}/>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',
          justifyContent: 'space-between',marginTop: 10}}>
              <Text>PKR 50000 - PKR 10000</Text>
              <RadioButton value="third" color={Colors.primaryColor}/>
            </View>
         </RadioButton.Group>
          </View>
      </View>
      <View style={{
        marginHorizontal: 20,
        position: 'absolute',
        bottom: 10,
        right: 0
      }}>
        <Button
        mode='contained'
        contentStyle= {{height: 55}}
        >
          <Text style={{
            color: Colors.whiteColor,
            fontFamily: 'Poppins-Regular'
          }}>Apply Changes</Text>
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  surface: {
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 4,
    paddingHorizontal: 10
  },
});
export default FilterScreen;