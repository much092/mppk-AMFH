import React,{ useState,useEffect } from 'react';
import { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

class AccountPM extends Component{
    state = {
        img: [],
        data: [],
        email: '',
        nama: '',
        ktp: '',
        telp: '',
        list: [],
    }

    componentDidMount(){
        this.Boiler();
    }

    Boiler = async ()=>{
        const token = await AsyncStorage.getItem("token")
        fetch('http://mppk-app.herokuapp.com/',{
        headers:new Headers({
        Authorization:"Bearer "+token
        })
        }).then(res=>res.json())
        .then(data=>{
            this.setState({data:data})
            this.setState({img:{uri: data.image}})
            this.setState({nama:data.nama})
            this.setState({ktp:data.ktp})
            this.setState({telp:data.telp})
            this.setState({email:data.email})
        }
        )
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
                <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}></Text>
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
                        style={styles.container}>
                        <View style={{marginVertical:5}}>
                        <Text style={styles.text2}>Detail Account</Text>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text}>Nama</Text>
                                <Text style={styles.titikdua}>:</Text>
                                <Text style={styles.subtext}>{this.state.nama}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text}>NIK</Text>
                                <Text style={styles.titikdua}>:</Text>
                                <Text style={styles.subtext}>{this.state.ktp}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text}>No. Telp</Text>
                                <Text style={styles.titikdua}>:</Text>
                                <Text style={styles.subtext}>{this.state.telp}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text}>Email</Text>
                                <Text style={styles.titikdua}>:</Text>
                                <Text style={styles.subtext}>{this.state.email}</Text>
                                </View>
                      
                        </View>
                </View>
                
                    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('EditPM')}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Edit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </View>
        )
    }
}

// const AccountPM = ({navigation}) => {



// useEffect(()=>{
//     Boiler();
//   //  fetchData();
//     //fetchDataDetail();
//   },[])


//     const sendData = async ()=>{
//         console.log(img.data)  
//       //  console.log(name+' '+type)
//         //console.log(response.data)
//             const config = {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             },
//             body:JSON.stringify({
//                 "fileData":'data:'+img.type+';base64,'+ [img.data],
//                 "nama":nama,
//                 "telp":telp,
//                 "ktp":ktp,
//                 "email":email,
//                 "password":password,
//                 "fileName":img.fileName,
//                 "type":img.type,
//                 "_id":data._id,
//                 "image":data.image,
                
//             }),
//             };
//             fetch("http://mppk-app.herokuapp.com/update-data-user", config)
//             .then((checkStatusAndGetJSONResponse)=>{       
//                 navigation.replace('ListProjectPM',{id:iduser})
//             }).catch((err)=>{console.log(err)});

           
//     }

// const openGallery = async () => {
//     const options = {
       
//     }
//     ImagePicker.launchImageLibrary(options, (response) => {
//       //  console.log('Response = ', response);
          
//         if(response.didCancel){
//             console.log('User cancelled image picker');
//         }
//         else{
//            setImg(response)
//         }
//     })
// }
//   return(

//     );
//   };

  
  
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
  text: {
    color: "black",
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'left',
    marginVertical:5,
    marginHorizontal:20,width:'28%'
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
  text2: {
    color: "black",
    fontWeight:'bold',
    fontSize: 16,
    //fontWeight: "bold",
    textAlign:'center',
    marginVertical:5,
    marginHorizontal:20,
  },
  container:{
    flex:1,
    marginHorizontal:10,
    marginVertical:10,
    borderRadius:25,
            //paddingLeft: 10,
            backgroundColor:'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 7,
            
  },
  container2:{
    flex:1,
    marginHorizontal:10,
    marginVertical:10,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
   // borderRadius:25,
            //paddingLeft: 10,
            backgroundColor:'white',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 7,
            
  }
});
export default AccountPM;

