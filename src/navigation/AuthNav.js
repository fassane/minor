import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const AuthStack = createNativeStackNavigator();


const AuthNav = ({navigation}) => (
    
    <AuthStack.Navigator
        screenOptions={{ headerShown: false }}
    >
        <AuthStack.Screen name="login" component={LoginScreen} />
        <AuthStack.Screen name="register" component={RegisterScreen} />
    </AuthStack.Navigator>
   
)
export default AuthNav;