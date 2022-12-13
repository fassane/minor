import React from 'react';
import { View, 
        Text,
        Image,
        StyleSheet,
        StatusBar,
        Dimensions, 
        TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const PreChatBotScreen = ({navigation}) => {

  return (
    <>
      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <View style={styles.header}>
        <View style={styles.headerTop}>
            <Ionicons  
                name='arrow-back'
                size={30}
                color='#303030'
                style={styles.headerTopBackIcon}
                onPress={ () => navigation.goBack() }
            />
            <Text style={styles.headerTopText}>Contacter Dia</Text>
        </View>
        <Image source={require('../../assets/images/chat/contact.png')} style={styles.headerImage} />
        <View style={styles.headerTopUnderImageContainer}>
            <Text style={styles.headerTopUnderImageText}>Dia, votre assistance est là pour vous 24h/7</Text>
            <Text style={styles.headerTopUnderImageText}>Demander lui tout ce que vous voulez maintenant.</Text>
        </View>
      </View>


      <View style={styles.footer}>

        <View style={styles.container}>
            <View style={styles.footerTextContainer}>
                <Text style={styles.footerTextBold}>Parler avec Dia</Text>
                <Text></Text>
                <Text style={styles.footerText}>Tu as des questions sur un produit ou service ? C'est simple, tu peux m'en parler. Chat avec moi gratuitement </Text>
            </View>
            <Image source={require('../../assets/images/chat/chat.png')} style={styles.footerImage} />
        </View>

        <TouchableOpacity 
            onPress={() => navigation.navigate('chatbot')}
            style={styles.button}>
            <Text style={styles.buttonText}>Demarrer le chat</Text>
        </TouchableOpacity>

      </View>

    </>
  )
}

export default PreChatBotScreen

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    header: {
        width: width,
        height: height * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        //borderWidth: 1
    },
    headerTop: {
        height: height * 0.07,
        width: width,
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1
    },
    headerTopBackIcon: {
        position: 'absolute',
        left: width * 0.05
        
    },
    headerTopText: {
        fontFamily: 'Avenir Next Bold',
        fontSize: 20,
        color: '#303030'        
    },
    headerImage: {
        width: width * 0.95,
        height: height * 0.17,
        //borderWidth: 1,
        borderColor: '#000'
    },
    headerTopUnderImageContainer: {
        width: width * 0.95,
        height: height * 0.08,
        position: 'absolute',
        bottom: 0,
        //borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTopUnderImageText: {
        fontFamily: 'Avenir Next'
    },
    footer: {
        width: width,
        height: height * 0.65,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    container: {
        width: width,
        height: height * 0.3,
        //borderWidth: 1,
        position: 'absolute',
        top: 5
    },
    footerImage: {
        width: width * 0.5,
        height: height * 0.25,
        borderRadius: width * 0.1,
        position: 'absolute',
        right: 5,
        top: 10
    },
    footerTextContainer: {
        width: width * 0.45,
        height: height * 0.3,
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTextBold: {
        fontFamily: 'Avenir Next Bold',
        fontSize: 18,
        color: '#303030'  
    },
    footerText: {
        fontFamily: 'Avenir Next',
        marginLeft: 14
    },
    button: {
        position: 'relative',
        top: 20,
        padding: 15,
        backgroundColor: '#ED7F10',
        borderRadius: 30,
        elevation: 20
    },
    buttonText: {
        fontFamily: 'Avenir Next Bold',
        fontSize: 16,
        color: '#fff'
    }
})
