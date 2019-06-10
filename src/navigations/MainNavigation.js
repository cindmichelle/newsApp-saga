import * as React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import NewsListScreen from '../screens/NewsListScreen';
import NewsScreen from '../screens/NewsScreen';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    NewsList: {
      screen: NewsListScreen,
    },
    News: {
      screen: NewsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const RootStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//     },
//     MyModal: {
//       screen: ModalScreen,
//     },
//   },
//   {
//     //mode: 'modal',
//     headerMode: 'none',
//   },
// );

export default createAppContainer(MainStack);
