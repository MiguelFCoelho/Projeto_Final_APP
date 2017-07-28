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
import SingularMap from '../screens/SingularMap';
import MultiMap from '../screens/MultiMap';
import {Icon} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';


export const Stack = StackNavigator({
  Homepage: {
    screen: Homepage,
    navigationOptions: {
      header: null
    },
  },
  Monumento: {
    screen: Monumentos,
    navigationOptions:{
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
  MonumentoDetails:{
    screen: MonumentoDetails,
    navigationOptions:{

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
  SingularMap:{
    screen: SingularMap,
    navigationOptions:{

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
  },
  MultiMap:{
    screen: MultiMap,
    // navigationOptions: ({ navigation }) => ({
    navigationOptions:{

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

      // headerRight:(
      //   <Icon
      //     name='home'
      //     color='white'
      //     size={36}
      //     onPress={() => navigation.navigate('Homepage')} />
      // )

    },
  }
});



export default Stack
