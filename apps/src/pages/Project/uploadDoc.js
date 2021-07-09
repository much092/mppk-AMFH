import React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, Text, View ,TouchableHighlight} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab/tabPM';
import  ImagePicker from 'react-native-image-picker';

const UploadDoc = ({navigation}) => {
   
  return(
   <View>
       
   </View>
    );
  };

  
  
const styles=StyleSheet.create({
    input: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,

        },
    btn:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#0d47a1',
        alignItems:'center',
    },
    
    btnchoose:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#1565c0',
        alignItems:'center',
    }
});

export default UploadDoc;

