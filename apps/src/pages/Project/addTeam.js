import React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab/tabPM';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const Stack = createStackNavigator();


const AddTeam = ({navigation}) => {
   
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
                  Input Data Team
            </Text>
          <View>
                <Input
                    placeholder='Nama'
                    leftIcon={
                        <Icon
                        name='user'
                        size={24}
                        color='black'
                        />
                    }
                />

              <TouchableOpacity style={styles.btn}>
                  <Text style={{fontWeight:'bold',color:'white'}}>Tambah</Text>
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
    }
});
export default AddTeam;

