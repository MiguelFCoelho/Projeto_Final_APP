import React, {Component} from 'react';
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Pressable container
  View                // Container component
} from 'react-native';

import MapView from 'react-native-maps';
import { capelas, igrejas, museus, locaisInteresse } from '../config/data';
import Callout from '../config/Callout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Mapa extends Component {

	render(){

		const { monumento }  = this.props.navigation.state.params;

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

					<MapView.Marker
						coordinate={{
							latitude: monumento.latitude,
	            longitude: monumento.longitude,
						}}
						//calloutOffset={{x:-8, y:28}}
						pinColor='#009688'
						key={this.props.monumento}
					/>

				</MapView>
			</View>
		);

	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
	},

	map:{
		...StyleSheet.absoluteFillObject,
	},
})



// {capelas.map((capela, index)=>
// 	<MapView.Marker
// 		coordinate={{
// 			latitude: capela.coordenadas[0],
//     		longitude: capela.coordenadas[1],
// 		}}
// 		calloutOffset={{x:-8, y:28}}
// 		pinColor='#009688'
// 		key={index}
// 	>
// 		<MapView.Callout tooltip style={styles.callout}>
// 			<Callout
// 				name={capela.title}
// 				cor='#009688'
// 			/>
// 		</MapView.Callout>
// 	</MapView.Marker>
// )}

// {igrejas.map((igreja, index)=>
// 	<MapView.Marker
// 		coordinate={{
// 			latitude: igreja.coordenadas[0],
//     		longitude: igreja.coordenadas[1],
// 		}}
// 		calloutOffset={{x:-8, y:28}}
// 		pinColor='#f44336'
// 		key={index}
// 	>
// 		<MapView.Callout tooltip style={styles.callout}>
// 			<Callout
// 				name={igreja.title}
// 				cor='#f44336'
// 			/>
// 		</MapView.Callout>
// 	</MapView.Marker>
// )}

// {museus.map((museu, index)=>
// 	<MapView.Marker
// 		coordinate={{
// 			latitude: museu.coordenadas[0],
//     		longitude: museu.coordenadas[1],
// 		}}
// 		calloutOffset={{x:-8, y:28}}
// 		pinColor='#f39c12'
// 		key={index}
// 	>
// 		<MapView.Callout tooltip style={styles.callout}>
// 			<Callout
// 				name={museu.title}
// 				cor='#f39c12'
// 			/>
// 		</MapView.Callout>
// 	</MapView.Marker>
// )}

// {locaisInteresse.map((local, index)=>
// 	<MapView.Marker
// 		coordinate={{
// 			latitude: local.coordenadas[0],
//     		longitude: local.coordenadas[1],
// 		}}
// 		calloutOffset={{x:-8, y:28}}
// 		pinColor='#8e44ad'
// 		key={index}
// 	>
// 		<MapView.Callout tooltip style={styles.callout}>
// 			<Callout
// 				name={local.title}
// 				cor='#8e44ad'
// 			/>
// 		</MapView.Callout>
// 	</MapView.Marker>
// )}
