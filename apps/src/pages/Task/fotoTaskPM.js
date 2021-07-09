import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView,Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input,Overlay } from 'react-native-elements';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import SelectPicker from 'react-native-form-select-picker';
import ImagePicker from 'react-native-image-picker'

class FotoTaskPM extends Component{
  state = {
    idproject: this.props.route.params.id,
    idTask: '',
    deksripsi: '',
    nama: '',
    img: [],
    img2: '',
    listTask: [],
    list: [],
    loading: true,
    modalVisible: false,
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData= async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataFotoTask/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({list:data})
      this.setState({loading:false})
    })
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
            <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Foto Task</Text>
            
          </View>
          
        <View style={{flex:1,marginHorizontal:0,marginVertical:10,backgroundColor:'white'}}>
            
            <SafeAreaView style={{marginVertical:10}}>
              <FlatList
                data={this.state.list}
                renderItem={({item})=>(
                    <TouchableOpacity  style={{backgroundColor:'grey', }} onPress={()=>{this.setState({modalVisible:true}),this.setState({img2:item.url})}}>
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
                        
                        <Avatar source={{uri:item.url}}/>
                        <View>
                        
                        <Text style={{fontSize:16, paddingLeft:10}}>{item.task.nama_task}</Text>
                        <Text style={{paddingLeft:10,color:'grey'}}>{item.deskripsi}</Text>
                        </View>
                        
                      </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                onRefresh={()=>this.fetchData()}
                refreshing={this.state.loading}
                ItemSeparatorComponent={this.renderSeparatorView}
              />
            </SafeAreaView>
            <Overlay isVisible={this.state.modalVisible} 
                        backdropStyle={{opacity:0}}
                      overlayStyle={styles.modalView}
                      onBackdropPress={()=>this.setState({modalVisible:false})}>
                <Image
                        source={{ uri:this.state.img2 }}
                        style={{height:'100%',width:'100%',backgroundColor:'white'}}
                        resizeMode='contain'
                    />
              </Overlay>
        </View>
       </View>
    )
  }
}


const styles=StyleSheet.create({
    modalView:{
      backgroundColor:"#bbdefb",
      marginVertical:250,
     // borderWidth:2,
      borderRadius:14,
      marginHorizontal:15
  }, 
  btn:{
    marginVertical:10,
    borderRadius:20,
    paddingVertical:10,
    marginHorizontal:100,
    backgroundColor:'#0d47a1',
    alignItems:'center',
},
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
      },
  modalButtonView:{
      //marginBottom:10,
       paddingHorizontal:20,
       paddingVertical:5,
       color:"#000"
  },
  modalView: {
    // marginLeft:'40%',marginBottom:'120%',
     width:'80%',
     height:'80%',
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
  });
export default FotoTaskPM;
