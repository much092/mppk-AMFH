import React, {Component,useState,useEffect} from 'react';
import { FlatList,Image, StyleSheet, Text, View, 
          SafeAreaView, Modal,  TouchableOpacity } from 'react-native';
import {  ScrollView, TextInput } from 'react-native-gesture-handler';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar,Input,SearchBar } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ListProjectPM extends Component{

  state = {
    iduser: this.props.route.params.id,
    loading: true,
    search: '',
    filteredDataSource: [],
    masterDataSource: [],
    modalVisible:false,
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async (props)=>{
      fetch("http://mppk-app.herokuapp.com/getDataProjectById",{
        method:"POST",
        headers: {
         'Content-Type': 'application/json'
        },  
         body:JSON.stringify({
          "iduser":this.state.iduser
         })
      })
      .then(res=>res.json())
      .then(data=>{
        try{
          this.setState({filteredDataSource:data});
          this.setState({masterDataSource:data});
          this.setState({loading:false})
        }
        catch(err){
          
        }
      })
  }
  
  searchFilterFunction = text => {    
    if (text) {
      const newData = this.state.masterDataSource.filter(item => {      
        const itemData = `${item.project.nama.toUpperCase()}   
        ${item.client.nama.toUpperCase()}`;
        
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

  render(){
    const { navigation } = this.props;
    return(
      <View style={{ flex: 1 }}>
        <View 
          style={{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#039be5',
            paddingVertical:10,justifyContent:'space-between'
          }}
        >
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Project</Text>
          <TouchableOpacity
            style={{
              backgroundColor:'#039be5',
              width:40, height:40,
              marginHorizontal:'5%',alignItems:'center'
            }}
            onPress={()=>this.setState({modalVisible:true})}
          >
            <Icon name="ellipsis-v" size={40} color='white'/>
          </TouchableOpacity>
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
                    <TouchableOpacity onPress={()=>navigation.navigate('DetailProjectPM',{id:item.project._id,idClient:item.client._id,status:item.project.aktif})}>
                    <View 
                    style={{
                        flexDirection:'row' ,
                        borderBottomWidth:0,
                        backgroundColor:'white',
                        paddingVertical:10,
                        borderRadius:6,
                        alignItems:'center',

                    }}>
                      <View>
                      <View style={{flexDirection:'row'}}>
                            <Text style={styles.text}>Nama Project</Text>
                            <Text style={styles.titikdua}>:</Text>
                            <Text style={styles.subtext}>{item.project.nama}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={styles.text}>Jadwal</Text>
                            <Text style={styles.titikdua}>:</Text>
                            <Text style={styles.subtext}>{item.project.tglMulai} sampai {item.project.tglSelesai} </Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={styles.text}>Nama Client</Text>
                            <Text style={styles.titikdua}>:</Text>
                            <Text style={styles.subtext}>{item.client.nama}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={styles.text}>Alamat Client</Text>
                            <Text style={styles.titikdua}>:</Text>
                            <Text style={styles.subtext}>{item.client.alamat}</Text>
                          </View>
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
          
          <Overlay isVisible={this.state.modalVisible} 
                    backdropStyle={{opacity:0}}
                  overlayStyle={styles.modalView}
                  onBackdropPress={()=>this.setState({modalVisible:false})}>
            
            <TouchableOpacity style={styles.btnoverlay} onPress={()=>{navigation.navigate('AccountPM'),this.setState({modalVisible:false})}}>
                <Text style={styles.textStyle}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnoverlay} onPress={()=>{navigation.replace('Login'),this.setState({modalVisible:false})}}>
                <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
          </Overlay>
      </SafeAreaView>
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
      marginLeft:'40%',marginBottom:hp('80%'),
      width:200,
      height:100,
      backgroundColor: "white",
      borderRadius: 20,
      //padding: 35,
    //  justifyContent:'center',
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
  marginVertical:0,
  marginHorizontal:20,width:wp('25%')
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
  marginVertical:0,marginLeft:5,width:wp('60%')
},
});
export default ListProjectPM;
