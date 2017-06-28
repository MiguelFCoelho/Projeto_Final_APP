import React, { Component } from 'react';
import{
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableHighlight,
	Dimensions,
} from 'react-native';
import {Button, List, ListItem, Icon} from 'react-native-elements';
import {convento, museus, igrejas, locaisInteresse} from '../config/data';
import * as Animatable from 'react-native-animatable';
import { TabNavigator } from 'react-navigation';
import RNFS from 'react-native-fs';

Touch = Animatable.createAnimatableComponent(TouchableHighlight);

class Convento extends Component{

	render(){
		const {navigate} = this.props.navigation;
		const { data } = this.props.navigation.state.params;

		console.log('API:', data);
		return (
			<View style={styles.container}>
				<ScrollView>
					{data.map(i => {
						if (i.category === "Castelos"){
							return i.monuments.map((j, index) => (
								<TouchableHighlight
									onPress={() => navigate('MonumentoDetails', {monumento:j})}
									style={styles.monumentoContainer}
									key={index}
								>
									<Image style={styles.monumentoPic} source={{uri:`file://${RNFS.DocumentDirectoryPath}/monumento_`+ j.id + `.jpg`}}>
										<View style={styles.monumentoTitleContainer}>
											<Text style={styles.monumentoTitle}>{j.name}</Text>
										</View>
									</Image>
								</TouchableHighlight>
							))
						}
					})}
				</ScrollView>
			</View>
		);
	}

}

class Museus extends Component{

	render(){
		const {navigate} = this.props.navigation;
		const { data } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<ScrollView>
					{data.map(i => {
						if (i.category === "Museus"){
							return i.monuments.map((j, index) => (
								<TouchableHighlight
									onPress={() => navigate('MonumentoDetails', {monumento:j})}
									style={styles.monumentoContainer}
									key={index}
								>
									<Image style={styles.monumentoPic} source={{uri:`file://${RNFS.DocumentDirectoryPath}/monumento_`+ j.id + `.jpg`}}>
										<View style={styles.monumentoTitleContainer}>
											<Text style={styles.monumentoTitle}>{j.name}</Text>
										</View>
									</Image>
								</TouchableHighlight>
							))
						}
					})}
				</ScrollView>
			</View>
		);
	}

}

class Igrejas extends Component{

	render(){
		const {navigate} = this.props.navigation;
		const { data } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<ScrollView>
					{data.map(i => {
						if (i.category === "Igrejas"){
							return i.monuments.map((j, index) => (
								<TouchableHighlight
									onPress={() => navigate('MonumentoDetails', {monumento:j})}
									style={styles.monumentoContainer}
									key={index}
								>
									<Image style={styles.monumentoPic} source={{uri:`file://${RNFS.DocumentDirectoryPath}/monumento_`+ j.id + `.jpg`}}>
										<View style={styles.monumentoTitleContainer}>
											<Text style={styles.monumentoTitle}>{j.name}</Text>
										</View>
									</Image>
								</TouchableHighlight>
							))
						}
					})}
				</ScrollView>
			</View>

		);
	}

}

class OutrosLocais extends Component{

	render(){
		const {navigate} = this.props.navigation;
		const { data } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<ScrollView>
					{data.map(i => {
						if (i.category === "Locais de Interesse"){
							return i.monuments.map((j, index) => (
								<TouchableHighlight
									onPress={() => navigate('MonumentoDetails', {monumento:j})}
									style={styles.monumentoContainer}
									key={index}
								>
									<Image style={styles.monumentoPic} source={{uri:`file://${RNFS.DocumentDirectoryPath}/monumento_`+ j.id + `.jpg`}}>
										<View style={styles.monumentoTitleContainer}>
											<Text style={styles.monumentoTitle}>{j.name}</Text>
										</View>
									</Image>
								</TouchableHighlight>
							))
						}
					})}
				</ScrollView>
			</View>
		);
	}

}

