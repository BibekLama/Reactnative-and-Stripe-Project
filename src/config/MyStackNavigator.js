import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import {Easing,Animated} from 'react-native'

//Screens
import RegisterScreen from '../screens/RegisterScreen'
import MainScreen from '../screens/MainScreen'
import AccountsScreen from '../screens/AccountsScreen'


const AppStackMain =  createStackNavigator({
  Register:{
      screen: RegisterScreen,
      navigationOptions: {
          header: () => null,
      }
  },
  Main:{
      screen: MainScreen,
      navigationOptions: {
          header: () => null,
      }
  },
  Accounts:{
      screen: AccountsScreen,
      navigationOptions: {
          header: () => null,
      }
  },
  
},
{
  // headerMode: 'none',
  // mode: 'modal',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  }),
});

export default class MyStackNavigator extends Component {
  render() {
    return (
      <AppStackMain />
    );
  }
}