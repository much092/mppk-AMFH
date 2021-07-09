import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab/tabPM';

const Stack = createStackNavigator();

const DATA = [
    {
      id: '1',
      name: 'Nama Pegawai 1',
      title: 'Jabatan Pegawai 1',
    },
    {
      id: '2',
      name: 'Nama Pegawai 2',
      title: 'Jabatan Pegawai 2',
    },
    {
      id: '3',
      name: 'Nama Pegawai 3',
      title: 'Jabatan Pegawai 3',
    },
    {
      id: '4',
      name: 'Nama Pegawai 4',
      title: 'Jabatan Pegawai 4',
    },
    {
      id: '5',
      name: 'Nama Pegawai 5',
      title: 'Jabatan Pegawai 5',
    },
    {
      id: '6',
      name: 'Nama Pegawai 6',
      title: 'Jabatan Pegawai 6',
    },
  ];

const Item = ({ title,name }) => (
    <View 
    style={{
        flexDirection:'row' ,
            backgroundColor:'#b39ddb', 
            height:100,
            marginHorizontal:10,
            borderRadius:6,
            marginTop:5,
            marginBottom:5,
            alignItems:'center',
            paddingHorizontal:12

    }}>
      <Image style={{height:50,width:50}} source={require('../../../src/icons/user-1.png')}/>
      <View>
      <Text style={{fontSize:18, fontWeight:'bold', paddingLeft:10}}>{name}</Text>
      <Text style={{paddingLeft:10}}>{title}</Text>
      </View>
      
    </View>
  );

const DataPegawai = ({navigation}) => {
    
    const renderItem = ({ item }) => (
       
        <Item 
        name={item.name} 
        title={item.title}
        />
      );
  return(
      <View style={{ flex: 1 }}>
      <View>
          <TextInput 
            placeholder="Search..."
                style={{
                    borderWidth:1,
                    borderColor: 'black',
                    borderRadius: 28,
                    marginHorizontal: 10,
                    marginVertical:10,
                    paddingHorizontal:23
                }}
          >
          </TextInput>
      </View>

      <View style={{ flex: 1 }}>
           <FlatList
             data={DATA}
             renderItem={renderItem}
             keyExtractor={item => item.id}
           />
          <View
            style={{ 
                height:100, 
                width:100,
                position: 'absolute',
                top: 450, left:350,
                }}
          >
              <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.fab}>
              <Text style={styles.fabIcon}>+</Text>
              </TouchableOpacity>
          </View>
      </View>
        
      </View>
    );
  };

  
const styles=StyleSheet.create({
    fab: { 
     //   position: 'absolute', 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        }
});
export default DataPegawai;
