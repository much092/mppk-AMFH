import React, {Component,useState,useEffect} from 'react';
import { FlatList, ImageBackground, Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import foto from '../../../src/icons/photo-album.png';
import team from '../../../src/icons/group.png';
import task from '../../../src/icons/tasks.png';
import modul from '../../../src/icons/to-do-list.png';
import document from '../../../src/icons/documents.png';
import progress from '../../../src/icons/progress-bar.png';
import feedback from '../../../src/icons/chat.png';
import absen from '../../../src/icons/fingerprint.png';
import alat from '../../../src/icons/wrench.png';
import material from '../../../src/icons/bucket.png';

class DetailProjectPM extends Component{
  state = {
    idproject: this.props.route.params.id,
    idclient: this.props.route.params.idClient,
    idpegawai: this.props.route.params.idp,
    status: this.props.route.params.status,
    list: [],
    list2: [],
    listTeam: [],
    listClient: [],
    listCountSelesai: '',
    listCountTotal: '',
    loading: true,
    feed: [],
  }
  
  sheetRef = React.createRef();
  fall = new Animated.Value(0);

  componentDidMount(){
    this.fetchData();
    this.fetchDataMandor();
    this.fetchDataClient();
    this.fetchDataCount();
    this.fetchDataTeam();
    this.fetchDataFeedback();
  }

  fetchDataMandor = async (props)=>{
      fetch('http://mppk-app.herokuapp.com/getDetailProject/'+this.state.idproject)
      .then(res=>res.json())
      .then(data=>{
        this.setState({list2:data})
        
      })
  }
  fetchData = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataProjectById/'+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({list:data})
    })
  }

  fetchDataTeam = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataTeam/'+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({listTeam:data})
    })
  }
  
  fetchDataClient = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataClientById/'+this.state.idclient)
    .then(res=>res.json())
    .then(data=>{
      this.setState({listClient:data})
    })
  }
  fetchDataFeedback = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataFeedback2/'+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({feed:data})
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

  renderContent = () => (
      <View
        style={{
          backgroundColor: '#bbdefb',
          padding: 16,
          height: 200,
          justifyContent:'center',
          marginHorizontal:10,borderRadius:20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5
        }}
      >
        <View style={{flexDirection:'row',justifyContent:'center',marginVertical:hp('1%')}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TeamPM',{id:this.state.idproject,status:this.state.status})}}
              style={{backgroundColor:'white',
                      width:wp('14%'),
                      height:wp('14%'),
                      borderRadius:wp('14%'),
                      marginHorizontal:wp('2%'),
                      justifyContent:'center',alignItems:'center'
                    }}
            >
              <Image source={team} style={{height:25,width:25}}></Image>
              
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Document',{id:this.state.idproject,status:this.state.status})}}
              style={{backgroundColor:'white',
                      width:wp('14%'),
                      height:wp('14%'),
                      borderRadius:50,
                      marginHorizontal:wp('2%'),
                      justifyContent:'center',alignItems:'center'
                    }}
            >
            <Image source={document} style={{height:25,width:25}}></Image>
            
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Task',{id:this.state.idproject,status:this.state.status,tglmulai:this.state.list.tglMulai,tglselesai:this.state.list.tglSelesai})}}
              style={{backgroundColor:'white',
                      width:wp('14%'),
                      height:wp('14%'),
                      borderRadius:50,
                      marginHorizontal:wp('2%'),
                      justifyContent:'center',alignItems:'center'
                    }}
            >
            <Image source={task} style={{height:25,width:25}}></Image>
            
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Module',{id:this.state.idproject,status:this.state.status})}}
              style={{backgroundColor:'white',
                      width:wp('14%'),
                      height:wp('14%'),
                      borderRadius:50,
                      marginHorizontal:wp('2%'),
                      justifyContent:'center',alignItems:'center'
                    }}
            >
            <Image source={modul} style={{height:25,width:25}}></Image>
            
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProgressPM',{id:this.state.idproject,status:this.state.status})}}
              style={{backgroundColor:'white',
                      width:wp('14%'),
                      height:wp('14%'),
                      borderRadius:50,
                      marginHorizontal:wp('2%'),
                      justifyContent:'center',alignItems:'center'
                    }}
            >
            <Image source={progress} style={{height:25,width:25}}></Image>
            
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Team</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Dokumen</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Task</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Modul</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Progres</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginVertical:10}}>
            
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Feedback',{id:this.state.idproject,status:this.state.status})}}
              style={{backgroundColor:'white',
                      width:wp('14%'),
                      height:wp('14%'),
                      borderRadius:50,
                      marginHorizontal:wp('2%'),
                      justifyContent:'center',alignItems:'center'
                    }}
            >
            <Image source={feedback} style={{height:25,width:25}}></Image>
            
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FotoTaskPM',{id:this.state.idproject,status:this.state.status})}}
                  style={{backgroundColor:'white',
                          width:wp('14%'),
                          height:wp('14%'),
                          borderRadius:50,
                          marginHorizontal:wp('2%'),
                          justifyContent:'center',alignItems:'center'
                        }}
                >
                <Image source={document} style={{height:25,width:25}}></Image>
                
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AbsensiPM',{id:this.state.idproject,status:this.state.status})}}
                  style={{backgroundColor:'white',
                          width:wp('14%'),
                          height:wp('14%'),
                          borderRadius:50,
                          marginHorizontal:wp('2%'),
                          justifyContent:'center',alignItems:'center'
                        }}
                >
                <Image source={absen} style={{height:25,width:25}}></Image>
                
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MaterialPM',{id:this.state.idproject,status:this.state.status})}}
                  style={{backgroundColor:'white',
                          width:wp('14%'),
                          height:wp('14%'),
                          borderRadius:50,
                          marginHorizontal:wp('2%'),
                          justifyContent:'center',alignItems:'center'
                        }}
                >
                <Image source={material} style={{height:25,width:25}}></Image>
                
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AlatPM',{id:this.state.idproject,status:this.state.status})}}
                  style={{backgroundColor:'white',
                          width:wp('14%'),
                          height:wp('14%'),
                          borderRadius:50,
                          marginHorizontal:wp('2%'),
                          justifyContent:'center',alignItems:'center'
                        }}
                >
                <Image source={alat} style={{height:25,width:25}}></Image>
                
            </TouchableOpacity>
        </View>
        
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Feedback</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Foto</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Absen</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Material</Text>
          <Text style={{marginHorizontal:wp('2%'),width:wp('14%'),textAlign:'center',fontSize:wp('3%')}}>Alat</Text>
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
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Project</Text>
          </View>
        <ScrollView style={{flex:1, backgroundColor: 'white'}}>
        {
                this.state.list.aktif==='yes'?(
                  <TouchableOpacity
                      style={{
                        backgroundColor:'#0d47a1',
                        height:40,borderRadius:20,marginLeft:'65%',
                        marginHorizontal:'5%',marginVertical:10,alignItems:'center',justifyContent:'center'
                      }}
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
                    this.state.list2.map((l,k)=>(
                    <Text key="1" style={styles.subtext}>{l.user.nama}</Text>
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
                          <Text style={styles.text}>NO Telp</Text>
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
          
          <View 
            style={styles.container2}>
                  <View >
                    <Text style={styles.text2}>Feedback</Text>
                    {
                      this.state.feed.map((l)=>(
                      <View style={{borderBottomWidth:0.7, marginHorizontal:0}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.text}>Tanggal</Text>
                          <Text style={styles.titikdua}>:</Text>
                          <Text style={styles.subtext}>{l.date}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.text}>Isi Feedback</Text>
                          <Text style={styles.titikdua}>:</Text>
                          <Text style={styles.subtext}>{l.feedback}</Text>
                        </View>
                      </View>
                      ))
                    }
                    
                  </View>
          </View>
          
          
        </ScrollView>
        <View style={{height:210}}>
            <BottomSheet
                  ref={this.sheetRef}
                  snapPoints={[210,210]}
                  initialSnap={0}
                  callbackNode={this.fall}
                  enabledGestureInteraction={true}
                  borderRadius={20}

                  renderContent={this.renderContent }
                  renderHeader={this.renderHeader}
                />
        </View>
      </View>
    )
  }
}


const styles=StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius:50,
  },
   
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,
    marginHorizontal:20,width:'28%'
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
            
  },
  container2:{
    flex:1,
    marginHorizontal:10,
    marginVertical:10,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
   // borderRadius:25,
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


export default DetailProjectPM;
