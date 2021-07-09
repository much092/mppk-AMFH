import React, {Component,useState,useEffect} from 'react';
import { Image, FlatList, StyleSheet, Text, View, RefreshControl,Card, Alert, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar, SearchBar,Overlay,Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Moment from 'moment';

import img from '../../../src/icons/project.png';

class Pic extends Component{
// const Pic = ({navigation}) => {
//   const [idProject,setIdProject] = useState("")
//   const [idUser,setIdUser] = useState("")
//   const [feedback, setFeedback] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);

  state = {
    idUser: '',
    idProject:'',
    feedback:'',
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
      fetch('http://mppk-app.herokuapp.com/getDataPic')
      .then(res=>res.json())
      .then(data=>{
        this.setState({filteredDataSource:data});
        this.setState({masterDataSource:data});
        this.setState({loading:false})
      })
  }

  sendData = async (props)=>{
    fetch("http://mppk-app.herokuapp.com/send-data-feedback2",{
    
      method:"POST",
      headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      "date":Moment(Date.now()).format('DD-MM-YYYY'),
      "feedback":this.state.feedback,
      "idproject":this.state.idProject,
      "iduser":this.state.idUser
    })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(!data.error){
          this.setState({feedback:''})
          this.setState({modalVisible:false})
          Alert.alert('Sukses')
        }
        else{
            Alert.alert(data.error)
        }
      
    })
  }

  searchFilterFunction = text => {    
    if (text) {
      const newData = this.state.masterDataSource.filter(item => {      
        const itemData = `${item.user.nama.toUpperCase()}   
        ${item.project.nama.toUpperCase()}`;
        
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
            onPress={()=>navigation.toggleDrawer()}
          >
            <Icon name="bars" size={40} color='white'/>
          </TouchableOpacity>
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Pic</Text>
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
                    <TouchableOpacity onPress={()=>{this.setState({modalVisible:true}),this.setState({idProject:item.project._id}),this.setState({idUser:item.user._id})}}>
                      <View 
                      style={{
                          flexDirection:'row' ,
                          borderBottomWidth:0,
                          backgroundColor:'white',
                          paddingVertical:10,
                          borderRadius:6,
                          alignItems:'center',
                          marginHorizontal:0

                      }}>
                        <Avatar source={img} ></Avatar>
                        <View>
                                    <View style={{flexDirection:'row'}}>
                                          <Text style={styles.text}>Nama Project</Text>
                                          <Text style={styles.titikdua}>:</Text>
                                          <Text style={styles.subtext}>{item.project.nama}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                          <Text style={styles.text}>Penanggung Jawab</Text>
                                          <Text style={styles.titikdua}>:</Text>
                                          <Text style={styles.subtext}>{item.user.nama} </Text>
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
          <Overlay  isVisible={this.state.modalVisible} 
                    backdropStyle={{opacity:0}}
                    overlayStyle={styles.modalView}
                    onBackdropPress={()=>this.setState({modalVisible:false})}>
                <Input
                    placeholder='Feedback'
                    value={this.state.feedback}
                    onChangeText={(text)=>this.setState({feedback:text})}
                    style={{width:'100%'}}
                    
                />
                <TouchableOpacity style={styles.btnoverlay} onPress={()=>this.sendData()}>
                    <Text style={styles.textStyle}>submit</Text>
                </TouchableOpacity>
              </Overlay>
      </SafeAreaView>
        
      <View
            style={{ 
                height:100, 
                width:100,
                position: 'absolute',
                top: '90%', left:'85%',
                }}
          >
              <TouchableOpacity onPress={() => navigation.navigate('AddPic')} style={styles.fab}>
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
        },
    
  modalView: {
   // marginLeft:'40%',marginBottom:'120%',
    width:'80%',
    height:'30%',
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  btnoverlay:{
    backgroundColor:'blue',height:30,width:100,justifyContent:'center',
    marginVertical:5,
    borderRadius:12
  },
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:0,
    marginHorizontal:20,width:'35%'
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
export default Pic;
