import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Homepage from '../screens/Homepage';
import Monumentos from '../screens/Monumento';
import MonumentoDetails from '../screens/MonumentoDetails';
import Mapa from '../screens/Mapa';
import { StackNavigator} from 'react-navigation';


export const Stack = StackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: {
      header: null
    },
  },
  Monumento: {
    screen: Monumentos,
    navigationOptions: {
      header: null
    },
  },
  MonumentoDetails: {
    screen: MonumentoDetails,
    navigationOptions: {

      title:'Voltar atrás',

      headerStyle:{
        height:40,
        backgroundColor:'#075e54',
      },

      headerTitleStyle:{
        fontSize: 14,
        fontWeight: 'normal',
        color:'white',
      },

      headerTintColor:'#fff',
    },
  },
  Mapa: {
    screen: Mapa,
    navigationOptions: {

      title:'Voltar atrás',

      headerStyle:{
        height:40,
        backgroundColor:'#075e54',
      },

      headerTitleStyle:{
        fontSize: 14,
        fontWeight: 'normal',
      },

      headerTintColor:'#fff',
      
    },
  }
});



export default Stack