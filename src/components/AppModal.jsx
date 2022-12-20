import React, {useState} from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert,
    Modal,
    Pressable,
    FlatList,
    StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { HOST, VERIFY } from '../server';
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





const AppModal = ({navigation}) => {

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
          alert(verifyResponse.verification)

          verifyResponse.verification == true ?
          navigation.navigate('account')
          :
          null

        })
        .catch(function (error) {
          console.log('error-v', error);
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
            alert(verifyResponse.verification)

            verifyResponse.verification == true ?
            navigation.navigate('account')
            :
            null

          })
          .catch(function (error) {
            console.log('error-v: ',error);
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



export default AppModal;

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
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

  });
