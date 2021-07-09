import React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import TabPM from '../Tab/tabPM';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const DashboardPM = ({navigation}) => {
   
  return(
      <View style={{ flex: 1 }}>
        <View 
          style={{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#039be5',
            paddingVertical:10
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:'#039be5',
              width:40, height:40,
              marginLeft:20
            }}
            onPress={()=>navigation.toggleDrawer()}
          >
            <Icon name="bars" size={40} color='white' />
          </TouchableOpacity>
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
            Dashboard
          </Text>
        </View>
      <ScrollView style={{flex:1, backgroundColor: 'white'}}>
        <View 
          style={{
            flexDirection:'row' ,
            backgroundColor:'#90caf9', 
            justifyContent:'space-between',
            height:50,
            marginHorizontal:20,
            paddingVertical:52,
            borderRadius:12,
            marginTop:20,
            alignItems:'center',
            paddingHorizontal:50
            }}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Jumlah Tim</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>5</Text>
        </View>

        <View 
          style={{
            flexDirection:'row' ,
            backgroundColor:'#90caf9', 
            justifyContent:'space-between',
            height:50,
            marginHorizontal:20,
            paddingVertical:52,
            borderRadius:12,
            marginTop:20,
            alignItems:'center',
            paddingHorizontal:50
            }}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Progress Tugas</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>50%</Text>
        </View>

        <View 
          style={{
            backgroundColor:'#90caf9', 
            justifyContent:'space-between',
            marginHorizontal:20,
            paddingVertical:52,
            borderRadius:12,
            marginTop:20,
            paddingHorizontal:50
            }}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Nama Project</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Nama Project</Text>
        </View>
        <View 
          style={{
            backgroundColor:'#90caf9', 
            marginHorizontal:20,
            height: 300,
            borderRadius:12,
            paddingLeft: 10,
            marginTop:20,
            }}>
          <Text style={{fontSize:20,fontWeight:'bold',paddingTop:20}}>Informasi Project</Text>
          <Text style={{fontSize:20,fontWeight:'bold',paddingTop:20}}>Nama Project : </Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Tanggal Mulai : </Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Tanggal Selesai :</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Progress : </Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Nama Client : </Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Project Manager : </Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Deskripsi : </Text>
        </View>


      </ScrollView>

    
      
</View>
    );
  };

export default DashboardPM;
