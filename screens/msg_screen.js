import React from 'react';
import { View, StyleSheet, Image, ScrollView,
TouchableWithoutFeedback } from 'react-native';
import { Text, Appbar, Divider,Badge } from 'react-native-paper';
import 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import 'react-native-gesture-handler';

const MsgScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: Colors.whiteColor }}>
        <Appbar.BackAction onPress={() => {
          navigation.goBack();
        }} />
        <Appbar.Content title='Messages' />
      </Appbar.Header>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => {
          navigation.navigate('conversationScreen');
        }}>
        <View style={{
          marginTop: 30, marginBottom: 20 }}>
         <View style={{flexDirection: 'row',alignItems: 'center',
        justifyContent: 'space-evenly'}}>
         <Image
            source={{ uri: 'https://picsum.photos/600' }}
            style={{ width: 60, height: 60, borderRadius: 60 }}
            resizeMode='cover'
          />
          <View>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>Great Marquee</Text>
            <Text style={{
              fontSize: 13,
            }}>Great Marquee</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Badge>3</Badge>
            <Text style={{
              paddingLeft: 20,
            }}>9:30 AM</Text>
          </View>
         </View>
        </View>
        </TouchableWithoutFeedback>
        <Divider />
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30
  }
});
export default MsgScreen;