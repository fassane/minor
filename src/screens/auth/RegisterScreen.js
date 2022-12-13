import React, {useState, useContext} from 'react';
import { View, 
      Text,
      Image,
      StyleSheet,
      StatusBar,
      ToastAndroid,
      ScrollView,
      TouchableOpacity,
      Dimensions, 
      Pressable} from 'react-native';
import AppLogoHeader from '../../components/AppLogoHeader';
import Input from '../../components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagesContainer from '../../components/ImagesContainer';
import { AuthContext } from '../../components/Context';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker';
import AppLogoFooter from '../../components/AppLogoFooter';



const RegisterScreen = ({navigation}) => {

  const { Register } = useContext(AuthContext)

  const [data, setData] = useState({
    name: '',
    number: '',
    password: '',
    password_confirmation: '',
    //photo: '',
    isTextInputChange: false,
    secureTextEntry: true,
    secureTextEntryConfirmation: true,
    isValidName: true,
    isValidUser: true,
    isValidPassword: true,
    isValidPasswordConfirmation: true,
    image: '../assets/images/person.png',
    imageBase64: "rien pour l'instant"
  });

  console.log('name: ',data.name)
  console.log('number: ',data.number)
  console.log('password: ', data.password)
  console.log('password_confirm: ', data.password_confirmation)
  console.log('photo: ', data.imageBase64)
  console.log('image: ', data.image)
  console.log('imageB64: ', data.imageBase64)

  

  const inputTextNameChange = (value) => {
    if (value.trim().lengh !== 0) {
      setData({
        ...data,
        name: value,
        isTextInputChange: true
      })
    }
    else {
      setData({
        ...data,
        name: value,
        isTextInputChange: false
      })
    }
  }

  const inputTextChange = (value) => {
    if (value.trim().lengh !== 0) {
      setData({
        ...data,
        number: value,
        isTextInputChange: true
      })
    }
    else {
      setData({
        ...data,
        number: value,
        isTextInputChange: false
      })
    }
  }


  const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value
    })
  }

  const handlePasswordConfirmationChange = (value) => {
    setData({
      ...data,
      password_confirmation: value
    })
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  const updateSecureTextEntryConfirmation = () => {
    setData({
      ...data,
      secureTextEntryConfirmation: !data.secureTextEntryConfirmation
    })
  }

  const handleValidName = (value) => {
    if(value.trim().lengh >= 6) {
      setData({
        ...data,
        isValidName: true
      })
    }
    else {
      setData({
        ...data,
        isValidName: false
      })
    }
  }
  const handleValidUser = (value) => {
    if(value.trim().lengh >= 4) {
      setData({
        ...data,
        isValidUser: true
      })
    }
    else {
      setData({
        ...data,
        isValidUser: false
      })
    }
  }
  const handleValidPassword = (value) => {
    if(value.trim().lengh >= 6) {
      setData({
        ...data,
        isValidPassword: true
      })
    }
    else {
      setData({
        ...data,
        isValidPassword: false
      })
    }
  }
  const handleValidPasswordConfirmation = () => {
    if (data.password == data.password_confirmation) {
      setData({
        ...data,
        isValidPasswordConfirmation: true
      })
    }
    else {
      setData({
        ...data,
        isValidPasswordConfirmation: false
      })
    }
  }


  const Icon = ({name, color, size, style }) => {
    return (
    <TouchableOpacity style={style} onPress={() => navigation.goBack()}>
        <Ionicons 
            name={name}
            color={color}
            size={size}
        />
    </TouchableOpacity>
    )
  }

  const SubmitButton = ({text, onPress}) => {
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={styles.submitButtonContainer} >
        <Text style={styles.submitText}>{text}</Text>
      </TouchableOpacity>
    )
  }

  const RedirectionText = ({text, route}) => {
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate(route)}
        style={styles.redirectionTextContainer}>
        <Text style={styles.redirectionText}>{text}&nbsp;<Text style={styles.textDesign}>Je me connecte</Text> </Text>
      </TouchableOpacity>
    )
  }


  const ImagesContainer = ({ navigation, inputTitle, isForProfileScreen }) => {

    

    // console.log('image: ',data.image)
    // console.log('image b64:', data.imageBase64)

    

    const takePhotoFromCamera = () => {
        console.log("prendre une photo")
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
          }).then(image => {
            console.log('image path: ',image.path);
            console.log('image data:', image.data);
            // setImage(image.path)
            // setImageBase64(image.data)
            setData({
              ...data,
              image: image.path,
              imageBase64: image.data
            })
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
          console.log('image path: ',image.path);
          console.log('image data:', image.data);
          // setImage(image.path)
          // setImageBase64(image.data)
          setData({
              ...data,
              image: image.path,
              imageBase64: image.data
          })
        });
    }

    
    

    const AddImageIcon = ({redirection}) => {
        return (
            <TouchableOpacity 
                style={ isForProfileScreen ? styles.addImageIconProfileScreen : styles.addImageIcon} 
                onPress={() => takePhotoFromCamera() } >
                <FontAwesome  
                    name='plus-circle'
                    size={30}
                    color='#ED7F10'
                />
            </TouchableOpacity>
        )
    }
    
    const RemoveImageIcon = () => {
        return (
            <TouchableOpacity 
                style={ isForProfileScreen ? styles.removeImageIconProfileScreen : styles.removeImageIcon}
                onPress={
                  () => setData({
                    ...data,
                    image: '../../assets/images/person.png'
                  })
                }
                >
                <FontAwesome  
                    name='close'
                    size={35}
                    color='red'
                />
            </TouchableOpacity>
        )
    }

    const OneImageContainer = ({isImageAlreadyChoose}) => {
        return (
            <TouchableOpacity 
                style={isForProfileScreen ? styles.oneImageContainerProfileScreen : styles.oneImageContainer}>
                {
                    data.image == '../../assets/images/person.png' ? 
                    (
                    <Pressable onPress={() => choosePhotoFromGallery() }>
                    <Image 
                        source={require('../../assets/images/person.png')} 
                        style={isForProfileScreen ? styles.imageProfileScreen : styles.image} />
                    <AddImageIcon />
                    </Pressable>
                    ) 
                    : 
                    (
                    <Pressable  onPress={() => choosePhotoFromGallery() }>
                    <Image 
                        source={{ uri: data.image }} 
                        style={isForProfileScreen ? styles.imageProfileScreen : styles.image} />
                    <RemoveImageIcon />
                    </Pressable>
                    )
                }
                
                    
                
            </TouchableOpacity>
        )
    }

    const TwoImageContainer = () => {
        return (
            <View style={styles.twoImageContainer}>
                <OneImageContainer isImageAlreadyChoose={true} />
                <OneImageContainer isImageAlreadyChoose={true} />
            </View>
        )
    }



  return (
    <>
    <View style={styles.inputTitleContainer}>
        <Text style={styles.inputTitle}> {inputTitle} </Text>
    </View>

    <View style={styles.container}>

        <TwoImageContainer />
        
    </View>
    </>
  )
}


  

  return (
    <>
      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>

            <Image source={require('../../assets/images/register.png')} style={styles.headerImage}  />
            <Text style={styles.headerText}>Gnscription à Minor</Text>

            <Input 
              amIWhantInputWithAllBorder={false}
              isInputTitlePresent={true}
              isThereLeftIcon={data.isValidName ? false : true}
              inputTitle='Votre prénom?'
              placeholder="Nom ou prénom"
              leftIconName='user'
              value={data.name}
              iconSize={24}
              leftIconColor='#ED7F10'
              //rightIconName='check-circle'
              rightIconColor='green'
              onChangeText={(value) => inputTextNameChange(value)}
              onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
            />
            {
              data.isValidName ? null 
              :
              ToastAndroid.showWithGravityAndOffset(
                "Au moins 6 caracteres pour le prénom",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              ) 
            }
            <Input 
              amIWhantInputWithAllBorder={false}
              isInputTitlePresent={true}
              isThereLeftIcon={data.isValidUser ? false : true}
              inputTitle="Votre numéro de téléphone"
              placeholder="Numéro de téléphone"
              leftIconName='phone'
              value={data.number}
              keyboardType='numeric'
              iconSize={24}
              leftIconColor='#ED7F10'
              rightIconName='check-circle'
              rightIconColor='green'
              onChangeText={(value) => inputTextChange(value)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {
              data.isValidUser ? null 
              :
              ToastAndroid.showWithGravityAndOffset(
                "Saisir un numéro valide",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              ) 
            }
            <Input 
              amIWhantInputWithAllBorder={false}
              isInputTitlePresent={true}
              isThereLeftIcon={true}
              inputTitle='Votre mot de passe'
              placeholder='Mot de passe'
              leftIconName='lock'
              iconSize={28}
              value={data.password}
              leftIconColor='#ED7F10'
              rightIconName={data.secureTextEntry ? 'eye-off' : 'eye'}
              secureTextEntry={data.secureTextEntry}
              onChangeText={(value) => handlePasswordChange(value)}
              onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
              onPressRightIcon={updateSecureTextEntry}
            />
            {
              data.isValidPassword ? null 
              : 
              ToastAndroid.showWithGravityAndOffset(
                "Au moins 6 caracteres pour le mot de passe",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              )
            }
            <Input 
              amIWhantInputWithAllBorder={false}
              isInputTitlePresent={true}
              isThereLeftIcon={true}
              inputTitle='Confirmation mot de passe'
              placeholder='Confirmer mot de passe'
              leftIconName='lock'
              iconSize={28}
              value={data.password_confirmation}
              leftIconColor='#ED7F10'
              rightIconName={data.secureTextEntryConfirmation ? 'eye-off' : 'eye'}
              secureTextEntry={data.secureTextEntryConfirmation}
              onChangeText={(value) => handlePasswordConfirmationChange(value)}
              onEndEditing={(e) => handleValidPasswordConfirmation(e.nativeEvent.text)}
              onPressRightIcon={updateSecureTextEntryConfirmation}
            />
            {
              data.isValidPasswordConfirmation ? null 
              : 
              ToastAndroid.showWithGravityAndOffset(
                "Les mot de passe ne correspondent pas",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              )
            }

            <ImagesContainer inputTitle='Votre photo' />
            
            <SubmitButton text="Je m'inscris" onPress={() => Register(data.name, data.number, data.password, data.imageBase64 )} />

            <RedirectionText text="j'ai déjà un compte." route='login' />

            {/* <AppLogoFooter  /> */}

        </View>

      </ScrollView>

    </>
  )
}

