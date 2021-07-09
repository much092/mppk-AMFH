import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import TabP from '../Tab/TabP';

import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements';


const TeamP = ({navigation}) => {
    
   
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
            Team Project
          </Text>
        </View>


      <View style={{ flex: 1 }}>
          {
            list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{uri: l.avatar_url}} />
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          }
          
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
export default TeamP;
