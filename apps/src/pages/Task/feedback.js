import React, {Component, useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay,Input } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import Moment from 'moment';

import BottomSheet from 'reanimated-bottom-sheet';

class Feedback extends Component{
  state = {
    idUser: '',
    idTask: '',
    feedback: '',
    idproject: this.props.route.params.id,
    status: this.props.route.params.status,
    list: [],
    listTask: [],
    loading: true,
    modalVisible: false,
  }

  sheetRef = React.createRef();
  fall = new Animated.Value(1);

  componentDidMount(){
    this.fetchData();
    this.fetchDataTask();
  }

  fetchData = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataModule/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({list:data})
      this.setState({loading:false})
    })
  }
  fetchDataTask= async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataAllTask/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({listTask:data})
      this.setState({loading:false})
    })
  }
    
  sendData = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/send-data-feedback",{
    
      method:"POST",
      headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "date":Moment(Date.now()).format('DD-MM-YYYY'),
      "feedback":this.state.feedback,
      "idtask":this.state.idTask,
    //  "iduser":this.state.idUser
    })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(!data.error){
          //  setListPegawai()
            Alert.alert('Sukses')
            //console.log(data)
        }
        else{
            Alert.alert(data.error)
        }
      
    })
  }

  onPress(){
    if(this.state.status=='yes'){
      this.setState({modalVisible:true})
    }
  }

    
  renderContent = () => (
    <View
      style={{
        backgroundColor: '#0d47a1',
        padding: 16,
        height: 300,
        justifyContent:'center'
      }}
    >
      <View>
              <Input
                    placeholder='Feedback'
                    value={this.feedback}
                    onChangeText={(text)=>this.setState({feedback:text})}
                    placeholderTextColor='white'
                    color='white'
                />
              <TouchableOpacity style={{paddingVertical:13, backgroundColor:'#e3f2fd',borderRadius:25}}
                onPress={()=>{this.sendData(),this.sheetRef.current.snapTo(1)}}
                    >
                    <Text
                        style={{
                            fontSize:12,
                            fontWeight:'bold',
                            color: 'black',
                            textTransform: 'uppercase',
                            textAlign: 'center'
                        }}
                        >
                    Simpan
                    </Text>
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
              Feedback
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
                                      
                               <TouchableOpacity onPress={()=>{this.onPress(),this.setState({idTask:l._id})}}
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
                                              {/* <View style={{flexDirection:'row'}}>
                                                <Text style={styles.text}>Nama Pegawai</Text>
                                                <Text style={styles.titikdua}>:</Text>
                                                <Text style={styles.subtext}>{l.user.nama}</Text>
                                              </View> */}
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
          
          <Overlay  isVisible={this.state.modalVisible} 
                        backdropStyle={{opacity:0.7}}
                        overlayStyle={styles.modalView}
                        onBackdropPress={()=>this.setState({modalVisible:false})}>
                
                <Input
                    placeholder='Feedback'
                    value={this.feedback}
                    onChangeText={(text)=>this.setState({feedback:text})}
                    placeholderTextColor='black'
                    color='black'
                />
                 <TouchableOpacity style={styles.btnoverlay} onPress={()=>{this.sendData(),this.setState({modalVisible:false})}}>
                        <Text style={styles.textStyle}>Simpan</Text>
                    </TouchableOpacity>
                {/* <TouchableOpacity style={{paddingVertical:0, backgroundColor:'#e3f2fd',borderRadius:0,}}
                onPress={()=>{this.sendData(),this.sheetRef.current.snapTo(1)}}
                    >
                    <Text
                        style={{
                            fontSize:12,
                            fontWeight:'bold',
                            color: 'black',
                            textTransform: 'uppercase',
                            textAlign: 'center'
                        }}
                        >
                    Simpan
                    </Text>
              </TouchableOpacity> */}
          </Overlay>
          {/* <BottomSheet
                  ref={this.sheetRef}
                  snapPoints={[300,0]}
                  initialSnap={1}
                  callbackNode={this.fall}
                  borderRadius={20}
                  renderContent={this.renderContent }
                  renderHeader={this.renderHeader}
                
                /> */}
            
          
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
    width:'70%',
    height:200,
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
    backgroundColor:'#e3f2fd',height:30,width:100,justifyContent:'center',borderRadius:15,
    marginVertical:5
  },
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,
    marginHorizontal:20,width:'30%'
  },
  titikdua: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0
  },
  subtext: {
    color: "grey",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,marginLeft:5,width:'50%'
  },
});

export default  Feedback;
