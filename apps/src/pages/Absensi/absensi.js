import React, {Component,useState,useEffect} from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, Text, View, RefreshControl,Card, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, Overlay, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class Absensi extends Component{
  state = {
    idpegawai: '',
    email: '',
    listdetail: [],
    list: [],
    loading: true,
    search: '',
    filteredDataSource: [],
    masterDataSource: [],
    idproject:this.props.route.params.id,
  }
  
  
  componentDidMount(){
    this.fetchData();
  }

  fetchData = async (props)=>{
      fetch('http://mppk-app.herokuapp.com/getDataTeam/'+this.state.idproject)
      .then(res=>res.json())
      .then(data=>{
        this.setState({filteredDataSource:data});
        this.setState({masterDataSource:data});
        this.setState({loading:false})
      })
  }
  
  searchFilterFunction = text => {    
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = this.state.masterDataSource.filter(
        function (item) {
          const itemData = item.nama
            ? item.nama.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      this.setState({filteredDataSource:newData})
      this.setState({search:text})
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      this.setState({filteredDataSource:this.state.masterDataSource})
      this.setState({search:text})
    }  
  };

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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Absensi</Text>
        </View>
      <View>
          <SearchBar        
                placeholder="Type Here..."        
                lightTheme        
                round    
                value={this.state.search}   
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}             
              />  
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
              renderItem={({item})=>(
                      <TouchableOpacity onPress={() => {navigation.navigate('ListAbsensi',{id:item.user._id,status:item.user.status})}} >
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
                        
                        <Image source={{uri:item.user.image}} style={{width:50,height:50,borderRadius:25}}></Image>
                          <View style={{width:'70%'}}>
                          
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
                        
                      </View>
                      </TouchableOpacity>
                    )}
                    onRefresh={this.fetchData}
                    refreshing={this.state.loading}
                    data={this.state.filteredDataSource}
                    keyExtractor={(Item, index) => index.toString()}
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
        },
  btnupdate: { 
     //   position: 'absolute', 
        width: 36, 
        height: 36, 
        alignItems: 'center', 
        justifyContent: 'center',  
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8,
        marginHorizontal:5
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
});
export default Absensi;
