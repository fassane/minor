import React from 'react'
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    Dimensions } from 'react-native'



const AppLogoHeader = ({logoColorWhite, isUseForMainAppScreen}) => {
  return (
    <View style={styles.container}>
        {
            logoColorWhite ? 
            (
                <>
                <Image 
                    source={require('../assets/images/logow.png')} 
                    style={isUseForMainAppScreen ? styles.logoImageForMainApp : styles.logoImage} />
                <Text 
                    style={isUseForMainAppScreen ? styles.logoTextWhiteForMainApp : styles.logoTextWhite}>
                    Minor
                </Text>
                </>
            ) 
            : 
            (
                <>
                <Image 
                    source={require('../assets/images/logoo.png')} 
                    style={isUseForMainAppScreen ? styles.logoImageForMainApp : styles.logoImage} />
                <Text 
                    style={isUseForMainAppScreen ? styles.logoTextOrangeForMainApp : styles.logoTextOrange}>
                    Minor
                </Text>
                </>
            )
        }
    </View>
  )
}

export default AppLogoHeader

const {width, height} = Dimensions.get('screen')

const styles = StyleSheet.create({
    container: {
        width: width * 0.6,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    logoImage: {
        width: 43,
        height: 43,
        marginTop: 2
    },
    logoTextWhite: {
        color: '#ffffff',
        fontSize: 45,
        fontFamily: 'Avenir Next Bold',
    },
    logoTextOrange: {
        color: '#ED7F10',
        fontSize: 45,
        fontFamily: 'Avenir Next Bold',
    },
    logoImageForMainApp: {
        width: 25,
        height: 25,
    },
    logoTextWhiteForMainApp: {
        color: '#ffffff',
        fontSize: 25,
        fontFamily: 'Avenir Next Bold',
    },
    logoTextOrangeForMainApp: {
        color: '#ED7F10',
        fontSize: 25,
        fontFamily: 'Avenir Next Bold',
    }

})