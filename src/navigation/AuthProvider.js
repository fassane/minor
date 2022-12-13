import React, {useState} from 'react'
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/Context';
import { 
        server,
        HOST, 
        LOGIN, 
        REGISTER, 
        LOGOUT } 
        from '../server/server';



const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null); 

    console.log('user: ',user)

  return (
    <AuthContext.Provider
        value={{
            user,
            //Nouvelle inscription a l'application
            Register: (name, number, password, photo ) => {
                server.post(HOST + REGISTER, {
                    name,
                    number,
                    password,
                    photo
                    //password_confirmation,
                    //photo
                })
                .then(response => {
                    const userResponse = {
                        message: response.data.status,
                        access_token: response.data.access_token,
                        refresh_token: response.data.refresh_token,
                        number: response.data.number,
                        name: response.data.name,
                        photo: response.data.photo
                    }
                    setUser(userResponse);
                    AsyncStorage.getItem('user', JSON.parse(userResponse));

                    console.log("reponse inscript "+ userResponse);
                    // Message toast android
                    ToastAndroid.showWithGravity(
                        userResponse.message,
                        //"Inscription reussie, bienvenue",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                })
                .catch(error => {
                    //console.log(error.response.data);
                    alert(error.response.data.number);
                    alert(error.response.data.name);
                    alert(error.response.data.password);
                    //Alert.alert("Inscription a l'application", 
                    //    error.response.data.email, [
                    //      {text: "OK"}
                    //    ]);
                    alert(error.response.data.email);
                })
            },
            
            // Connexion a l'application
            Login: (number, password) => {
                server.post( HOST + LOGIN, {
                    number,
                    password,
                })
                .then(response => {
                    const userResponse = {
                        access_token: response.data.access_token,
                        refresh_token: response.data.refresh_token,
                        message: response.data.status,
                        number: response.data.number,
                        name: response.data.name
                    }
                    setUser(userResponse);
                    AsyncStorage.getItem('user', JSON.parse(userResponse));
                    console.log("reponse connexion "+ userResponse);
                    // Message toast android
                    ToastAndroid.showWithGravity(
                        userResponse.message,
                        "Connecte avec succes",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                })
                .catch(error => {
                    console.log('login error: ',error.message);
                    //alert(error.message);
                    //alert(error.response.data.email);
                    //alert(error.response.data.error);
                })
            },

            //Deconnexion de l'applcation
            Logout: () => {
                server.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`
                server.post(HOST + LOGOUT)
                .then(response => {
                    console.log("logout: ", response.data );
                    setUser(null);
                    AsyncStorage.removeItem('user');
                    ToastAndroid.showWithGravity(
                        //response.data.message,
                        "Logging out successded",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                })
                .catch(error => {
                    console.log("error deconnexion "+ error.response.message);

                });

            }

            
            
        }}
    >

        {children}

    </AuthContext.Provider>
  )

}

export default AuthProvider