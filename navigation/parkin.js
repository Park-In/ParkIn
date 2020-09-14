import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from '../screens/map.js';
import ProfileScreen from '../screens/profile.js';
import AuthScreen from '../screens/auth.js';
import StartupScreen from '../screens/startup.js'

const Drawer = createDrawerNavigator();
const RootStack = createDrawerNavigator();

function MyDrawer(props) {

    // const DrawerComp = <Drawer.Navigator >
    //                     <Drawer.Screen name='Auth' component={AuthScreen}/>
    //                     <Drawer.Screen name='Map' component={MapScreen}/>
    //                     <Drawer.Screen name='Profike' component={ProfileScreen} />
    //                 </Drawer.Navigator>

    return (

        <Drawer.Navigator >
            {/* <Drawer.Screen name='Startup' component={StartupScreen} /> */}
            <Drawer.Screen name='Auth' component={AuthScreen} />
            <Drawer.Screen name='Map' component={MapScreen} />
            <Drawer.Screen name='Profike' component={ProfileScreen} />
        </Drawer.Navigator>
        // <DrawerComp />
        // <RootStack.Navigator>
        //     {!location ?
        //     <RootStack.Screen name='Auth' component={}/>
        //     :
        //     <RootStack.Screen name='Main' component={}/>
        //     }
        // </RootStack.Navigator>
    )
}

export default MyDrawer;