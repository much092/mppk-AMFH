import React from 'react';
import {Splash,Login,Dashboard} from '../pages';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const MyTabs = () =>{
    return(
        <Tab.Navigator>
        <Tab.Screen name="Dasboard" component={Dashboard} />
      </Tab.Navigator>
    );
};

export default MyTabs;