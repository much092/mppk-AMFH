import React, {Component,useState,useEffect} from 'react';
import { Image, FlatList, StyleSheet, Text, View, Button, RefreshControl,Card, Alert, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Project extends Component{
  state = {
    idproject: '',
    list: [],
    loading: true,
    search: '',
    filteredDataSource: [],
    masterDataSource: [],
  }
 
  componentDidMount(){
    this.fetchData();
  }

  fetchData = async (props)=>{
      fetch('http://mppk-app.herokuapp.com/getDataProject')
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
                onPress={()=>navigation.toggleDrawer()}
              >
                <Icon name="bars" size={40} color='white'/>
              </TouchableOpacity>
              <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Project</Text>
         
         
         
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
                      <TouchableOpacity onPress={()=>{navigation.navigate('DetailProjectAdmin',{id:item._id,idClient:item.client._id,status:item.aktif})}}>
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
                              <Text style={styles.subtext}>{item.nama}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.text}>Jadwal</Text>
                              <Text style={styles.titikdua}>:</Text>
                              <Text style={styles.subtext}>{item.tglMulai} sampai {item.tglSelesai} </Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.text}>Nama Client</Text>
                              <Text style={styles.titikdua}>:</Text>
                              <Text style={styles.subtext}>{item.client.nama}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.text}>Alamat CLient</Text>
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
      
      </SafeAreaView>
        
          <View
            style={{ 
                height:100, 
                width:100,
                position: 'absolute',
                top: '90%', left:'85%',
                }}
          >
              <TouchableOpacity onPress={() => navigation.navigate('AddProject')} style={styles.fab}>
              <Text style={styles.fabIcon}>+</Text>
              </TouchableOpacity>
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
export default Project;
