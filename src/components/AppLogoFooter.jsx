import React from 'react';
import { View, 
        Text,
        StyleSheet,
        Dimensions
         } from 'react-native';



const AppLogoFooter = ({isForMainApp}) => {
  return (
    <View style={ isForMainApp ? styles.logoContainerForMainApp : styles.logoContainer}>
      <Text style={styles.textMadeBy}>Made By</Text>
      <Text style={styles.textAuthor}>Assane</Text>
    </View>
  )
}

export default AppLogoFooter;

const {width, height} = Dimensions.get('screen')


const styles = StyleSheet.create({
    logoContainer: {
        width: width * 0.5,
        height: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        //top: height * 0.05,
        //bottom: height * 0.1
    },
    logoContainerForMainApp: {
      width: width * 0.5,
      height: height * 0.15,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: height * 0.1
  },
    textMadeBy: {
        fontFamily: 'Learning Curve Bold',
        fontSize: 25,
        color: '#303030'
    },
    textAuthor: {
        fontFamily: 'Avenir Next Bold',
        fontSize: 25
    }
})