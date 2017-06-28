import React, { Component } from 'react';
import{
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableHighlight,
} from 'react-native';
import {Tile, List, ListItem, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {changingColor} from '../config/myAnimations';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import RNFS from 'react-native-fs';

Touch = Animatable.createAnimatableComponent(TouchableHighlight);

export default class museuDetails extends Component{

	render(){
		const {navigate} = this.props.navigation;
		const {monumento}  = this.props.navigation.state.params;

		console.log('Details: ', monumento);

		return (
			<View style={styles.container}>
						<Swiper
							showsButtons={false}
							paginationStyle={styles.paginationStyle}
							activeDot={<View style={styles.activeDot}/>}
							dot={<View style={styles.dot}/>}
							buttonWrapperStyle={styles.buttonWrapperStyle}
							nextButton={<Text style={styles.buttonText}>›</Text>}
							prevButton={<Text style={styles.buttonText}>‹</Text>}
						>
							{monumento.pois.map((poi, index) => (

								<View key={index} style={{flex:1, marginBottom: 60}}>
									<ScrollView>
										<Tile
											imageSrc = {{uri:`file://${RNFS.DocumentDirectoryPath}/poi_`+ poi.id + `.jpg`}}
											contentContainerStyle = {{marginBottom: -30}}
										/>

										<View style={styles.map}>
											<Icon
											  raised
											  reverse
											  name='location-on'
											  color='#075e54'
											  size={36}
											  onPress={() => navigate('Mapa', {monumento: monumento})} />
										</View>

										<View style={styles.titleContainer}>
											<Text style={styles.titleText}>{poi.name}</Text>
										</View>

										<View style={styles.bodyContent}>
											<Text style={styles.bodyText}>{poi.description}</Text>
										</View>

									</ScrollView>
								</View>

							))}

						</Swiper>

				</View>
		);
	}
}

Animatable.initializeRegistryWithDefinitions({
  changingColor: changingColor
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},

	paginationStyle:{
		alignItems: 'flex-start',
		justifyContent: 'center',
		top: 10,
		height:50,
	},

	buttonWrapperStyle:{
		alignItems: 'flex-start',
		paddingVertical: 0,
	},

	buttonText:{
		fontSize:50,
		color:'#075e54',
	},

	activeDot:{
		backgroundColor: '#075e54',
		width: 10,
		height: 10,
		borderRadius: 5,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3,
	},

	dot:{
		// backgroundColor:'rgba(0,0,0,.2)',
		width: 10,
		height: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor:'#075e54',
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3,
	},

	map:{
		alignItems:'flex-end',
		justifyContent:'center',
		marginTop:-55,
		marginBottom:-25,
		padding:5,
	},

	titleContainer:{
		margin:10,
		marginRight:60,
		marginBottom:0,
		marginTop:-10
	},

	title:{
		flex:6,
		justifyContent:'center',
	},

	titleText: {
		color: '#075e54',
		fontSize: 20,
		textAlign: 'left',
	},

	bodyContent:{
		borderTopWidth:0.25,
		borderTopColor:'grey',
		margin:10,
		paddingTop:10,
	},


	bodyText:{
		fontFamily: 'normal',
		fontSize: 16,
		color: 'black'
	}
})
