import React, {Component, useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  ListItem, Overlay } from 'react-native-elements';
import Animated, { color } from 'react-native-reanimated';

class TaskAdmin extends Component{
  
  state = {
    status: '',
    idproject: this.props.route.params.id,
    list: [],
    listTask: [],
    loading: true,
  }

  componentDidMount(){
    this.fetchData();
    this.fetchDataTask();
  }

  fetchDataTask= async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataAllTask/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
        this.setState({listTask:data})
        this.setState({loading:false})
        console.log(data)
    })
  }
  fetchData = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataModule/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({list:data})
      this.setState({loading:false})
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
           Task
          </Text>
        </View>

        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                    data={this.state.list}
                    renderItem={({item})=>(
                      <View>
                        <View 
                            style={{
                                flexDirection:'row' ,
                                borderBottomWidth:0,
                                backgroundColor:'white',
                                paddingVertical:10,
                                paddingHorizontal:20,
                                borderRadius:6,
                                alignItems:'center',
                      
                            }}>
                              
                              <View>
                              <Text style={{fontSize:16, paddingLeft:10,fontWeight:'bold'}}>Kategori Pekerjaan: {item.kategori_pekerjaan}</Text>
                                {
                                  this.state.listTask.map((l)=>(
                                    <View >
                                         { l.module.kategori_pekerjaan === item.kategori_pekerjaan ? (
                                    <View style={{
                                    
                                  }}>
                                    
                             <TouchableOpacity  
                                    style={{
                                            backgroundColor:'black',
                                            flexDirection:'row' ,
                                            justifyContent:'space-between',
                                            borderBottomWidth:1,
                                            backgroundColor:'white',
                                            paddingVertical:10,
                                            borderRadius:6,
                                            alignItems:'center',
                                                      }}>
                                    <View style={{width:'5%'}}>
                                    
                                    </View>
                                    <View style={{width:'100%',}}>
                                            <View style={{flexDirection:'row'}}>
                                              <Text style={styles.text}>Nama Task</Text>
                                              <Text style={styles.titikdua}>:</Text>
                                              <Text style={styles.subtext}>{l.nama_task}</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                              <Text style={styles.text}>Spesifikasi</Text>
                                              <Text style={styles.titikdua}>:</Text>
                                              <Text style={styles.subtext}>{l.spesifikasi} </Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                              <Text style={styles.text}>Jadwal</Text>
                                              <Text style={styles.titikdua}>:</Text>
                                              <Text style={styles.subtext}>{l.tglMulai} - {l.tglSelesai}</Text>
                                            </View>
                                           
                                            <View style={{flexDirection:'row'}}>
                                              <Text style={styles.text}>Status</Text>
                                              <Text style={styles.titikdua}>:</Text>
                                              {
                                                l.status==='none'?(
                                                  <Text style={styles.subtext}>Belum dikerjakan</Text>
                                                ):
                                                l.status==='done' ?(
                                                  <Text style={{fontWeight:'bold', color: "grey",fontSize: 16,textAlign:'left',marginVertical:5,marginLeft:5,width:'50%'}}>Selesai
                                                  {l.approved === 'ok' ? (
                                                    <Icon name="check" size={20} color="#0d47a1" style={{paddingLeft:40}}></Icon> 
                                                    ):(
                                                      <Icon name="" size={23}></Icon> 
                                                    )}
                                                  </Text>
                                                ):(
                                                  <Text style={{fontWeight:'bold', color: "grey",fontSize: 16,textAlign:'left',marginVertical:5,marginLeft:5,width:'50%'}}>Sedang dikerjakan
                                                  {l.approved === 'ok' ? (
                                                    <Icon name="check" size={20} color="#0d47a1" style={{paddingLeft:40}}></Icon> 
                                                    ):(
                                                      <Icon name="" size={23}></Icon> 
                                                    )}
                                                  </Text>
                                                )
                                              }
                                            </View>
                                    </View>
                                   
                              </TouchableOpacity>        
                                  </View>          
                                         ):(
                                               <></>
                                         )
                                }
                                
                              </View>  
                                  ))
                                }
                              </View>
                           
                            </View>
                          </View>
                    )}
                    keyExtractor={item => item._id}
                    onRefresh={this.fetchDataTask}
                    refreshing={this.state.loading}
              />
            
            </SafeAreaView> 
            
            
        </View>
          
        
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
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        },
    header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  modalView: {
   // marginLeft:'40%',marginBottom:'120%',
    width:200,
    height:100,
    backgroundColor: "white",
    borderRadius: 20,
    //padding: 35,
    justifyContent:'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  btnoverlay:{
    backgroundColor:'white',height:30,width:100,justifyContent:'center',
    marginVertical:5
  },
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,
    marginHorizontal:20,width:'35%'
  },
  titikdua: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5
  },
  subtext: {
    color: "grey",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,marginLeft:5,width:'50%'
  },
});

export default TaskAdmin;