export default RegisterScreen;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: width,
    
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerImage: {
    width: width * 0.9,
    height: height * 0.4,
    borderWidth: 2,
    borderColor: '#cecece',
    marginTop: 20,
    borderRadius: width * 0.1
  },
  headerText: {
    fontFamily: 'Learning Curve Bold',
    marginBottom: height * 0.02,
    fontSize: 40,
    color: '#303030',
    marginTop: 30
  },
  headerLeftIcon: {
     left: -30,
  },
  submitButtonContainer: {
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: '#ED7F10',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'transparent',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    fontFamily: 'Avenir Next Bold',
    fontSize: 24,
    color: 'white'
  },
  redirectionTextContainer: {
    marginTop: 20,
    marginBottom: 60
  },
  redirectionText: {
    fontFamily: 'Avenir Next Bold'
  },
  textDesign: {
    color: '#ED7F10',
    textDecorationLine: 'underline'
  },


  container: {
    justifyContent: 'center',
    alignItems: 'center'
},
inputTitleContainer: {
    left: -width * 0.15,
    width: width * 0.93,
    height: 30,
    justifyContent: 'center',
    position: 'relative',
    left: 0,
    marginTop: 25
},
inputTitle: {
    fontSize: 16,
    fontFamily: 'Avenir Next Bold',
    color: '#303030'
},
addImageIcon: {
    position: 'absolute',
    bottom: 7,
    right: 1
},
addImageIconProfileScreen: {
    position: 'absolute',
    bottom: 2,
    right: 2
},
removeImageIconProfileScreen: {
    position: 'absolute',
    bottom: 2,
    right: 2
},
removeImageIcon: {
    position: 'absolute',
    bottom: 7,
    right: 1
},
twoImageContainer: {
    flexDirection: 'row',
    
},
oneImageContainer: {
    borderRadius: 20,
    width: width * 0.4,
    height: height * 0.25,
    marginTop: 10,
    marginRight: 4,
    marginLeft: 4
},
oneImageContainerProfileScreen: {
    borderRadius: 20,
    width: width * 0.24,
    height: height * 0.12,
    marginTop: 7,
    marginRight: width * 0.1
},
image: {
    width: width * 0.4,
    height: height * 0.24,
    borderWidth: 2,
    borderColor: '#848484',
    borderRadius: 20,
    
},
imageProfileScreen: {
    width: width * 0.24,
    height: height * 0.12,
    borderWidth: 2,
    borderColor: '#848484',
    borderRadius: 20,
},

panel: {
    width: width,
    height: height * 0.4,
    backgroundColor: '#ccc'
},

renderInnerComponent: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#eb5a6d'
},
textRenderInner: {
    color: '#fff'
}


})