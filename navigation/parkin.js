import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from '../screens/map.js';
import ProfileScreen from '../screens/profile.js';
import StartupScreen from '../screens/startup.js';
import SplashScreen from '../screens/splash.js';
import SignInScreen from '../screens/signin.js';
import SignUpScreen from '../screens/signup.js';
import { DrawerContent } from '../screens/drawer-content.js'



const Drawer = createDrawerNavigator();
const RootStack = createDrawerNavigator();

function MyDrawer(props) {

    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name='Startup' component={StartupScreen} />
            <Drawer.Screen name='Splash' component={SplashScreen} />
            <Drawer.Screen name='Signup' component={SignUpScreen} />
            <Drawer.Screen name='Signin' component={SignInScreen} />
            <Drawer.Screen name='Map' component={MapScreen} />
            <Drawer.Screen name='Profile' component={ProfileScreen} />
        </Drawer.Navigator>
    )
}

export default MyDrawer;