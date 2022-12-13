import { useEffect } from "react";
import { View, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";
import AuthProvider from './src/navigation/AuthProvider';
import Routes from './src/navigation/Routes';

export default function App() {

  //Hide Splash screen on app load.
  useEffect(() => {
    SplashScreen.hide();
  });

  return(
    <AuthProvider>
        <Routes />
    </AuthProvider>
  )
}
