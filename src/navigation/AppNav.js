import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/home/HomeScreen";
import ExchangeScreen from "../screens/exchange/ExchangeScreen";
import PortefolioScreen from "../screens/portefolio/PortefolioScreen";
import PreChatBotScreen from "../screens/portefolio/PreChatBotScreen";
import ChatBotScreen from "../screens/portefolio/ChatBotScreen";
import AccountScreen from "../screens/portefolio/AccountScreen";


const {width, height} = Dimensions.get('screen');


const AppTab = createBottomTabNavigator();
const PorteStack = createNativeStackNavigator();




const PorteNav = () => (
    <PorteStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <PorteStack.Screen name="main" component={PortefolioScreen}  />
        <PorteStack.Screen name='prechatbot' component={PreChatBotScreen} />
        <PorteStack.Screen name='chatbot' component={ChatBotScreen}  />
        <PorteStack.Screen name="account"  component={AccountScreen}  />
    </PorteStack.Navigator>
)





const AppNav = () => (
    
    <AppTab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
  
              if (route.name === 'home') {
                iconName = focused ? 'home' : 'home-outline';
              } 
              
              else if (route.name === 'portefolio') {
                iconName = focused ? 'wallet' : 'wallet-outline';
              }
  
              return <Ionicons name={iconName} size={30} color={color} />;
            },
            tabBarActiveTintColor: '#ED7F10',
            tabBarInactiveTintColor: '#303030',
            headerShown: false ,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#fff',
              borderColor: '#ED7F10',
              width: width * 0.96,
              position: 'absolute',
              left: width * 0.02,
              bottom: 5,
              borderRadius: width * 0.4,
              elevation: 40
            }
          })
          
        }
    >
        
        <AppTab.Screen name='home' component={HomeScreen} />

        <AppTab.Screen name='exchange' component={ExchangeScreen} 
          options={{
            tabBarIconStyle: {
              borderWidth: 1,
              width: width * 0.17,
              height: height * 0.08,
              position: 'absolute',
              backgroundColor: '#ED7F10',
              bottom: height * 0.01,
              borderColor: '#ED7F10',
              borderWidth: 3,
              borderRadius: width * 0.15,
              elevation: 20
            },
            tabBarIcon: () => {
              return <Ionicons name='aperture' size={35} color='#fff' />
            }
          }}
          
        />
        <AppTab.Screen name='portefolio' component={PorteNav} />
    </AppTab.Navigator>
   
)

export default AppNav;

