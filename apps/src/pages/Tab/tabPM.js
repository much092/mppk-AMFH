import React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const TabPM = ({navigation}) => {
   
  return(
     
      <View style={{ backgroundColor: '#e57373',height: 54, flexDirection: 'row'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('DashboardPM')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/home.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Home</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('TeamPM')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/users.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Team</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Document')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/file-2.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Doc</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Task')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/book.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Task</Text>
        </View>

        
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('ProgressPM')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/progress.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Progress</Text>
        </View>

        
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('Feedback')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/chat-1.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Feedback</Text>
        </View>

        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity 
            style={{width:26,height:26}}
            onPress={()=>navigation.navigate('AccountPM')}>
            <Image  style={{width:26,height:26}} source={require('../../../src/icons/settings-1.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color:'#000',marginTop:4}}>Account</Text>
        </View>
      </View>
    
    );
  };

export default TabPM;
