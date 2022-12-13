import React from 'react';
import { View, 
        Text,
        StyleSheet,
        StatusBar,
        TouchableOpacity,
        Dimensions } from 'react-native';
import AppLogoHeader from '../../components/AppLogoHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLogoFooter from '../../components/AppLogoFooter';


const HomeScreen = ({navigation}) => {

    const Icon = ({name, color, size, style, redirection}) => {
        return (
        <TouchableOpacity style={style} onPress={() => navigation.navigate(redirection)}>
            <Ionicons 
                name={name}
                color={color}
                size={size}
            />
        </TouchableOpacity>
        )
    }

    const FloatedIcon = ({ name, redirection }) => {
        return(
        <TouchableOpacity 
        onPress={() => navigation.navigate(redirection)}
            style={styles.floatedIcon}>
            <Ionicons  
                name={name}
                size={30}
                color='#fff'
            />
        </TouchableOpacity>
        )
    }


    const HomeItem = ({iconName, iconSize, iconColor, style, text, redirection}) => {
        return(
            <TouchableOpacity style={style} onPress={() => navigation.navigate(redirection)}>
                <Ionicons 
                    name={iconName}
                    size={iconSize}
                    color={iconColor} />
                <Text style={styles.homeItemText}>{text}</Text>
            </TouchableOpacity>
        )
    }



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
                name='options' 
                color='#303030' 
                size={30} 
                redirection='portefolio' 
                style={styles.headerRightIcon} />
        </View>

        <View style={styles.footer}>
           
           <View style={styles.footerContainer}>
                <View style={styles.twoItemContainer}>
                        <HomeItem 
                            iconName='card'
                            iconSize={70}
                            iconColor='#EFD807'
                            text='Solde'
                            redirection='portefolio'
                            style={styles.homeItem1}
                        />
                        <HomeItem 
                            iconName='person'
                            iconSize={70}
                            iconColor='#7E6EF9'
                            text='Compte'
                            redirection='portefolio'
                            style={styles.homeItem2}
                        />
                </View>
                <View style={styles.twoItemContainer}>
                        <HomeItem 
                            iconName='arrow-down-circle'
                            iconSize={70}
                            iconColor='#4CA66B'
                            text='Dépôt'
                            redirection='portefolio'
                            style={styles.homeItem3}
                        />
                        <HomeItem 
                            iconName='arrow-up-circle'
                            iconSize={70}
                            iconColor='#ED7F10'
                            text='Retrait'
                            redirection='portefolio'
                            style={styles.homeItem4}
                        />
                </View>
                <View style={styles.twoItemContainer}>
                        <HomeItem 
                            iconName='archive'
                            iconSize={70}
                            iconColor='#eb5a6d'
                            text='Échange'
                            redirection='portefolio'
                            style={styles.homeItem5}
                        />
                        <HomeItem 
                            iconName='build'
                            iconSize={70}
                            iconColor='#848484'
                            text='Extras'
                            redirection='portefolio'
                            style={styles.homeItem6}
                        />
                </View>

           </View>

           {/* <FloatedIcon name='chatbubble-ellipses' redirection='prechatbot' /> */}

           <AppLogoFooter isForMainApp={true} />
           
        </View>
      
      
    </>
  )
}

export default HomeScreen

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 52,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30
    },
    headerLeftIcon: {
        position: 'absolute',
        left: 12,
        top: 10
    },
    headerRightIcon: {
        position: 'absolute',
        right: 12,
        top: 10
    },
    logo: {
        width: width * 0.5,
        height: '100%'
    },
    footer: {
        width: width,
        height: height - 52,
        justifyContent: 'center',
        alignItems: 'center',

    },
    footerContainer: {
        position: 'absolute',
        top: (height - 52) * 0.015
    },
    homeItem1: {
        width: width * 0.4,
        height: height * 0.21,
        borderWidth: 3,
        borderColor: '#EFD807',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginRight: width * 0.02,
        marginLeft: width * 0.02
    },
    homeItem2: {
        width: width * 0.4,
        height: height * 0.21,
        borderWidth: 3,
        borderColor: '#7E6EF9',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
        marginRight: width * 0.02,
        marginLeft: width * 0.02
    },
    homeItem3: {
        width: width * 0.4,
        height: height * 0.21,
        borderWidth: 3,
        borderColor: '#4CA66B',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
        marginRight: width * 0.02,
        marginLeft: width * 0.02
    },
    homeItem4: {
        width: width * 0.4,
        height: height * 0.21,
        borderWidth: 3,
        borderColor: '#ED7F10',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
        marginRight: width * 0.02,
        marginLeft: width * 0.02
    },
    homeItem5: {
        width: width * 0.4,
        height: height * 0.21,
        borderWidth: 3,
        borderColor: '#eb5a6d',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
        marginRight: width * 0.02,
        marginLeft: width * 0.02
    },
    homeItem6: {
        width: width * 0.4,
        height: height * 0.21,
        borderWidth: 3,
        borderColor: '#848484',
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 30,
        marginRight: width * 0.02,
        marginLeft: width * 0.02
    },
    twoItemContainer: {
        flexDirection: 'row',
        marginBottom: 15
    },
    homeItemText: {
        fontFamily: 'Avenir Next Bold',
        fontSize: 18
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
    }
})