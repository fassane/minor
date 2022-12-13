import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from  '../components/Context';
import AppNav from './AppNav';
import AuthNav from './AuthNav'




const Routes = () => {

    const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
        {
            user == null ? <AuthNav /> : <AppNav />
        }
    </NavigationContainer>
  )
}

export default Routes