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
  AsyncStorage,
  Alert
} from 'react-native';

import { Icon } from 'react-native-elements';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import Beacons  from 'react-native-beacons-manager';
import DeviceInfo from 'react-native-device-info';
import fetch from 'react-native-fetch-polyfill';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import { BluetoothManager as BluetoothStatus } from 'react-native-bluetooth-status';



export default class Homepage extends Component {
  constructor(){
    super()
    this.state = {
      added: false,
      data: [],
      acessos:[],
      totalOfImages:0,
      imagesDownloaded:0,
      progressBar:0.0001,
			rangingDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
      enable: true,
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

          this.isBluetoothOn();

          console.log(RNFS.DocumentDirectoryPath);
          let x = this.state.data.length-1;
          let y = this.state.data[x].monuments.length-1;
          let z = this.state.data[x].monuments[y].pois.length-1;

          //Apagar imagens
          {this.state.data.map((i, indexCategorias) => i.monuments.map((j, indexMonuments) => j.pois.map((k, indexPois) => {
            let imgMonumento = false;
            let imgPoi = false;
            RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((result) => {
              if (result.length !== 1){

                result.map((i, index) => {
                  if((i.name == 'monumento_' + j.image_md5 + '.jpg') ){
                    imgMonumento = true;
                  }

                  if(i.name == 'poi_' + k.image_md5 + '.jpg'){
                    imgPoi = true;
                  }

                  if(index == result.length-1 && imgMonumento == false){
                    RNFS.unlink(RNFS.DocumentDirectoryPath + '/' + i.name)
                      .then(() => {
                        console.log('FILE DELETED');
                      })
                      // `unlink` will throw an error, if the item to unlink does not exist
                      .catch((err) => {
                        console.log('Erro a apagar as imagens:', err.message);
                      });
                  }

                  if(index == result.length-1 && imgPoi == false){
                    RNFS.unlink(RNFS.DocumentDirectoryPath + '/' + i.name)
                      .then(() => {
                        console.log('FILE DELETED');
                      })
                      // `unlink` will throw an error, if the item to unlink does not exist
                      .catch((err) => {
                        console.log('Erro a apagar as imagens:', err.message);
                      });
                  }

                  if(index == result.length-1 && imgMonumento == true){
                    imgMonumento = false;
                  }

                  if(index == result.length-1 && imgPoi == true){
                    imgPoi = false;
                  }

                }) //fim do map function
              } //fim do if result.length
            }) //fim do .then(result)
          })))}


          //Guardar imagens
          {this.state.data.map((i, indexCategorias) => i.monuments.map((j, indexMonuments) => j.pois.map((k, indexPois) => {
            RNFS.exists(RNFS.DocumentDirectoryPath + '/monumento_' + j.image_md5 + '.jpg')
              .then((success) => {
                if (success == false){
                  this.setState({totalOfImages: this.state.totalOfImages+1, added:true, enable:false})
                  RNFS.downloadFile({
                    fromUrl: j.image,
                    toFile: `${RNFS.DocumentDirectoryPath}/monumento_`+ j.image_md5 + `.jpg`,
                  }).promise.then((r) => {
                      this.setState({imagesDownloaded: this.state.imagesDownloaded+1})
                      if(this.state.progressBar == 1){
                        this.setState({added:false})
                      }
                    });
                }
              })
              .catch((err) => {
                console.log('Erro', err);
              });

              RNFS.exists(RNFS.DocumentDirectoryPath + '/poi_' + k.image_md5 + '.jpg')
                .then((success) => {
                  if (success == false){
                    this.setState({totalOfImages: this.state.totalOfImages+1, added:true, enable:false})
                    RNFS.downloadFile({
                      fromUrl: k.image,
                      toFile: `${RNFS.DocumentDirectoryPath}/poi_`+ k.image_md5 + `.jpg`,
                    }).promise.then((r) => {

                          this.setState({imagesDownloaded: this.state.imagesDownloaded+1})
                          this.setState({progressBar:(((this.state.imagesDownloaded*100)/this.state.totalOfImages)/100)});
                          if(this.state.progressBar == 1){
                            this.setState({added:false})
                            // navigate('Monumento', {data:this.state.data})
                          }
                      });
                  }

                  if(indexCategorias==x && indexMonuments==y && indexPois==z && this.state.added==false){
                      // navigate('Monumento', {data:this.state.data})
                      this.setState({enable:false})

                  }

                })
                .catch((err) => {
                  console.log('Erro', err);
                });
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
              if(!dados){
                console.log('Os dados estão vazios');
                Alert.alert(
                  'Dados insuficientes',
                  'Por favor reinicie a aplicação e ligue a internet para a aplicação descarregar os dados necessários. Obrigado.',
                  [
                    {text: 'Compreendi', onPress: () => console.log('OK Pressed')},
                  ],
                )
              } else {
                const monuments = JSON.parse(dados)
                this.setState({
                  data: monuments,
                  added: false,
                  enable: false,
                })
              }
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
              {dataSync.map(i => i.monuments.map(j => j.pois.map((k, index) => {
                if (notification.message == k.name){
                  navigate('MonumentoDetails', {monumento:j, swiperIndex: index});
                }
              })))}
  					}
  				}
  			)
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
    Beacons.detectIBeacons();
    Beacons.setBackgroundScanPeriod(30000);
    // Range beacons inside the region
    Beacons
     .startRangingBeaconsInRegion('Beacon IPT')
     .then(() => console.log('Beacons ranging started succesfully'))
     .catch(error => console.log(`Beacons ranging not started, error: ${error}`));

    DeviceEventEmitter.addListener('beaconsDidRange',(data) => {
       this.setState({ rangingDataSource: this.state.rangingDataSource.cloneWithRows(data.beacons) });

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
        if(k.beacon !== null){
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
        }
      })))}
    }
  }

  removeElement(){
      this.state.acessos.map((acesso, index) => {
        let date = acesso.date;
        if(moment().isAfter(date)){
          this.state.acessos.splice(index, 1);
          this.setState({acessos: this.state.acessos});
        }
      });
      return
  }

  postFunction(k){
    fetch('http://www.thomar.me/accesses', {
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

  isBluetoothOn(){
    BluetoothStatus.state()
      .then((result) => {
          if (result == false) {
            Alert.alert(
              'Bluetooth desligado',
              'Se deseja que a aplicação o avise quando estiver perto de um Ponto de Interesse, ligue o Bluetooth. Obrigado.',
              [
                {text: 'Ligar Bluetooth', onPress: () => this.turnBluetoothOn()},
                {text: 'Compreendi'}
              ],
            )
          }
      })
  }

  turnBluetoothOn(){
    BluetoothStatus.enable(true)
      .catch(() => {
        Alert.alert(
          'Falhou a ligar o Bluetooth',
          'A aplicação não conseguiu ligar o Bluetooth.',
          [
            {text: 'Compreendi'},
          ],
        )
      })
  }

  ready(){
    if (this.state.added == false && this.state.enable == false) {
      return true
    } else {
      return false
    }
  }


  render(){
    const {navigate} = this.props.navigation;


    return (
      <Image source={require('../config/pictures/tomar_centro.jpg')} style={styles.container}>


        <View style={styles.titulo}>
          <Text style={styles.tituloText}>
            Tomar
          </Text>
        </View>

        <ActivityIndicator
          style={styles.spinner}
          animating={this.state.enable}
          size={100}
          color='white'
        />


          <View style={styles.progressBar}>
            <Display enable={this.state.added}>
              <Progress.Bar
                progress={this.state.progressBar}
                color={'rgba(0, 0, 0, 0.7)'}
                borderWidth={2}
                borderColor={'#000'}
                height={50}
                unfilledColor={'rgba(0, 0, 0, 0)'}
                width={Dimensions.get('window').width - 15}
              />
              <View style={{alignItems:'center'}}>
                <Text style={styles.buttonText}>
                  Loading...
                </Text>
              </View>

            </Display>
          </View>


        <View style={styles.contentContainer}>
          <Display
            enable={this.ready()}
          >
            <View style={styles.buttonContent}>
              <TouchableHighlight
                onPress={() => navigate('MultiMap', {data:this.state.data})}
                style={styles.button}
                underlayColor='#075e54'
              >
                <View>
                  <Icon
                    name='place'
                    color='#fff'
                    size={34}
                  />
                  <Text style={styles.buttonText}>Mapa</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={() => navigate('Monumento', {data:this.state.data})}
                style={styles.button}
                underlayColor='#075e54'
              >
                <View>
                  <Icon
                    name='account-balance'
                    color='#fff'
                    size={34}
                  />
                  <Text style={styles.buttonText}>Monumentos</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Display>
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

  titulo:{
    flex:2,
    marginTop:30,
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

  progressBar:{
    flex:2,
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
  },

  spinner:{
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  contentContainer:{
    flex:1,
    justifyContent:'flex-end',
  },

  buttonContent:{
    flex:1,
    flexDirection:'row',
    alignSelf:'stretch',
    alignItems:'flex-end',
    justifyContent:'center',
    margin:5,
  },

  button:{
    flex:1,
    backgroundColor:'rgba(7, 94, 84, 0.7)',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 2,
    borderColor: '#075e54',
    elevation: 10,
    height:100,
    margin: 10,
  },

  buttonText:{
    fontSize: 30,
    fontWeight: '100',
    fontFamily: 'ostrich-regular',
    color: 'white',
    marginTop: 10,
  },

  text:{
    color:'#fff',
    fontSize: 24,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  }

});
