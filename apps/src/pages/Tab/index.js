import React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const Tab = ({navigation}) => {
   
  return(
     
      <View style={{ backgroundColor: '#82b1ff',height: 54, flexDirection: 'row'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Dashboard')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/home.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#545454',marginTop:4}}>Home</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Pegawai')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/user-1.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#545454',marginTop:4}}>Pegawai</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Client')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/users.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#545454',marginTop:4}}>Client</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Project')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/file-2.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#545454',marginTop:4}}>Project</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Pic')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/id-card.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#545454',marginTop:4}}>PIC</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Account')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/settings-1.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#545454',marginTop:4}}>Account</Text>
        </View>
      </View>
    
    );
  };

export default Tab;
