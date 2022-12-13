import React, {useContext, useState} from 'react';
import { View, 
        Text,
        StyleSheet,
        StatusBar,
        TouchableOpacity,
        FlatList,
        Alert,
        Modal,
        Pressable,
        Image,
        Dimensions } from 'react-native';
import AppLogoHeader from '../../components/AppLogoHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Datas } from '../../utils/PortefolioCarouselData';
import { AuthContext } from '../../components/Context';
//import AppModal from '../../components/AppModal';

import ImagePicker from 'react-native-image-crop-picker';
import { HOST, VERIFY } from '../../server/server';
import axios from 'axios';



const Data = [
  {
      id: 1,
      name: 'Appareil photo'
  },
  {
      id: 2,
      name: 'Galerie'
  }
]




const PortefolioScreen = ({navigation}) => {


  const { Logout, user } = useContext(AuthContext)

  console.log("user-: ", user)


  const Icon = ({name, color, size, style, onPress}) => {
    return (
    <TouchableOpacity style={style} onPress={onPress}>
        <Ionicons 
            name={name}
            color={color}
            size={size}
        />
    </TouchableOpacity>
    )
  }

  const FloatedIcon = ({ name, size, color, redirection, style }) => {
    return(
        <TouchableOpacity 
        onPress={() => navigation.navigate(redirection)}
            style={style}>
            <Ionicons  
                name={name}
                size={size}
                color={color}
            />
        </TouchableOpacity>
    )
  }

  const renderItem = ({item}) => {
    return (
    <View style={styles.renderItem}>
      <Image source={item.cover} style={styles.renderItemImage} />
      <Text style={styles.renderItemText}>{ item.text }</Text>
    </View>
    )
  }


  const alertForVerificationSuccess = () =>
    Alert.alert(
      "Succes de l'opération",
      "L'image correspond bien a celle de la base de données. Nous allons vous rédiriger vers l'écran solde démandé",
      [
        {
          text: "Fermer",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "D'accord", onPress: () => console.log("OK Pressed") }
      ]
  );
  const alertForVerificationFail = () =>
    Alert.alert(
      "Echec de l'opération",
      "L'image ne correspond pas. Assurer-vouz de selectionner une bonne image avec un visage bien visible",
      [
        {
          text: "Fermer",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "D'accord", onPress: () => console.log("OK Pressed") }
      ]
  );


  const AppModal = () => {

    const [image, setImage] = useState(null);
    const [verification, setVerification] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  
    console.log('image modal: ', image)
  
  
    const Item = ({ text, onPress }) => (
      <TouchableOpacity onPress={onPress} style={styles.item }>
        <Text style={styles.title}>{text}</Text>
      </TouchableOpacity>
  );
    
  
    const takePhotoFromCamera = () => {
      //console.log("prendre une photo")
      ImagePicker.openCamera({
          width: 300,
          height: 400,
          includeBase64: true,
          cropping: true,
        }).then(image => {
          setImage(image.data)
  
          photo = image.data
          console.log('photo-v: ', photo)
  
          // photo => {
          //   axios.post( HOST + VERIFY, {
          //     photo
          //   })
          //   .then(response => {
          //     const serverResponse = {
          //       message: response.status,
          //       verified: response.verification.verified
          //     }
          //     setVerification(serverResponse.verified)
          //   })
          // }
  
          axios.post(HOST+VERIFY, {
            photo: photo
          })
          .then(response => {
            const verifyResponse = {
              status: response.data.status,
              verification: response.data.verification.verified,
              distance: response.data.verification.distance
            }
            console.log('response-verif: ',verifyResponse);
            //alert(verifyResponse.verification)
            alertForVerificationSuccess();
  
            verifyResponse.verification == true ?
            navigation.navigate('account')
            :
            null
  
          })
          .catch(function (error) {
            console.log('error-v', error);
            alertForVerificationFail();
          });
  
        });
    }
  
    const choosePhotoFromGallery = () => {
        //console.log("choisir photo depuis galerie")
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64: true,
            cropping: true
          }).then(image => {
            setImage(image.data)  
  
            photo = image.data
            console.log('photo-v: ', photo)
  
            axios.post(HOST+VERIFY, {
              photo: photo
            })
            .then(response => {
              const verifyResponse = {
                status: response.data.status,
                verification: response.data.verification.verified,
                distance: response.data.verification.distance
              }
              console.log('response-verif: ',verifyResponse);
              //alert(verifyResponse.verification)
              alertForVerificationSuccess();
  
              verifyResponse.verification == true ?
              navigation.navigate('account')
              :
              null
  
            })
            .catch(function (error) {
              console.log('error-v: ',error);
              alertForVerificationFail();
            });
  
          });
    }
  
      
      return (
        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Choisissez une image</Text>
                    
                    <Item 
                      text='Appareil photo' 
                      onPress={() => takePhotoFromCamera()} />
                    <Item 
                      text='Galerie'
                      onPress={() => choosePhotoFromGallery() }  />
                
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Fermer</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
  
          <View style={styles.button}>
            <Pressable
              style={ styles.buttonOpen }
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Voir</Text>
            </Pressable>
          </View>
  
  
        </View>
      );
    };


 



  return (
    <>
      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <View style={styles.header}>
            <Icon 
                name='notifications-outline' 
                color='#303030' 
                size={30}
                redirection='portefolio' 
                style={styles.headerLeftIcon} />
            <AppLogoHeader logoColorWhite={false} isUseForMainAppScreen={true} style={styles.logo} />
            <Icon 
                name='log-out-outline' 
                color='#303030' 
                size={30} 
                onPress={() => Logout()} 
                style={styles.headerRightIcon} />
        </View>

        <View style={styles.footer}>

          <View style={styles.footerTop}>

            <Text style={styles.footerTopTitle}>{ user.name }</Text>

            <View style={styles.footerTopMoneyContainer}>
              <Text style={styles.footerTopMoneyText}> Portefeuille </Text>
              {/* <TouchableOpacity>
                <Feather 
                  name='eye-off'
                  size={23}
                  color='#303030'
                />
              </TouchableOpacity>  */}
            </View>
{/* 
            <View style={styles.footerTopOverview}>
              <TouchableOpacity 
                style={styles.footerTopOverviewTouchable}
                onPress={() => navigation.navigate('portefolio')}>
                <Text style={styles.footerTopOverviewText}>Voir</Text>
              </TouchableOpacity> 

              
            </View> */}

            <AppModal />
  
            
            <FloatedIcon 
              name='share' 
              size={30} 
              color='#bababa'
              redirection='account'
              style={styles.floatedIconTopRight} />
            <Text style={styles.iconBottomTextRight}>Partager</Text>

            <FloatedIcon 
              name='settings' 
              size={30} 
              color='#bababa'
              redirection='portefolio'
              style={styles.floatedIconTopLeft} />
            <Text style={styles.iconBottomTextLeft}>Réglages</Text>

          </View>

          <View style={styles.footerBottom}>


            <FlatList  
              data={Datas}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={styles.bottomFlatList}
            />

          </View>

          <FloatedIcon 
            name='chatbubble-ellipses' 
            size={30} 
            color='#fff' 
            redirection='prechatbot'
            style={styles.floatedIcon} />

        </View>
    </>
  )
}

