import React,{ useState,useEffect } from 'react';
import { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {  TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Overlay } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class DetailClient extends Component{
  state = {
    img:[], 
    data: [],
    nama: '',
    telp: '',
    alamat: '',
    ktp: '',
    perusahaan: '',
    idClient: this.props.route.params.id,
    list: [],
    dialogVisible: false,
  }
  
  componentDidMount(){
    this.fetchData();
    this.fetchDataProject();
    console.log(this.state.idClient)
  }

  fetchData = async (props)=>{
      fetch('http://mppk-app.herokuapp.com/getDataClientById/'+this.state.idClient)
      .then(res=>res.json())
      .then(data=>{
        //console.log(data)
        this.setState({nama:data.nama})
        this.setState({alamat:data.alamat})
        this.setState({telp:data.telp})
        this.setState({perusahaan:data.perusahaan})
        this.setState({ktp:data.ktp})
      })
  }


  deleteData = async (props) =>{
    const { navigation } = this.props;
    fetch('http://mppk-app.herokuapp.com/deleteClient/'+this.state.idClient)
    .then(res=>res.json())
    .then(data=>{
        if(!data.error){
            alert(data.message)
            this.setState({dialogVisible:false})
            navigation.replace('Dashboard')
        }
        else{
            alert(data.error)
        }
    })
    }

  fetchDataProject= async (props)=>{
      fetch("http://mppk-app.herokuapp.com/getDataProjectClient/"+ this.state.idClient)
      .then(res=>res.json())
      .then(data=>{
          if(!data==[]){
              //console.log(data)
              this.setState({list:data}) 
          }
          else{
          // console.log('null')
              this.setState({list:{_id:null}}) 
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
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Client</Text>
        </View>

      
        <View style={{flex:1}}>
                
            <ScrollView>
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    marginVertical:20,
                }}>
                      
                  {
                      this.state.data.image ?(
                          <Image
                          source={{ uri: this.state.img.uri }}
                          style={{height:100,width:100,borderRadius:50,backgroundColor:'white'}}
                      />
                      ):(
                          <Image
                          source={{ uri: this.state.img.uri }}
                          style={{height:100,width:100,borderRadius:50,backgroundColor:'white'}}
                      />
                      )
                  }
                
                </View>
                <View
                  style={{
                      marginHorizontal:20
                  }}
                >
                  <View style={{backgroundColor:'white',borderRadius:12,marginVertical:20}}>
                  <View style={{flexDirection:'row'}}>
                          <Text style={styles.text}>Nama Client</Text>
                          <Text style={styles.titikdua}>:</Text>
                          <Text style={styles.subtext}>{this.state.nama}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.text}>No KTP</Text>
                          <Text style={styles.titikdua}>:</Text>
                          <Text style={styles.subtext}>{this.state.ktp} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.text}>No Telp</Text>
                          <Text style={styles.titikdua}>:</Text>
                          <Text style={styles.subtext}>{this.state.telp} </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.text}>Alamat</Text>
                          <Text style={styles.titikdua}>:</Text>
                          <Text style={styles.subtext}>{this.state.alamat}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.text}>Perusahaan</Text>
                          <Text style={styles.titikdua}>:</Text>
                          <Text style={styles.subtext}>{this.state.perusahaan}</Text>
                        </View>
                  </View>
                  
                  <View style={{backgroundColor:'white',borderRadius:12}}>
                          <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20}}>Project</Text>
                      {
                          this.state.list.map((l)=>(
                              l._id === null ?(
                                  <Text style={{fontSize:20,marginVertical:5}}>Belum Memiliki Project</Text>
                              ):(
                              <View style={{borderBottomWidth:0.8}}>
                                  <View style={{flexDirection:'row'}}>
                                      <Text style={styles.text}>Nama Project</Text>
                                      <Text style={styles.titikdua}>:</Text>
                                      <Text style={styles.subtext}>{l.nama}</Text>
                                  </View>
                                  <View style={{flexDirection:'row'}}>
                                      <Text style={styles.text}>Status</Text>
                                      <Text style={styles.titikdua}>:</Text>
                                      {
                                        l.status === 'done'?(
                                            <Text style={styles.subtext}>Selesai</Text>
                                        ):(
                                            <Text style={styles.subtext}>Belum Selesai</Text>
                                        )
                                      }
                                      
                                  </View>
                              </View>
                              )
                          ))
                      }
                        
                      
                  </View>  
                  

                </View>
                <View style={{
                      marginHorizontal:20, alignItems:'center',flexDirection:'row'
                  }}>
                      <TouchableOpacity onPress={() => {navigation.navigate('EditClient',{id:this.state.idClient})}} style={styles.btnupdate}>
                          <Icon name="edit" size={20} color="white"></Icon>
                      </TouchableOpacity>
                      
                      <TouchableOpacity onPress={() => {this.setState({dialogVisible:true})}} style={styles.btnupdate}>
                          <Icon name="trash" size={20} color="white"></Icon>
                      </TouchableOpacity> 
                  </View>
            </ScrollView>
            
        </View>
                <ConfirmDialog
                        title="Alert !!!!"
                        message="Apakah anda yakin ?"
                        visible={this.state.dialogVisible}
                        onTouchOutside={()=>this.setState({dialogVisible:false})}
                        positiveButton={{
                            title: "YES",
                            onPress: () => this.deleteData()
                        }}
                        negativeButton={{
                            title: "NO",
                            onPress: () => this.setState({dialogVisible:false})
                        }}
                />
        </View>
    )
  }
}

  
const styles=StyleSheet.create({
    input: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,

        },
    inputarea: { 
        marginVertical:10,
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        marginHorizontal:10,
        justifyContent: 'flex-start',
        height: 90,
        },
    btn:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#039be5',
        alignItems:'center',
    },
    fab: { 
        //   position: 'absolute', 
           width: 46, 
           height: 46, 
           alignItems: 'center', 
           justifyContent: 'center', 
           right: 20, 
           bottom: 20, 
           backgroundColor: '#039be5', 
           borderRadius: 30, 
           elevation: 8 , marginBottom:100
           }, 
    btnupdate: { 
     //   position: 'absolute', 
        width: '50%', 
        height: 36, 
        alignItems: 'center', 
        justifyContent: 'center',  
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8,
        marginHorizontal:5,marginVertical:20
        }, 

    
  modalView: {
  //  marginLeft:'40%',marginBottom:0,
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
    marginHorizontal:20,width:wp('25%')
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
    marginVertical:5,marginLeft:5,width:wp('53%')
  },
});
export default DetailClient;

