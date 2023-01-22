import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({navigation}) => {

  useEffect(() => {
    async function getData(){
      try{
       var value =  await AsyncStorage.getItem('event-organizer-user');
       if(value !== null){
         navigation.navigate('homeScreen',{
           value: value
         });
       }else{
        navigation.navigate('loginScreen');
       }
      }catch(err){
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <>
     
    </>
  );
};
export default App;
