import React, {Component,useState,useEffect} from 'react';
import { FlatList, ImageBackground, Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {  ScrollView, TextInput } from 'react-native-gesture-handler';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import detail from '../../../src/icons/contact-form.png';
import alat from '../../../src/icons/wrench.png';
import material from '../../../src/icons/bucket.png';
import document from '../../../src/icons/documents.png';
import team from '../../../src/icons/group.png';
import absen from '../../../src/icons/fingerprint.png';

class DetailProjectAdmin extends Component{

  state = {
    idproject: this.props.route.params.id,
    idclient: this.props.route.params.idClient,
    iduser: '',
    status: this.props.route.params.status,
    list: [],
    list2: [],
    listClient: [],
    listCountSelesai: '',
    listCountTotal: '',
    loading: true,
    dialogVisible:false,
  }

  sheetRef = React.createRef();
  fall = new Animated.Value(1);
 
  componentDidMount(){
    this.fetchData();
    this.fetchDataMandor();
    this.fetchDataClient();
    this.fetchDataCount();
  }

  fetchDataMandor = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDetailProject/'+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
        this.setState({list2:data})
        this.setState({iduser:data[0].user._id})
        //console.log(this.state.iduser)
    })
 }
 
  fetchData = async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getDataProjectById/'+this.state.idproject)
  .then(res=>res.json())
  .then(data=>{
        this.setState({list:data})
  })
  }
  fetchDataClient = async (props)=>{
   fetch('http://mppk-app.herokuapp.com/getDataClientById/'+this.state.idclient)
   .then(res=>res.json())
   .then(data=>{
         this.setState({listClient:data})
   })
  }

  fetchDataCount= async (props)=>{
  fetch('http://mppk-app.herokuapp.com/getCountProgress/'+this.state.idproject)
  .then(res=>res.json())
  .then(data=>{
        this.setState({listCountSelesai:data.selesai})
        this.setState({listCountTotal:data.total})
  })
  }

  onPress=(text)=>{
    if(text='yes'){
      this.setState({dialogVisible:true})
    }
  }

  updateaktif = () =>{
    const { navigation } = this.props;
    fetch("http://mppk-app.herokuapp.com/updateProjectAktif",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
      },  
       body:JSON.stringify({
        "_id":this.state.idproject,
        "iduser":this.state.iduser,
        "aktif":'no'
       })
      })
    .then(res=>res.json())
    .then(data=>{
        if(!data==[]){
            alert('project menjadi tidak aktif')
            navigation.replace('DetailProjectAdmin',{id:this.state.idproject,idClient:this.state.idclient})
        }
        else{
           alert('update gagal')
        }
    })
  }

  renderContent = () => (
    <View
      style={{
        backgroundColor: '#bbdefb',
      // padding: 16,
        height: 190,
        justifyContent:'center',
        marginHorizontal:10,borderRadius:20
      }}
    >
      <View style={{flexDirection:'row',marginHorizontal:15,marginVertical:10}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TaskAdmin',{id:this.state.idproject})}}
            style={{backgroundColor:'white',
                    width:wp('16%'),
                    height:wp('16%'),
                    borderRadius:wp('16%'),
                    marginHorizontal:wp('2%'),
                    justifyContent:'center',alignItems:'center'
                  }}
          >
            <Image source={detail} style={{height:25,width:25}}></Image>
            <Text style={{fontSize:wp('3%'),}}>Task</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Alat',{id:this.state.idproject,status:this.state.status})}}
            style={{backgroundColor:'white',
                    width:wp('16%'),
                    height:wp('16%'),
                    borderRadius:wp('16%'),
                    marginHorizontal:wp('2%'),
                    justifyContent:'center',alignItems:'center'
                  }}
          >
          <Image source={alat} style={{height:25,width:25}}></Image>
          <Text style={{fontSize:wp('3%'),}}                                                                                                                                                                                              >Alat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Material',{id:this.state.idproject,status:this.state.status})}}
            style={{backgroundColor:'white',
                    width:wp('16%'),
                    height:wp('16%'),
                    borderRadius:wp('16%'),
                    marginHorizontal:wp('2%'),
                    justifyContent:'center',alignItems:'center'
                  }}
          >
          <Image source={material} style={{height:25,width:25}}></Image>
          <Text style={{fontSize:wp('3%'),}}>Material</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ListDocAdmin',{id:this.state.idproject,status:this.state.status})}}
            style={{backgroundColor:'white',
                    width:wp('16%'),
                    height:wp('16%'),
                    borderRadius:wp('16%'),
                    marginHorizontal:wp('2%'),
                    justifyContent:'center',alignItems:'center'
                  }}
          >
          <Image source={document} style={{height:25,width:25}}></Image>
          <Text style={{fontSize:wp('3%'),}}>Dokumen</Text>
          </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',marginHorizontal:15}}>
          
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FotoTaskAdmin',{id:this.state.idproject})}}
                style={{backgroundColor:'white',
                        width:wp('16%'),
                        height:wp('16%'),
                        borderRadius:wp('16%'),
                        marginHorizontal:wp('2%'),
                        justifyContent:'center',alignItems:'center'
                      }}
              >
              <Image source={document} style={{height:25,width:25}}></Image>
              <Text style={{fontSize:wp('3%'),}}>Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TeamAdmin',{id:this.state.idproject})}}
                style={{backgroundColor:'white',
                        width:wp('16%'),
                        height:wp('16%'),
                        borderRadius:wp('16%'),
                        marginHorizontal:wp('2%'),
                        justifyContent:'center',alignItems:'center'
                      }}
              >
              <Image source={team} style={{height:25,width:25}}></Image>
              <Text style={{fontSize:wp('3%'),}}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Absensi',{id:this.state.idproject})}}
                style={{backgroundColor:'white',
                        width:wp('16%'),
                        height:wp('16%'),
                        borderRadius:wp('16%'),
                        marginHorizontal:wp('2%'),
                        justifyContent:'center',alignItems:'center'
                      }}
              >
              <Image source={absen} style={{height:25,width:25}}></Image>
              <Text style={{fontSize:wp('3%'),}}>Absensi</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  );

  renderHeader=()=>{
    <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
    </View>
  }
  render(){
    const { navigation } = this.props;
    return(
      <View style={{ flex: 1 }} >
        <View 
          style={{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#039be5',
            paddingVertical:10, justifyContent:'space-between'
          }}
        >
          <View style={{flexDirection:'row',alignItems:'center',}}>
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
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Project</Text>
          </View>
          </View>
          
        <ScrollView style={{ flex:1, backgroundColor: 'white',}}>
        <View>
             <View>
              
              {
                this.state.list.aktif==='yes'?(
                  <TouchableOpacity
                      style={{
                        backgroundColor:'#0d47a1',
                        height:40,borderRadius:20,marginLeft:'65%',
                        marginHorizontal:'5%',marginVertical:10,alignItems:'center',justifyContent:'center'
                      }}
                      onPress={()=>this.onPress('yes')}
                    >
                    <Text style={{color:'white',fontWeight:'bold'}}>Aktif</Text>
                    </TouchableOpacity>
                ):(
                  <TouchableOpacity
                    style={{
                      backgroundColor:'#b71c1c',
                      height:40,borderRadius:20,marginLeft:'65%',
                      marginHorizontal:'5%',marginVertical:10,alignItems:'center',justifyContent:'center'
                    }}
                    >
                    <Text style={{color:'white',fontWeight:'bold'}}>Tidak Aktif</Text>
                    </TouchableOpacity>
                )
              }
              
              {/* <Icon name="check" size={40} color='green'/> */}
            
        </View>
     
        </View>
        
       
        <View 
          style={styles.container}>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>Detail Project</Text>
                <View style={{marginVertical:5}}>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Nama Project</Text>
                <Text style={styles.titikdua}>:</Text>
                <Text style={styles.subtext}>{this.state.list.nama}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Jadwal</Text>
                <Text style={styles.titikdua}>:</Text>
                <Text style={styles.subtext}>{this.state.list.tglMulai} sampai {this.state.list.tglSelesai} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Deskripsi</Text>
                <Text style={styles.titikdua}>:</Text>
                <Text style={styles.subtext}>{this.state.list.deskripsi}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Mandor</Text>
                <Text style={styles.titikdua}>:</Text>
                {
                  this.state.list2.map((l)=>(
                  <Text style={styles.subtext}>{l.user.nama}</Text>
                  ))
                }
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.text}>Progress</Text>
                <Text style={styles.titikdua}>:</Text>
               {
                 this.state.listCountTotal.length >0 && this.state.listCountSelesai.length > 0 ? (
                 <Text style={styles.subtext}>{Math.round(this.state.listCountSelesai[0].countselesai/this.state.listCountTotal[0].counttotal*100)}%</Text>
                 ):(
                    <Text style={styles.subtext}>0%</Text>
                 )
               }
              </View>
              
              <View style={{flexDirection:'row'}}>
                    <Text style={styles.text}>Status</Text>
                    <Text style={styles.titikdua}>:</Text>
                      {
                        this.state.list.status === 'done'?(
                          <Text style={styles.subtext}>Selesai</Text>
                        ):(
                          <Text style={styles.subtext}>Belum Selesai</Text>
                        )
                    }
              </View>
                </View>
        </View>
                 
        <View 
          style={styles.container}>
                <View style={{marginVertical:5}}>
                  <Text style={styles.text2}>Detail Client</Text>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Nama Client</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{this.state.listClient.nama}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>No Telp</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{this.state.listClient.telp} </Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Alamat</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{this.state.listClient.alamat}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Perusahaan</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{this.state.listClient.perusahaan}</Text>
                      </View>
                    
                </View>
        </View>
               

      </ScrollView>
        <View style={{height:200}}>

          <BottomSheet
                ref={this.sheetRef}
                snapPoints={[200,200]}
                initialSnap={0}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
                borderRadius={20}

                renderContent={this.renderContent }
                renderHeader={this.renderHeader}
              />
        </View>
      <ConfirmDialog
              title="Alert !!!!"
              message="Apakah anda yakin ?"
              visible={this.state.dialogVisible}
              onTouchOutside={()=>this.setState({dialogVisible:false})}
              positiveButton={{
                  title: "YES",
                  onPress: () => this.updateaktif()
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius:wp('16%'),
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
    marginVertical:5,marginLeft:5,width:wp('60%')
  },
  text2: {
    color: "black",
    fontWeight:'bold',
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'center',
    marginVertical:5,
    marginHorizontal:20,
  },
  container:{
    flex:1,
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:25,
            //paddingLeft: 10,
            backgroundColor:'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 7,
            
  }
})


export default DetailProjectAdmin;
