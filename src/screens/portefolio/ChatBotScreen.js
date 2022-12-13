import React, { useEffect, useState, useCallback } from 'react';
import { View, 
        Text,
        Image,
        StatusBar,
        StyleSheet,
        Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { GiftedChat } from 'react-native-gifted-chat';






const ChatBotScreen = ({navigation}) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])


  return (
    <>
      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <View style={styles.header}>
          <View style={styles.container}>
              <Ionicons  
                  name='arrow-back'
                  size={30}
                  color='#fff'
                  style={styles.headerTopBackIcon}
                  onPress={ () => navigation.goBack() }
              />
              <Text style={styles.headerTopText}>Chat</Text>
              <Ionicons  
                  name='close'
                  size={30}
                  color='#fff'
                  style={styles.headerCloseIcon}
                  onPress={ () => navigation.goBack() }
              />
          </View>
      </View>

      <View style={styles.footer}>

          {/* <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
          />  */}

      </View>
      
    </>
  )
}

export default ChatBotScreen;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    header: {
      width: width,
      height: height * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    
    },
    container: {
      width: width * 0.95,
      height: height * 0.08,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ED7F10',
      borderRadius: width * 0.1
    },
    headerTopBackIcon: {
        position: 'absolute',
        left: width * 0.05  
    },
    headerTopText: {
        fontFamily: 'Avenir Next Bold',
        fontSize: 22,
        color: '#fff'        
    },
    headerCloseIcon: {
      position: 'absolute',
      right: width * 0.05 
    },

    footer: {
      width: width,
      height: height * 0.7,
      backgroundColor: '#fff'
    }
})

