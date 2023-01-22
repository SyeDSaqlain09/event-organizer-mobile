import React,{useEffect} from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import {
  Provider as PaperProvider, DefaultTheme, configureFonts
} from 'react-native-paper';
import Colors from './utils/colors';
import App from './App';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import WelcomeScreen from './screens/welcome_screen';
import LoginScreen from './screens/login_screen';
import SignUpScreen from './screens/signup_screen';
import ForgetPassword from './screens/forget_password';
import NotificationScreen from './screens/notification_screen';
import SearchVenues from './screens/search_venues';
import ProfileScreen from './screens/profile_screen';
import ResultListing from './screens/result_listing';
import ListingDetails from './screens/listing_detail';
import FilterScreen from './screens/filter_screen';
import EditProfile from './screens/edit_profile';
import HomeScreen from './screens/home_screen';
import FavouriteScreen from './screens/favourite_screen';
import MsgScreen from './screens/msg_screen';
import ConversationScreen from './screens/conversation_screen';
import BookingSlot from './screens/booking_slot';
import ConfirmCode from './screens/confirm_code';
import UpdatePassword from './screens/update_password';

const fontConfig = {
  android: {
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: '500'
    },
    Bold: {
      fontFamily: 'Poppins-Bold',
      fontWeight: '800'
    },
    Black: {
      fontFamily: 'Poppins-Black',
      fontWeight: '900'
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryColor,
  },
  fonts: configureFonts(fontConfig),
};


const Main = () => {

  useEffect(() => {
    SplashScreen.hide();
  },[]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='app' component={App}
            options={{ headerShown: false }} />
          <Stack.Screen name='loginScreen' component={LoginScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='homeScreen' component={HomeScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='signupScreen' component={SignUpScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='welcomeScreen' component={WelcomeScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='forgetPassword' component={ForgetPassword}
            options={{ headerShown: false }} />
          <Stack.Screen name='notificationScreen' component={NotificationScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='profileScreen' component={ProfileScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='searchVenues' component={SearchVenues}
            options={{ headerShown: false }} />
          <Stack.Screen name='filterScreen' component={FilterScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='resultListing' component={ResultListing}
            options={{ headerShown: false }} />
          <Stack.Screen name='listingDetails' component={ListingDetails}
            options={{ headerShown: false }} />
          <Stack.Screen name='editProfile' component={EditProfile}
            options={{ headerShown: false }} />
          <Stack.Screen name='favScreen' component={FavouriteScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='msgScreen' component={MsgScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='conversationScreen' component={ConversationScreen}
            options={{ headerShown: false }} />
          <Stack.Screen name='bookingSlot' component={BookingSlot}
            options={{ headerShown: false, animation: 'slide_from_bottom' }} />
             <Stack.Screen name='confirmCode' component={ConfirmCode}
            options={{ headerShown: false, animation: 'slide_from_right' }} />
             <Stack.Screen name='updatedPassword' component={UpdatePassword}
            options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
const Stack = createNativeStackNavigator();
AppRegistry.registerComponent(appName, () => Main);
