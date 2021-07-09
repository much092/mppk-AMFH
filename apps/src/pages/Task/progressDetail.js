import React, {Component, useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
import Animated from 'react-native-reanimated';

class ProgressDetail extends Component{

  state = {
    status: '',
    idTask: this.props.route.params.idTask,
    idproject: this.props.route.params.id,
    status: this.props.route.params.status,
    list: [],
    listTask: [],
    loading: true,
    modalVisible: false,
  }

  componentDidMount(){
    this.fetchData();
    console.log(this.state.idTask)
  }

  
  fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataUserTask/'+this.state.idTask)
    .then(res=>res.json())
    .then(data=>{
        this.setState({filteredDataSource:data});
        this.setState({masterDataSource:data});
        this.setState({loading:false})
    })
  }

  sendData = async (props)=>{
    const { navigation } = this.props;
    fetch("http://mppk-app.herokuapp.com/update-data-task-approved",{
    
      method:"POST",
      headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "_id":this.state.idTask,
      "status":"done",
      "approved":"ok",
    })
    })
    .then(res=>res.json())
    .then(data=>{
        if(!data.error){
            this.setState({modalVisible:false})
            Alert.alert('Approved !!!')
      //      navigation.replace('ProgressPM',{id:this.state.idproject})
          
        }
        else{
            Alert.alert(data.error)
        }
      
    })
  }
 
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
                <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Progress Detail</Text>
              </View>
      
            <SafeAreaView style={{ flex: 1 }}>
              
              <FlatList
                    renderItem={({item})=>(
                      <TouchableOpacity onPress={() => {navigation.navigate('DetailPegawai',{id:item.user._id,status:item.user.status})}} >
                      <View 
                      style={{
                          flexDirection:'row' ,
                          //justifyContent:'space-between',
                          borderBottomWidth:0,
                          backgroundColor:'white',
                          paddingVertical:10,
                          paddingHorizontal:20,
                          borderRadius:6,
                          alignItems:'center', 
                  
                      }}>
                        
                        <Image source={{uri:item.user.image}} style={{width:50,height:50,borderRadius:25}}></Image>
                        
                            <View style={{width:'60%'}}>
                            
                            <Text style={{fontSize:16, paddingLeft:10}}>{item.user.nama}</Text>
                            <Text style={{paddingLeft:10,color:'grey'}}>{item.user.email}</Text>
                            {
                            item.user.status === 'karyawan'?(
                                <Text style={{paddingLeft:10,color:'grey'}}>Pekerja</Text>
                            ):(
                                <Text style={{paddingLeft:10,color:'grey'}}>mandor</Text>
                            )
                            }

                            
                            </View>
                            <View >
                            {
                                item.status === 'done'?(
                                    <Text style={{fontSize:16, paddingLeft:0}}>{item.status}</Text>
                                ):
                                item.status === 'In Progress'?(
                                    <Text style={{fontSize:16, paddingLeft:0, textAlign:'center'}}>{item.status}</Text>
                                ):(
                                    <Text style={{fontSize:16, textAlign:'center'}}>Belum dikerjakan</Text>
                                )
                            }
                            </View>
                        </View>
                     
                      </TouchableOpacity>
                    )}
                    onRefresh={this.fetchData}
                    refreshing={this.state.loading}
                    data={this.state.filteredDataSource}
                    keyExtractor={(Item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparatorView}
              />
              <View>
                  <TouchableOpacity style={styles.btn} onPress={()=>this.sendData()}>
                      <Text style={{fontWeight:'bold',color:"white"}}>Approved</Text>
                  </TouchableOpacity>
              </View>
              
            </SafeAreaView>
            
               
            </View>
    )
  }
}

const styles=StyleSheet.create({
    btn:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#0d47a1',
        alignItems:'center',
    },
});

export default   ProgressDetail;
