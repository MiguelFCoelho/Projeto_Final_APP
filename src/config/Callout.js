import React, { Component } from 'react';
import {
  Image,              
  StyleSheet,         
  Text,               
  View,               
} from 'react-native';

export default class Callout extends Component {
  render (){
    const {name} = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.bubble, {backgroundColor:this.props.cor}]}>
            <Text style={styles.name}>{name}</Text>
        </View>  
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