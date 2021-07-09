import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';

const Stack = createStackNavigator();



const AddAlat = ({navigation}) => {
    
    
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
                  Input Data Alat
            </Text>
          <View>
              <TextInput style={styles.input}
                 placeholder="Nama Alat"
              ></TextInput>
              <TextInput style={styles.input}
                 placeholder="Jumlah"
              ></TextInput>

              <TouchableOpacity style={styles.btn}>
                  <Text style={{fontWeight:'bold'}}>Tambah</Text>
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
        backgroundColor:'#81c784',
        alignItems:'center',
    }
});
export default AddAlat;
