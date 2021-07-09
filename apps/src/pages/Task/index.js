
import React, {Component,useState,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import {  ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input } from 'react-native-elements';

class Task extends Component{
  state = {
    idproject: this.props.route.params.id,
    status: this.props.route.params.status,
    tglMulai: this.props.route.params.tglmulai,
    tglselesai: this.props.route.params.tglselesai,
    list: [],
    listTeam: [],
    loading: true,
  }
  
  componentDidMount(){
    console.log(this.state.tglMulai+" "+this.state.tglselesai)
    this.fetchDataTask();
  }


  fetchDataTask= async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataAllTask/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      //  console.log(data)
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
              <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
                Task
              </Text>
            </View>

        <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                      data={this.state.list}
                      renderItem={({item})=>(
                        <View>
                            {
                              this.state.status==='yes'?(
                                <TouchableOpacity onPress={()=>{ navigation.navigate('TaskUser',{id:item._id,status:this.state.status,idproject:this.state.idproject})}}>
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
                                      
                                      <Text style={{fontSize:16, paddingLeft:10}}>{item.nama_task}</Text>
                                      </View>
                                      
                                    </View>
                                </TouchableOpacity>
                              ):(
                                <></>
                              )
                            }
                            

                        </View>
                       
                      )}
                      keyExtractor={item => item._id}
                      onRefresh={()=>this.fetchDataTask()}
                      refreshing={this.state.loading}
                      ItemSeparatorComponent={this.renderSeparatorView}
                />
        
        </SafeAreaView> 
        
              <View
                  style={{ 
                      height:100, 
                      width:100,
                      position: 'absolute',
                      top: '90%', left:'85%',
                      }}
                >
                    <TouchableOpacity onPress={()=>{ navigation.navigate('AddTask',{idproject:this.state.idproject,status:this.state.status,tglmulai:this.state.tglMulai,tglselesai:this.state.tglselesai})}} style={styles.fab}>
                    <Text style={styles.fabIcon}>+</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#039be5', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        }
});
export default Task;
