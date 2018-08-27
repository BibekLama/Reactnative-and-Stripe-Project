import React, {Component} from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import {Provider} from 'react-redux'
import store from './src/config/store'

import MyStackNavigator from './src/config/MyStackNavigator';

export default class App extends Component{

  render() {
    return (
      <Provider store={store}>
        <MyStackNavigator/>
      </Provider>
    )
  }
}

