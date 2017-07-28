import React, {Component} from 'react';
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Pressable container
  View,               // Container component
  TouchableHighlight,
} from 'react-native';

import MapView from 'react-native-maps';
import Callout from '../config/Callout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Mapa extends Component {

  render(){
    const { navigate } = this.props.navigation;
		const { data }  = this.props.navigation.state.params;

		return (
			<View style={styles.container}>

				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 39.604419,
				    longitude: -8.411803,
				    latitudeDelta: 0.0122,
				    longitudeDelta: 0.0221,
					}}
				>
          {data.map(i => {
            if (i.category === "Castelos"){
              return i.monuments.map((j, index) => (
      					<MapView.Marker
      						coordinate={{
      							latitude: j.latitude,
      	            longitude: j.longitude,
      						}}

      						pinColor='#009688'
      						key={index}
      					>
                  <MapView.Callout tooltip style={styles.callout} onPress={() => navigate('MonumentoDetails', {monumento:j})}>
                    <View style={styles.calloutContainer}>
                      <View style={[styles.bubble, {backgroundColor:'#009688'}]}>
                          <Text style={styles.name}>{j.name}</Text>
                      </View>
                      <View style={[styles.arrow, {borderTopColor:'#009688'}]} />
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              ))
            } else if (i.category === "Museus") {
               return i.monuments.map((j, index) => (
                 <MapView.Marker
                   coordinate={{
                     latitude: j.latitude,
                     longitude: j.longitude,
                   }}
                   //calloutOffset={{x:-8, y:28}}
                   pinColor='#f44336'
                   key={index}
                 >
                   <MapView.Callout tooltip style={styles.callout} onPress={() => navigate('MonumentoDetails', {monumento:j})}>
                     <View style={styles.calloutContainer}>
                         <View style={[styles.bubble, {backgroundColor:'#f44336'}]}>
                             <Text style={styles.name}>{j.name}</Text>
                         </View>
                       <View style={[styles.arrow, {borderTopColor:'#f44336'}]} />
                     </View>
                   </MapView.Callout>
                 </MapView.Marker>
               ))
              } else if (i.category === "Igrejas") {
               return i.monuments.map((j, index) => (
                 <MapView.Marker
                   coordinate={{
                     latitude: j.latitude,
                     longitude: j.longitude,
                   }}
                   //calloutOffset={{x:-8, y:28}}
                   pinColor='#f39c12'
                   key={index}
                 >
                   <MapView.Callout tooltip style={styles.callout} onPress={() => navigate('MonumentoDetails', {monumento:j})}>
                     <View style={styles.calloutContainer}>
                       <View style={[styles.bubble, {backgroundColor:'#f39c12'}]}>
                           <Text style={styles.name}>{j.name}</Text>
                       </View>
                       <View style={[styles.arrow, {borderTopColor:'#f39c12'}]} />
                     </View>
                   </MapView.Callout>
                 </MapView.Marker>
               ))
              } else {
               return i.monuments.map((j, index) => (
                 <MapView.Marker
                   coordinate={{
                     latitude: j.latitude,
                     longitude: j.longitude,
                   }}
                   //calloutOffset={{x:-8, y:28}}
                   pinColor='#8e44ad'
                   key={index}
                 >
                   <MapView.Callout tooltip style={styles.callout} onPress={() => navigate('MonumentoDetails', {monumento:j})}>
                     <View style={styles.calloutContainer}>
                       <View style={[styles.bubble, {backgroundColor:'#8e44ad'}]}>
                           <Text style={styles.name}>{j.name}</Text>
                       </View>
                       <View style={[styles.arrow, {borderTopColor:'#8e44ad'}]} />
                     </View>
                   </MapView.Callout>
                 </MapView.Marker>
               ))
              }
          })}
				</MapView>

        {/* ------------------- Legenda ----------------------*/}
        <View style={styles.buttonContainer}>
  				<View style={[styles.button, {backgroundColor:'#009688'}]}>
  					<Text style={styles.textColor}>Convento</Text>
  				</View>

          <View style={[styles.button, {backgroundColor:'#f44336'}]}>
  					<Text style={styles.textColor}>Museus</Text>
  				</View>

          <View style={[styles.button, {backgroundColor:'#f39c12'}]}>
  					<Text style={styles.textColor}>Igrejas</Text>
  				</View>

          <View style={[styles.button, {backgroundColor:'#8e44ad'}]}>
  					<Text style={styles.textColor}>Outros Locais</Text>
  				</View>
  			</View>


			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex: 1,
    justifyContent: 'flex-end',
	},

	map:{
		...StyleSheet.absoluteFillObject,
	},

  buttonContainer:{
    flexDirection: 'row',
    justifyContent:'space-around',
		marginVertical: 5,
	},
	button:{
		alignItems: 'center',
		borderRadius: 20,
		padding: 12,
	},
  textColor:{
    color:'white',
  },

  calloutContainer: {
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
