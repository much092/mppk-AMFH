import React,{ useState,useEffect } from 'react';
import { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View,TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class DetailPegawai extends Component{
    
    state = {
        img: [],
        data: [],
        email: '',
        nama: '',
        ktp: '',
        telp: '',
        list: [],
        jabatan: this.props.route.params.status,
        idpegawai:this.props.route.params.id,
        loading: true,
        dialogVisible: false,
     }

     componentDidMount(){
        this.fetchDataDetail()
        if(this.state.jabatan=='karyawan'){
                    this.fetchDataProjectPegawai();
                }
        else if(this.state.jabatan=='pm'){
                    this.fetchDataProjectPM();
                }
        this.fetchDataProjectPegawai
      }

    fetchDataDetail = ()=>{
        fetch('http://mppk-app.herokuapp.com/getDataDetailPegawai/'+this.state.idpegawai)
        .then(res=>res.json())
        .then(data=>{
            this.setState({img:{uri: data.image}})
            this.setState({nama:data.nama})
            this.setState({ktp:data.ktp})
            this.setState({telp:data.telp})
            this.setState({email:data.email})
        })
    }
    fetchDataProjectPegawai = async (props)=>{
        fetch("http://mppk-app.herokuapp.com/getDataProjectByIdP",{
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },  
        body:JSON.stringify({
            "iduser":this.state.idpegawai,
        })
        })
        .then(res=>res.json())
        .then(data=>{
            if(!data==[]){
                //console.log('nonull')
                this.setState({list:data}) 
            }
            else{
            // console.log('null')
                this.setState({list:{_id:null}}) 
            }
        })
    }
    fetchDataProjectPM = async (props)=>{
        fetch("http://mppk-app.herokuapp.com/getDataProjectById",{
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },  
        body:JSON.stringify({
            "iduser":this.state.idpegawai
        })
        })
        .then(res=>res.json())
        .then(data=>{
            if(!data==[]){
                //console.log('nonull')
                this.setState({list:data}) 
            }
            else{
            // console.log('null')
                this.setState({list:{_id:null}}) 
            }
        })
    }
    
    deleteData = async (props) =>{
        const { navigation } = this.props;
        fetch('http://mppk-app.herokuapp.com/deletePegawai/'+this.state.idpegawai)
        .then(res=>res.json())
        .then(data=>{
            if(!data.error){
                Alert.alert(data.message)
                this.setState({dialogVisible:false})
                navigation.replace('Dashboard')
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
                    <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Pegawai</Text>
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
                                    <Text style={styles.text}>Nama</Text>
                                    <Text style={styles.titikdua}>:</Text>
                                    <Text style={styles.subtext}>{this.state.nama}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.text}>NIK</Text>
                                    <Text style={styles.titikdua}>:</Text>
                                    <Text style={styles.subtext}>{this.state.ktp} </Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.text}>No Telp</Text>
                                    <Text style={styles.titikdua}>:</Text>
                                    <Text style={styles.subtext}>{this.state.telp}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.text}>Email</Text>
                                    <Text style={styles.titikdua}>:</Text>
                                    <Text style={styles.subtext}>{this.state.email}</Text>
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
                                                <Text style={styles.subtext}>{l.project.nama}</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={styles.text}>Status</Text>
                                                <Text style={styles.titikdua}>:</Text>
                                                {
                                                    l.project.status === 'undone'?(

                                                        <Text style={styles.subtext}>Belum Selesai</Text>
                                                    ):(
                                                        <Text style={styles.subtext}>Selesai</Text>
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
                                marginHorizontal:20, alignItems:'center'
                            }}>
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
    marginHorizontal:20,width:'25%'
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
    marginVertical:5,marginLeft:5
  },
});
export default DetailPegawai;

