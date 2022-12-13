import React, {useContext, useState} from 'react';
import { View, 
      Text,
      Image,
      StyleSheet,
      ScrollView,
      StatusBar,
      ToastAndroid,
      TouchableOpacity,
      Dimensions } from 'react-native';
import Input from '../../components/Input';
import { AuthContext } from '../../components/Context';
import AppLogoFooter from '../../components/AppLogoFooter';
 



const LoginScreen = ({navigation}) => {

  const { Login } = useContext(AuthContext)

  const [data, setData] = useState({
    number: '',
    password: '',
    isTextInputChange: false,
    secureTextEntry: true,
    isValidNumber: true,
    isValidPassword: true
  });

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

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
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
        <Text style={styles.redirectionText}>{text}&nbsp;<Text style={styles.textDesign}>Je m'inscris</Text> </Text>
      </TouchableOpacity>
    )
  }

 console.log('number: ',data.number)
 console.log('password: ', data.password)

  const handleValidUser = (value) => {
    if(value.trim().lengh >= 4) {
      setData({
        ...data,
        isValidNumber: true
      })
    }
    else {
      setData({
        ...data,
        isValidNumber: false
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

  return (

    <>
      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <ScrollView style={styles.scrollViewContainer}>

        <View style={styles.container}>

          <Image source={require('../../assets/images/login.png')} style={styles.headerImage}  />
          <Text style={styles.headerText}>Ravi de vous revoir !</Text>

          <Input 
            amIWhantInputWithAllBorder={true}
            isThereLeftIcon={data.isValidNumber ? false : true}
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
            data.isValidNumber ? null 
            :
            ToastAndroid.showWithGravityAndOffset(
              "Saisir un numéro valide",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            ) 
          }

          <Text></Text>

          <Input 
            amIWhantInputWithAllBorder={true}
            isThereLeftIcon={true}
            placeholder='Mot de passe'
            leftIconName='lock'
            iconSize={28}
            value={data.password}
            leftIconColor='#ED7F10'
            rightIconName={data.secureTextEntry ? 'eye-off' : 'eye'}
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(value) => handlePasswordChange(value)}
            onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
            onPressRightIcon={updateSecureTextEntry}
          />
          {
            data.isValidPassword ? null 
            : 
            ToastAndroid.showWithGravityAndOffset(
              "Mot de passe invalide",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            )
          }
          <SubmitButton text='Je me connecte' onPress={() => Login(data.number, data.password)}  />

          <RedirectionText text="je n'ai pas de compte." route='register' />

          {/* <AppLogoFooter  />  */}

        </View>

      </ScrollView>

      
    </>
  )
}

export default LoginScreen;

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
    borderRadius: width * 0.1,
    
  },
  headerText: {
    fontFamily: 'Learning Curve Bold',
    marginBottom: height * 0.04,
    fontSize: 40,
    color: '#303030',
    marginTop: 30
  },
  footer: {
    width: width,
    height: height * 0.75,
    //justifyContent: 'center',
    alignItems: 'center'
  },
  footerContainer: {
    top: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButtonContainer: {
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: '#ED7F10',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'transparent',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    fontFamily: 'Avenir Next Bold',
    fontSize: 24,
    color: 'white'
  },
  redirectionTextContainer: {
    marginTop: 20
  },
  textDesign: {
    color: '#ED7F10',
    textDecorationLine: 'underline'
  },
  redirectionText: {
    fontFamily: 'Avenir Next Bold'
  }

});