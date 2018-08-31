import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SocialStack from './src/social/index';
import PhotoStack from './src/photo/index';
import TourStack from './src/tour/index';
import MerchStack from './src/merch/index';
import MusicStack from './src/music/index';

export default createBottomTabNavigator(
  {
    Social: SocialStack, 
    Music: MusicStack,
    Photo: PhotoStack,
    Tour : TourStack,
    Merch: MerchStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
      if (routeName === 'Social') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else

			if (routeName === 'Photo') {
          iconName = `ios-photos${focused ? '' : '-outline'}`;
        }else if(routeName === 'Music'){
          iconName = `ios-musical-notes${focused ? '' : '-outline'}`;
        }
       else if (routeName === 'Tour') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Merch') {
          iconName = `ios-cart${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);