export const Monumentos = TabNavigator({
  Convento: {
    screen: Convento,
    navigationOptions: {
		tabBarLabel: 'Convento de Cristo',
		tabBarIcon: ({tintColor}) => (
			<Image
		        source={require('../config/pictures/IconJanela.png')}
		        style={[styles.icon, {tintColor: tintColor}]}
      		/>
    	),
    },
  },
  Museus: {
    screen: Museus,
    navigationOptions: {
      tabBarLabel: 'Museus',
      tabBarIcon: ({tintColor}) => (
			<Image
		        source={require('../config/pictures/Museus.png')}
		        style={[styles.icon, {tintColor: tintColor}]}
      		/>
    	),
    },
  },
  Igrejas: {
    screen: Igrejas,
    navigationOptions: {
      tabBarLabel: 'Igrejas',
      tabBarIcon: ({tintColor}) => (
			<Image
		        source={require('../config/pictures/Igrejas.png')}
		        style={[styles.icon, {tintColor: tintColor}]}
      		/>
    	),
    },
  },
  OutrosLocais: {
    screen: OutrosLocais,
    navigationOptions: {
      tabBarLabel: 'Outros Locais',
      tabBarIcon: ({tintColor}) => (
			<Image
		        source={require('../config/pictures/mais.png')}
		        style={[styles.icon, {tintColor: tintColor}]}
      		/>
    	),
    },
  },
},
{
	animationEnabled:true,
	tabBarPosition: 'bottom',
	tabBarOptions:{
		indicatorStyle:{
			backgroundColor:'white'
		},
		tabStyle:{
			//height:(Dimensions.get('window').height/13),

		},
		style:{
			backgroundColor:'#075e54',
		},
		showIcon:true,
		showLabel:false,
		iconStyle:{
			height:40,
			width:40,
		}
	},
},
);



const styles = StyleSheet.create({
	container:{
		flex: 1,
	},
	icon: {
	    width: 46,
	    height: 46,
  	},
	monumentoContainer:{
		borderBottomWidth: 2,
		borderBottomColor: 'black',
	},
	monumentoPic:{
		justifyContent:'flex-end',
		height:((Dimensions.get('window').height-(Dimensions.get('window').height/13))/3.5),
		width:Dimensions.get('window').width,
		resizeMode: 'cover'
	},
	monumentoTitleContainer:{
		//backgroundColor:'rgba(0,0,0,0.6)',
		backgroundColor:'rgba(7, 94, 84, 0.8)',
		alignSelf:'flex-end',
		height:30,
		alignItems:'center',
		paddingLeft:10,
		paddingRight:5,
		borderTopLeftRadius:20,
		borderBottomLeftRadius:20,
		justifyContent:'center'
	},
	monumentoTitle:{
		color:'white',
	}
})

export default Monumentos



// {convento.map((convento, index) => (
// 	<TouchableHighlight
// 		onPress={() => this.onClick(convento)}
// 		key={index}
// 		style={styles.monumentoContainer}
// 	>
// 		<Image style={styles.monumentoPic} source={{uri:convento.picture}}>
// 			<View style={styles.monumentoTitleContainer}>
// 				<Text style={styles.monumentoTitle}>{convento.title}</Text>
// 			</View>
// 		</Image>
// 	</TouchableHighlight>
// ))}











// <ScrollableTabView
//   tabBarUnderlineColor="#fff"
//   tabBarUnderlineStyle={{backgroundColor: "#fff"}}
//   tabBarBackgroundColor ="#075e54"
//   tabBarActiveTextColor="#fff"
//   tabBarInactiveTextColor="#88b0ac"
// >
// 	<ScrollView tabLabel={"Convento de Cristo"}>
// 		<Museus onSelect={(monumento) => this.onClick(monumento)}/>
// 	</ScrollView>

// 	<ScrollView tabLabel={"Museus"}>
// 		<Museus  onSelect={(monumento) => this.onClick(monumento)}/>
// 	</ScrollView>

// 	<ScrollView tabLabel="Igrejas">
// 		<Igrejas tabLabel="Igrejas" onSelect={(monumento) => this.onClick(monumento)}/>
// 	</ScrollView>

// 	<ScrollView tabLabel="Outros Locais">
// 		<OutrosLocais tabLabel="Outros Locais" onSelect={(monumento) => this.onClick(monumento)}/>
// 	</ScrollView>
// </ScrollableTabView>
