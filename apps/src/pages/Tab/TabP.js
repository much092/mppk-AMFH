import React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const TabP = ({navigation}) => {
   
  return(
     
      <View style={{ backgroundColor: '#ff8a65',height: 54, flexDirection: 'row'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('DashboardP')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/home.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Home</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('DetailProject')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/file-2.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Project</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('ProgressP')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/progress.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Progress</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('TeamP')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/users.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Team</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('AccountP')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/settings-1.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Account</Text>
        </View>
      </View>
    
    );
  };

export default TabP;
