import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import SelectPicker from 'react-native-form-select-picker';

class TaskUser extends Component{
  state = {
    idproject: this.props.route.params.idproject,
    status: this.props.route.params.status,
    idtask: this.props.route.params.id,
    iduser: '',
    nama: '',
    list: [],
    listPegawai: [],
    team:[],
    dialogVisible: false,
    loading: true,
  }
  
  componentDidMount(){
    //console.log(this.state.idtask);
    this.fetchDataPegawai();
    this.fetchDataPekerja();
  }

  fetchDataPegawai = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataTeam/'+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
     // console.log(data)
      this.setState({listPegawai:data})
      this.setState({loading:false})
    })
  }
  

  fetchDataPekerja = async (props)=>{
    fetch('http://mppk-app.herokuapp.com/getDataUserTask/'+this.state.idtask)
    .then(res=>res.json())
    .then(data=>{
     // console.log(data[0].iduser)
      this.setState({list:data})
      this.setState({loading:false})
     // this.setState({team:data.iduser})
    })
  }

  sendData = async (props)=>{
    var ok = false;
    console.log(this.state.list.length)
    const { navigation } = this.props;
    if (!this.state.iduser.trim()) {
      alert('Please Choose pegawai');
    }
    else if(this.state.iduser.trim()){
      console.log("yaa")
      if(this.state.list.length>0){
        for(var i=0;i<this.state.list.length;i++){
          console.log(this.state.list[i].iduser);
          if(this.state.iduser == this.state.list[i].iduser){
            alert("Pegawai sudah ada!!")
          }
          else{
            console.log("true")
            ok=true;
          }
        }
      }
      else{
        console.log("true")
        ok=true;
      }
    }
    if(ok==true){
      fetch("http://mppk-app.herokuapp.com/send-data-taskuser",{
   
        method:"POST",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
         "iduser":this.state.iduser,
         "idtask":this.state.idtask,
         "status":"none",
       })
       })
       .then(res=>res.json())
       .then(data=>{
          console.log(data)
          if(!data.error){
             this.setState({iduser:''})
             alert('Data Tersimpan')
             navigation.replace('TaskUser',{idproject:this.state.idproject,status:this.state.status,id:this.state.idtask})
          }
          else{
              Alert.alert(data.error)
          }
        
      })
    }
    
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
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Team</Text>
          </View>

          
        {
              this.state.status==='yes'?(
                <View
                style={{
                  backgroundColor: '#fff',
                  padding: 16,
                  height: 200,
                  justifyContent:'center'
                }}
                >
                <View>
                    <View style={{flexDirection:'row'}}>
                      <SelectPicker
                                  style={{flex:1,borderBottomWidth:1, borderBottomColor:'black', marginHorizontal:"3%", marginVertical:20}}
                                  placeholder="Nama Pegawai"
                                  onSelectedStyle={{fontSize: 20, color:'black',paddingLeft:10}}
                                  placeholderStyle={{fontSize: 20, color:'black',}}
                                  onValueChange={(value) => {
                                      this.setState({iduser:value})
                                  }}
                                  selected={this.state.iduser}
                                  >
                                  {Object.values(this.state.listPegawai).map((val, index) => (
                                      <SelectPicker.Item label={val.user.nama} value={val.user._id} key={val.user._id} />
                                  ))}
        
                        </SelectPicker>
                    </View>
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
                            paddingHorizontal:20,
                            borderRadius:6,
                            alignItems:'center',
                    
                      }}>
                        <Avatar source={{uri:item.user.image}}/>
                        <View>
                        
                        <Text style={{fontSize:16, paddingLeft:10}}>{item.user.nama}</Text>
                        </View>
                        
                      </View>
                      </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                onRefresh={this.fetchDataPekerja}
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
export default TaskUser;
