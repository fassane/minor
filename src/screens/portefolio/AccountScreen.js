import React from 'react';
import { View, 
        Text,
        TouchableOpacity,
        StyleSheet,
        Dimensions,
        Image, 
        StatusBar} from 'react-native';
import AppLogoHeader from '../../components/AppLogoHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AppLogoFooter from '../../components/AppLogoFooter';




const AccountScreen = ({navigation}) => {


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

  return (

    <View style={styles.container}>

      <StatusBar backgroundColor='#ED7F10' barStyle='light-content' />

      <View style={styles.header}>
            <Icon 
                name='settings' 
                color='#fff' 
                size={30}
                onPress={() => navigation.goBack()}
                style={styles.headerLeftIcon} />

            <View style={styles.headerMoneyContainer}>
                <Text style={styles.moneyText}>100.000 F</Text>
                <TouchableOpacity>
                    <Feather name='eye-off' color='#fff' size={25} />
                </TouchableOpacity>
                
            </View>
            
        
        </View>

            
        
        <View style={styles.footer}>

            <View style={styles.qrCodeContainer}>
                <TouchableOpacity style={styles.qrCodeImageContainer}>
                    <Image source={require('../../assets/images/qr-code.png')} style={styles.qrCodeImage} />
                    <View style={styles.textContainer}>
                        <Ionicons name='camera' size={20} color='#303030'  />
                        <Text style={styles.text}>Scanner</Text>
                    </View>
                </TouchableOpacity>

            </View>

            <Image source={require('../../assets/images/gift.png')} style={styles.giftImage} />


            {/* <AppLogoFooter isForMainApp={true} /> */}

        </View>
    </View>

  )
}

export default AccountScreen

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ED7F10',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: width,
        height: height * 0.3,
        backgroundColor: '#ED7F10',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      headerLeftIcon: {
          position: 'absolute',
          left: width * 0.05,
          top: height * 0.03
      },
      headerMoneyContainer: {
        //borderWidth: 1,
        width: width * 0.6,
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: height * 0.04
      },
      moneyText: {
        fontFamily: 'Avenir Next Bold',
        fontSize: 23,
        color: '#fff',
        marginRight: 10
      },
      qrCodeContainer: {
        width: width * 0.8,
        height: height * 0.25,
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: '#8D4024',
        borderRadius: width * 0.1,
        position: 'absolute',
        top: - height * 0.16,
        justifyContent: 'center',
        alignItems: 'center'
      },
      qrCodeImageContainer: {
        width: width * 0.42,
        height: height * 0.21,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: width * 0.05
      },
      qrCodeImage: {
        width: width * 0.3,
        height: height * 0.15
      },
      textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 5
      },
      text: {
        fontFamily: 'Avenir Next Bold',
        color: '#303030'
      },
      footer: {
        width: width,
        height: height * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: width * 0.12,
        borderTopRightRadius: width * 0.12,
        backgroundColor: '#efefef'

      },
      giftImage: {
        width: width * 0.9,
        height: height * 0.2,
        borderRadius: width * 0.03,
        position: 'absolute',
        top: height * 0.16
      }
    
})