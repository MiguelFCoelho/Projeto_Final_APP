import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Dimensions,
  DeviceEventEmitter,
  ListView,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import MapView from 'react-native-maps';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import Beacons  from 'react-native-beacons-manager';
import DeviceInfo from 'react-native-device-info';
import fetch from 'react-native-fetch-polyfill';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
// import 'whatwg-fetch';



export default class Homepage extends Component {
  constructor(){
    super()
    this.state = {
      added: false,
      data: [],
      acessos:[],
      totalProgress:0,
      progress:0,
      progresso:0.0001,
			rangingDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
    }
  }

  componentDidMount(){
    const {navigate} = this.props.navigation;

    // -- FETCHING DATA ---------------------------------------------- FETCHING DATA --
    fetch('http://www.thomar.me/categories.json', {timeout: 30 * 10000})
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
        }, function(){
          //Vai gravar o JSON
          AsyncStorage.setItem(
            '@Data:Monuments',
            JSON.stringify(res)
          )
          console.log('************************************************************Guardou os dados')

          //Vai gravar as imagens
          {this.state.data.map((i, indexCategorias) => i.monuments.map((j, indexMonuments) => j.pois.map((k, indexPois) => {
            let imgMonumento = false;
            let imgPoi = false;
            RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
              .then((result) => {
                result.map((i, index) => {
                  if(('monumento_' + j.id + '.jpg') == i.name){
                    imgMonumento = true;
                  }

                  if('poi_' + k.id + '.jpg' == i.name){
                    imgPoi = true;
                  }

                  if(index == result.length-1 && imgMonumento == false){
                    this.setState({totalProgress: this.state.totalProgress+1, added:true})
                    RNFS.downloadFile({
                      fromUrl: j.image,
                      toFile: `${RNFS.DocumentDirectoryPath}/monumento_`+ j.id + `.jpg`,
                    }).promise.then((r) => {
                          this.setState({progress: this.state.progress+1})
                          console.log(r)
                          console.log('Progresso:' + this.state.progress + ' de ' + this.state.totalProgress)
                      });
                  }

                  if(index == result.length-1 && imgPoi == false){
                    this.setState({totalProgress: this.state.totalProgress+1, added:true})
                    RNFS.downloadFile({
                      fromUrl: k.image,
                      toFile: `${RNFS.DocumentDirectoryPath}/poi_`+ k.id + `.jpg`,
                    }).promise.then((r) => {
                          this.setState({progress: this.state.progress+1})
                          console.log(r)
                          console.log('Progresso:' + this.state.progress + ' de ' + this.state.totalProgress)
                          this.setState({progresso:(((this.state.progress*100)/this.state.totalProgress)/100)});
                          if(this.state.progresso == 1){
                            console.log('***********************************Vai mudar de scene*********************************')
                            navigate('Monumento', {data:this.state.data})
                          }
                      });
                  }

                  if(index == result.length-1 && imgMonumento == true){
                    imgMonumento = false;
                  }

                  if(index == result.length-1 && imgPoi == true){
                    imgPoi = false;
                  }

                  let x = this.state.data.length-1;
                  let y = this.state.data[x].monuments.length-1;
                  let z = this.state.data[x].monuments[y].pois.length-1;


                  if(indexCategorias==x && indexMonuments==y && indexPois==z && index == result.length-1 && this.state.added==false){
                      navigate('Monumento', {data:this.state.data})
                  }



                })
              })
          })))}

          //Vai apagar as imagens guardadas
        {this.state.data.map((i, indexCategorias) => i.monuments.map((j, indexMonuments) => j.pois.map((k, indexPois) => {
          let imgMonumento2 = false;
          let imgPoi2 = false;
          RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((result) => {
              if (result.length !== 1){

                result.map((i, index) => {
                  if((i.name == 'monumento_' + j.id + '.jpg') ){
                    imgMonumento2 = true;
                  }

                  if(i.name == 'poi_' + k.id + '.jpg'){
                    imgPoi2 = true;
                  }

                  if(index == result.length-1 && imgMonumento2 == false){
                    RNFS.unlink(RNFS.DocumentDirectoryPath + '/' + i.name)
                      .then(() => {
                        console.log('FILE DELETED');
                      })
                      // `unlink` will throw an error, if the item to unlink does not exist
                      .catch((err) => {
                        console.log('Erro a apagar as imagens:', err.message);
                      });
                  }

                  if(index == result.length-1 && imgPoi2 == false){
                    RNFS.unlink(RNFS.DocumentDirectoryPath + '/' + i.name)
                      .then(() => {
                        console.log('FILE DELETED');
                      })
                      // `unlink` will throw an error, if the item to unlink does not exist
                      .catch((err) => {
                        console.log('Erro a apagar as imagens:', err.message);
                      });
                  }

                  if(index == result.length-1 && imgMonumento2 == true){
                    imgMonumento2 = false;
                  }

                  if(index == result.length-1 && imgPoi2 == true){
                    imgPoi2 = false;
                  }

                }) //fim do map function
              } //fim do if result.length
            }) //fim do .then(result)
          })))}

        })
      })
      .catch(() => {
        AsyncStorage.getItem(
  				'@Data:Monuments',
  				(err, dados) => {
  					if(err) {
  						console.error('Error loading monuments', err)
  					} else {
  						const monuments = JSON.parse(dados)
  						this.setState({
  							data: monuments,
                fetching: false
  						})
              console.log('********************************************************Carregou os dados');
              navigate('Monumento', {data:this.state.data})
  					}
  				}
  			)
      })




    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {

        AsyncStorage.getItem(
  				'@Data:Monuments',
  				(err, dados) => {
  					if(err) {
  						console.error('Error loading monuments', err)
  					} else {
  						const dataSync = JSON.parse(dados)
              console.log('********************************************************Carregou os dados');
              {dataSync.map(i => i.monuments.map(j => j.pois.map((k, index) => {
                if (notification.message == k.name){
                  navigate('MonumentoDetails', {monumento:j});
                }
              })))}
  					}
  				}
  			)
        // console.log( 'NOTIFICATION:', notification );
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });



    // -- BEACON DETECTION ---------------------------------------------- BEACON DETECTION --
    // start iBeacon detection (later will add Eddystone and Nordic Semiconductor beacons)
    Beacons.detectIBeacons();
    Beacons.setBackgroundScanPeriod(30000);
    // Range beacons inside the region
    Beacons
     .startRangingBeaconsInRegion('Beacon IPT')
     .then(() => console.log('Beacons ranging started succesfully'))
     .catch(error => console.log(`Beacons ranging not started, error: ${error}`));

    DeviceEventEmitter.addListener('beaconsDidRange',(data) => {
      //  console.log('Data.Beacons: ', data);
       this.setState({ rangingDataSource: this.state.rangingDataSource.cloneWithRows(data.beacons) });

      //  console.log('Beacons: ',this.state.rangingDataSource.getRowCount());
      //  console.log('*******ACESSOS:', this.state.acessos);

      if(this.state.rangingDataSource.getRowCount() !== 0){
        let date = moment().add(20, 's');
        this.NewNotification(data.beacons, date);
      }
    });
  } //Fim do componentDidMount


  NewNotification(beacons, date){


    let acedeu = false;

    //Só entra se o array que contém os dados do fetch ja estiver preenchido
    if(this.state.data.length > 0){
      //Percorre todos os dados presentes no array data
      {this.state.data.map(i => i.monuments.map(j => j.pois.map((k, index) => {
        //Verifica se o uuid do beacon é igual a um dos beacons presente no array data (foi preenchido pelo ficheiro json)
        if(k.beacon.uuid === beacons[0].uuid){

          //Só entra se o array dos acessos estiver vazio, logo será o primeiro acesso.
          if(!this.state.acessos.length){
            this.state.acessos.push({'uuid': beacons[0].uuid, 'date': date});
            this.setState({acessos: this.state.acessos});
            PushNotification.localNotificationSchedule({
                message: k.name, // (required)
                date: new Date(Date.now()),// (optional) for setting delay
            });
            this.postFunction(k); //Faz um post

          //Caso já haja um acesso no array dos acessos então entra aqui
          } else {
              //Chama a função que remove elementos do array dos acessos. Vai verificar se os elementos
              //que lá estão ainda estão dentro do seu TTL (Time To Live), caso algum não esteja será removido
              this.removeElement();

              //Percorre o array beacons
              beacons.map ((beacon, indexBeacon) => {
                //Percorre o array dos acessos
                this.state.acessos.map ((acesso, indexAcesso) => {

                  //Verifica se o uuid do beacon já está dentro do arrray dos acessos. Se tiver a flag 'acedeu' fica true.
                  if (beacon.uuid === acesso.uuid){
                    acedeu = true;
                  }

                  //Caso já esteja na ultima posição do array acessos e a flag 'acedeu' ainda estiver false
                  //então é porque o beacon não está no array acessos logo será inserido
                  if(indexAcesso === (this.state.acessos.length-1) && acedeu === false){
                    console.log("Vai adicionar um elemento ao array dos acessos");
                    this.state.acessos.push({'uuid': beacon.uuid, 'date': date});
                    this.setState({acessos: this.state.acessos});

                    PushNotification.localNotificationSchedule({
                      message: k.name, // (required)
                      date: new Date(Date.now()),// (optional) for setting delay
                    });

                    this.postFunction(k);
                  }

                  //Caso já esteja na ultima posição do array acessos e a flag 'acedeu' estiver true
                  //então é porque o beacon já está no array acessos e não será inserido outra vez.
                  //Mete-se a flag 'acedeu' a false e segue-se para o próximo beacon presente no array dos beacons.
                  if(indexAcesso === (this.state.acessos.length-1) && acedeu === true){
                      acedeu = false;
                  }
              })
            })
          }
        }
      })))}
    }
  }

  removeElement(){
      this.state.acessos.map((acesso, index) => {
        let date = acesso.date;
        if(moment().isAfter(date)){
          console.log("Vai remover um elemento ao array dos acessos");
          this.state.acessos.splice(index, 1);
          this.setState({acessos: this.state.acessos});
        }
      });
      return
  }

  postFunction(k){
    console.log('ID do PoI: ', k.id)
    fetch('http://www.thomar.me:3000/accesses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // date: moment().format('YYYY-MM-D'),
        date: moment().format(),
        poi_id: k.id,
        nationality: DeviceInfo.getDeviceCountry(),
        id_device: DeviceInfo.getUniqueID(),
        os: DeviceInfo.getSystemName(),
        brand: DeviceInfo.getBrand(),
        model: DeviceInfo.getModel(),
      })
    })
  }


  render(){
    const {navigate} = this.props.navigation;
    console.log('Progresso: ', this.state.progresso);


    return (
      <Image source={require('../config/pictures/tomar_centro.jpg')} style={styles.container}>


        <View style={styles.titulo}>
          <Animatable.Text
            style={styles.tituloText}
            animation="pulse"
            iterationCount="infinite"
            duration={15000}
          >
            Tomar
          </Animatable.Text>
        </View>

        <View style={styles.progressBar}>
          <Progress.Bar
            progress={this.state.progresso}
            color={'rgba(0, 0, 0, 0.7)'}
            borderWidth={4}
            borderColor={'#000'}
            height={50}
            width={Dimensions.get('window').width - 15}
          />
          <Text style={styles.text}>
            Loading...
          </Text>
        </View>

      </Image>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    width: null,
    height: null,
  },
  progressBar:{
    flex:5,
    justifyContent: 'flex-end',
    alignItems:'center',
    marginBottom: 5,
  },
  //
  // spinner:{
  //   position: 'absolute',
  //   height: Dimensions.get('window').height,
  //   width: Dimensions.get('window').width
  // },

  titulo:{
    marginTop:30,
    flex:5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  tituloText:{
    fontSize: 130,
    fontWeight: '100',
    fontFamily: 'ostrich-regular',
    color: 'white',
    textShadowColor:'#252525',
    textShadowOffset:{width:2, height:2},
    textShadowRadius: 15,
  },

  // contentContainer:{
  //   flex:4,
  //   justifyContent:'space-around',
  //   flexDirection:'row',
  //   alignItems:'flex-end'
  // },
  //
  // button:{
  //   flex:1,
  //   backgroundColor:'rgba(0, 0, 0, 0.7)',
  //   alignItems:'center',
  //   justifyContent:'center',
  //   elevation: 10,
  //   height:100
  // },
  //
  // buttonContent:{
  //   flex:1,
  //   flexDirection:'row',
  //   alignSelf:'stretch',
  //   alignItems:'center',
  //   justifyContent:'center',
  // },
  //
  text:{
    color:'rgb(0,0,0)',
    fontSize: 24,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  }

});


// <Icon name="bank" color='rgba(255,255,255,0.7)' size={40} />