export default PortefolioScreen;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 52,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headerLeftIcon: {
      position: 'absolute',
      left: 12,
      top: 10
  },
  headerRightIcon: {
      position: 'absolute',
      right: 15,
      top: 10
  },
  logo: {
      width: width * 0.5,
      height: '100%'
  },
  footer: {
    width: width,
    height: height - 52,
    
  },
  footerTop: {
    width: width,
    height: (height - 52) * 0.65,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomRightRadius: width * 0.2,
    borderBottomLeftRadius: width * 0.2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20
  },
  footerBottom: {
    width: width,
    height: ((height - 52) * 0.2),
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    //borderWidth: 1,
    borderRadius: width * 0.2
  },
  footerTopTitle: {
    fontFamily: 'Avenir Next Bold',
    fontSize: 25,
    color: '#303030',
    position: 'absolute',
    top: ((height - 52) * 0.65) * 0.08
  },
  footerTopMoneyContainer: {
    height: 40,
    position: 'absolute',
    top: ((height - 52) * 0.65) * 0.2,
    flexDirection: 'row'
  },
  footerTopMoneyText: {
    fontFamily: 'Avenir Next Bold',
    fontSize: 20,
    color: '#606060',
    marginRight: 5
  },
  footerTopOverview: {
    width: width * 0.8,
    height: ((height - 52) * 0.65) * 0.3,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 30

  },
  footerTopOverviewTouchable: {
    borderWidth: 1,
    padding: 10,
    width: width * 0.25,
    borderColor: '#bababa',
    alignItems: 'center',
    backgroundColor: '#303030',
    borderRadius: width * 0.05,
    elevation: 30
  },
  footerTopOverviewText: {
    fontFamily: 'Avenir Next Bold',
    color: '#fff'
  },
  floatedIcon: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ED7F10',
    position: 'absolute',
    bottom: height * 0.125,
    right: 20
  },
  floatedIconTopRight: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: height * 0.07,
    right: width * 0.15,
    elevation: 30
  },
  floatedIconTopLeft: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: height * 0.07,
    left: width * 0.15,
    elevation: 40
  },
  iconBottomTextRight: {
    fontFamily: 'Avenir Next Bold',
    color: '#848484',
    position: 'absolute',
    bottom: height * 0.04,
    right: width * 0.157
  },
  iconBottomTextLeft: {
    fontFamily: 'Avenir Next Bold',
    color: '#848484',
    position: 'absolute',
    bottom: height * 0.04,
    left: width * 0.157
  },
  bottomFlatList: {
    width: width * 0.9,
    height: height * 0.2,
    //borderWidth: 1,
    //borderColor: '#bababa'
    elevation: 40

  },
  renderItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  renderItemImage: {
    height: height * 0.2,
    width: width * 0.9,

  },
  renderItemText: {
    position: 'absolute',
    fontSize: 18,
    fontFamily: 'Avenir Next Bold',
    bottom: 25
  },



  modalContainer: {
    width: width * 0.85,
    height: height * 0.6,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    top: height * 0.12,
    left: width * 0.07
  },
  modalView: {
    width: width * 0.85,
    height: height * 0.6,
    //margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#ED7F10',
    padding: 35,
    alignItems: "center",
    shadowColor: "#ED7F10",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: width * 0.8,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: height * 0.12
  },
  buttonOpen: {
    borderWidth: 1,
    padding: 10,
    width: width * 0.25,
    borderColor: 'transparent',
    alignItems: 'center',
    backgroundColor: '#303030',
    borderRadius: width * 0.05,
    elevation: 30
  },
  buttonClose: {
    backgroundColor: "#303030",
    position: 'absolute',
    bottom: height * 0.07,
    width: width * 0.35,
    borderRadius: width * 0.1,
    height: 50,
    justifyContent: 'center'
  },
  textStyle: {
    color: "white",
    fontFamily: 'Avenir Next Bold',
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'Avenir Next Bold',
    fontSize: 18
  },


  item: {
    width: width * 0.65,
    height: height * 0.12,
    padding: 20,
    borderWidth: 3,
    borderColor: '#ED7F10',
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontFamily: 'Avenir Next Bold',
    fontSize: 24,
    color: '#303030'
  }
 


})