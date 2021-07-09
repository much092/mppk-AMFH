import React,{ Component, useEffect,useState } from 'react';
import { Button, Image, StyleSheet, Text, View,BackHandler,Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


import karyawan from '../../../src/icons/laborers.png';
import clients from '../../../src/icons/group.png';
import proyek from '../../../src/icons/project2.png';

class Dashboard extends Component{
  state = {
    pegawai: '',
    client: '',
    project: '',
    feedback: [],
 }

 componentDidMount(){
    this.fetchData();
    this.fetchDataFeedback();
 }

  fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getCount')
    .then(res=>res.json())
    .then(data=>{
    //  console.log(data)
          this.setState({pegawai:data.pegawai})
          this.setState({client:data.client})
          this.setState({project:data.project[0].count})
      
    })
 }
 
 fetchDataFeedback = async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getDataFeedback')
  .then(res=>res.json())
  .then(data=>{
        this.setState({feedback:data})
        //console.log(data)
  })
}
  render(){
    

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
          onPress={()=>this.props.navigation.toggleDrawer()}
        >
          <Icon name="bars" size={40} color='white' />
        </TouchableOpacity>
        <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Dashboard</Text>
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
          <Image source={karyawan} style={{height:50,width:50}}/>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Pegawai</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.pegawai}</Text>
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
          <Image source={clients} style={{color:'white',height:50,width:50}}/>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Client</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.client}</Text>
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
          <Image source={proyek} style={{color:'white',height:50,width:50}}/>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Project</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.project}</Text>
        </View>

        <View 
          style={{
            flexDirection:'row' ,
            backgroundColor:'#0d47a1', 
            justifyContent:'space-between',
            height:50,
            marginHorizontal:20,
            borderRadius:4,
            marginTop:20,
            marginBottom:20,
            alignItems:'center',
            paddingHorizontal:6
            }}>
          <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>FeedBack</Text>
        </View>
        {
          this.state.feedback.map((feed)=>(
            <View 
                style={{
                  backgroundColor:'#90caf9', 
                  marginHorizontal:20,
                  borderRadius:4,
                  paddingHorizontal:20,
                  paddingVertical:52,
                  marginBottom:20
                  }}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>{feed.user.nama}</Text>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Task : {feed.task.nama_task}</Text>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Tanggal : {feed.date}</Text>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Feedback : {feed.feedback}</Text>

              </View>
          ))
        }
        
      </ScrollView>

     
</View>
    )
  }
}



export default Dashboard;

const style=StyleSheet.create({

});