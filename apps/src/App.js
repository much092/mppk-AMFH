import { NavigationContainer,useNavigation } from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Router from './router';

import Routerr from './router/';
//import MyTabs from './router/tab';

const App = () => {
    return(
        <NavigationContainer>
            <Router/>
            
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
   scrolView:{
       backgroundColor: Colors.lighter,
   } ,
});

export default App;