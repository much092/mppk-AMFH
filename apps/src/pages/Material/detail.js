import React,{ useState,useEffect } from 'react';
import { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {  TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class DetailMaterial extends Component{

  state = {
    nama: '',
    jumlah: '',
    deskripsi: '',
    idproject: this.props.route.params.id,
    idMaterial: this.props.route.params.idmaterial,
    dialogVisible: false,
  }

  componentDidMount(){
    this.fetchData();
    console.log(this.state.idproject)
  }
    
  fetchData = async (props)=>{

    fetch('http://mppk-app.herokuapp.com/getDataMaterialById/'+this.state.idMaterial)
    .then(res=>res.json())
    .then(data=>{
      this.setState({nama:data.nama})
      this.setState({jumlah:data.jml})
      this.setState({deskripsi:data.deskripsi})
        
    })
  }

  deleteData = async (props) =>{
      const { navigation } = this.props;
      fetch('http://mppk-app.herokuapp.com/deleteMaterial/'+this.state.idMaterial)
      .then(res=>res.json())
      .then(data=>{
          if(!data.error){
            this.setState({dialogVisible:false})
            alert('Data Berhasil dihapus')
            navigation.goBack()
            navigation.replace('Material',{id:this.state.idproject})
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Detail Material</Text>
      </View>

      <View style={{flex:1}}>
               
          <ScrollView>
             
              <View
                style={{
                    marginHorizontal:20
                }}
              >
                <View style={{backgroundColor:'white',borderRadius:12,marginVertical:20}}>
                <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Nama Material</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{this.state.nama}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Jumlah</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{this.state.jumlah} </Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Deskripsi</Text>
                        <Text style={styles.titikdua}>:</Text>
                        <Text style={styles.subtext}>{this.state.deskripsi}</Text>
                      </View>
                </View>
              </View>
              <View style={{
                    marginHorizontal:20, alignItems:'center',flexDirection:'row'
                }}>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditMaterial',{idmaterial:this.state.idMaterial,id:this.state.idproject})}} style={styles.btnupdate}>
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
    marginVertical:5,marginLeft:5,width:'50%'
  },
});
export default DetailMaterial;

