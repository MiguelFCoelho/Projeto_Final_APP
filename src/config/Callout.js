import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

export default class Callout extends Component {
  render (){
    const {navigate} = this.props.navigation;
    const monumento = this.props.dados;

    return (

      <View style={styles.container}>

        <TouchableHighlight
          onPress={() => navigate('MonumentoDetails', {monumento})}
          style={[styles.bubble, {backgroundColor:this.props.cor}]}
        >
          <View>
              <Text style={styles.name}>{monumento.name}</Text>
          </View>
        </TouchableHighlight>

        <View style={[styles.arrow, {borderTopColor:this.props.cor}]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },

  //Callout bubble
  bubble:{
    borderRadius: 6,
    padding: 10,
  },

  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 16,
    alignSelf: 'center',
  },

  // Character name
  name: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
})
