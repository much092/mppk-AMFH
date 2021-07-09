import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView,Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

class Module extends Component{

  state = {
    idproject: this.props.route.params.id,
    status: this.props.route.params.status,
    namaKP: '',
    list: [],
    loading: true,
  }  

  componentDidMount(){
    this.fetchData();
  }
    
  fetchData = async (props)=>{
      fetch("http://mppk-app.herokuapp.com/getDataModule/"+this.state.idproject)
      .then(res=>res.json())
      .then(data=>{
            this.setState({list:data})
            this.setState({loading:false})
      })
  }
 
  sendData = async (props)=>{
    const { navigation } = this.props;
    
    fetch("http://mppk-app.herokuapp.com/send-data-module",{
    
      method:"POST",
      headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "kategori_pekerjaan":this.state.namaKP,
      "idproject":this.state.idproject,
    })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(!data.error){
          //  setListPegawai()
            Alert.alert('Data Tersimpan')
            navigation.replace('Module',{id:this.state.idproject})
        }
        else{
            Alert.alert(data.error)
        }
      
    })
  }

  
  renderSeparatorView = () => {
    return (
      <View style={{
          height: 1, 
          width: "100%",
          backgroundColor: "#CEDCCE",
        }}
      />
    );
  };

  render(){
    const { navigation } = this.props;
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
              onPress={()=>navigation.goBack()}
          >
            <Icon name="arrow-left" size={30} color='white'/>
          </TouchableOpacity>
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Module</Text>
          </View>
          
                             
            {
              this.state.status==='yes'?(
                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 16,
                    height: '30%',
                    justifyContent:'center'
                  }}
                >
                  <View>
                          <Input
                                placeholder='Nama Kategori Pekerjaan'
                                value={this.state.namaKP}
                                onChangeText={(text)=>this.setState({namaKP:text})}
                                placeholderTextColor='black'
                                color='black'
                            />
                          <TouchableOpacity style={{paddingVertical:13, backgroundColor:'#0d47a1',borderRadius:25}}
                            onPress={()=>{this.sendData()}}
                                >
                                <Text
                                    style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        textAlign: 'center'
                                    }}
                                    >
                                Simpan
                                </Text>
                          </TouchableOpacity>
                    </View>
                  </View>
           
              ):(
                <></>
              )
            }
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
                data={this.state.list}
                renderItem={({item})=>(
                  
                      <TouchableOpacity >
                      <View 
                      style={{
                          flexDirection:'row' ,
                          borderBottomWidth:0,
                          backgroundColor:'white',
                          paddingVertical:10,
                          borderRadius:6,
                          alignItems:'center',
                    
                      }}>
                        <Avatar></Avatar>
                        <View>
                        
                        <Text style={{fontSize:16, paddingLeft:10}}>{item.kategori_pekerjaan}</Text>
                        </View>
                        
                      </View>
                      </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                onRefresh={()=>this.fetchData()}
                refreshing={this.state.loading}
                ItemSeparatorComponent={this.renderSeparatorView}
          />
        
        </SafeAreaView> 
        
        </View>
    )
  }
}

const styles=StyleSheet.create({
    fab: { 
     //   position: 'absolute', 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        }
});
export default Module;
