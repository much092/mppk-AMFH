import React,{ Component, useEffect,useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Dashboard from './index';
import DashboardP from './dashboardP';


const LinkDash = ({navigation}) => {
    const [status,setStatus] = useState("")
 
    const Boiler = async ()=>{
    const token = await AsyncStorage.getItem("token")
     fetch('http://mppk-app.herokuapp.com/',{
     headers:new Headers({
       Authorization:"Bearer "+token
     })
     }).then(res=>res.json())
     .then(data=>{
       console.log(data.status)
       setStatus(data.status)

     }
     )
    }
    useEffect(()=>{
      Boiler()
    },[])

    return(
        
        <Dashboard/>
        );
    };
  
  export default LinkDash;
  