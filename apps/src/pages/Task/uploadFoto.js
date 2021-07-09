import React, { useState } from 'react';
import { Image, StyleSheet, Text, View ,Button,PermissionsAndroid} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob'
import { Input } from 'react-native-elements';
import RNFS from 'react-native-fs';

const UploadFoto= ({navigation,route}) => {
  
   
  return(
    <View style={{ flex: 1 }}>

    <View style={{flex:1}}>
        <Text style={{
            marginVertical:30, 
            marginHorizontal:50, 
            justifyContent:'center', 
            textAlign:'center',
            fontSize:20, fontWeight:'bold'}}
            >
                Upload Foto Task
          </Text>
        <View>
              <View style={{
                  backgroundColor:'#bbdefb',
                  marginHorizontal: 20,
                  opacity:1,
              }}>
              <TextInput style={styles.input}
                  placeholder=""
              >{name}</TextInput>
              
              <TouchableOpacity style={styles.btnchoose} onPress={()=>openGallery()} > 
                  <Text style={{fontWeight:'bold',color:'white'}}>Choose File</Text>
              </TouchableOpacity>

              </View>
              
              <TouchableOpacity style={styles.btn} onPress={()=>sendData()} >
                  <Text style={{fontWeight:'bold',color:'white'}}>Upload</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btn} onPress={()=>down()} >
                  <Text style={{fontWeight:'bold',color:'white'}}>download</Text>
              </TouchableOpacity>
          </View>
    </View>
    
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

export default UploadFoto;

