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
//import ImagePicker from 'react-native-image-picker'
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class FotoTask extends Component{
  state = {
    idproject: this.props.route.params.id,
    idpegawai: this.props.route.params.idp,
    idTask: '',
    deskripsi: '',
    nama: '',
    img: [],
    img2: '',
    listTask: [],
    list: [],
    loading: true,
    modalVisible: false,
    uploading:false,transferred:0,
    status: this.props.route.params.status,
  }

  componentDidMount(){
    this.fetchData();
    this.fetchDataTask();
    this.fireauth();
  }

  fireauth(){
    auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
  
      console.error(error);
    });
  }

  fetchDataTask= async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataAllTask/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({listTask:data})
      this.setState({loading:false})
    })
  }
  fetchData= async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataFotoTask/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({list:data})
      this.setState({loading:false})
    })
  }

  sendData = async (props)=>{
    const { navigation } = this.props;
    
    if (!this.state.idTask.trim()) {
      alert('Please Choose Task');
    }
    else if (!this.state.deskripsi.trim()) {
      alert('Please Enter Deskripsi');
    }
    else if (!this.state.nama.trim()){
      alert('Please Pick Image')
    }
    else{

      ImageResizer.createResizedImage(this.state.img.path, 400, 400, 'JPEG', 100)
      .then(async ({uri}) => {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =  uri.replace('file://', '') ;

        console.log(filename)
        console.log(uploadUri)
        console.log(uri)

        this.setState({uploading:true})
        this.setState({transferred:0})

        const task = storage()
          .ref('foto/'+filename)
          .putFile(uploadUri);
        task.on('state_changed', snapshot => {
            this.setState({transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000});
           });
        
  
           try {
            await task;
            const url = await storage()
            .ref('foto/'+filename)
            .getDownloadURL();
      
            console.log(url)
      
                fetch("http://mppk-app.herokuapp.com/send-data-fototask",{
                  method:"POST",
                  headers: {
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                 // "fileData":'data:'+this.state.img.type+';base64,'+ [this.state.img.data],
                  "image":filename,
                 // "type":this.state.img.type,
                  "idtask":this.state.idTask,
                  "deskripsi":this.state.deskripsi,
                  "idproject":this.state.idproject,
                  "url":url,
                })
                })
                .then(res=>res.json())
                .then((data)=>{
                  console.log(data)
                  try {
                   //   Alert.alert('data tersimpan')
                      this.setState({nama:''})
                      this.setState({deskripsi:''})
                      this.setState({idTask:''})
                      this.setState({uploading:false})
                      Alert.alert(
                        'File uploaded!',
                        'Your File has been uploaded!'
                      );
                      navigation.replace('FotoTask',{id:this.state.idproject,idp:this.state.idpegawa,status:this.state.status})
                      
                    } catch (e) {
                      console.log("error hai",e)
                      Alert(e)
                    }
                })
          
            } catch (e) {
            console.error(e);
          }

      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to resize the photo',
          'Check the console for full the error message',
        );
      });

     
      
   }
    
    
  }

  openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      console.log(image);
      this.setState({img:image})
      const filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      console.log(filename)
      this.setState({nama:filename})
    });
    // console.log('aaa')
    // const options = {
      
    // }
    // ImagePicker.launchImageLibrary(options, (response) => {
    //   //  console.log('Response = ', response);
          
    //     if(response.didCancel){
    //         console.log('User cancelled image picker');
    //     }
    //     else{
    //       this.setState({img:response})
    //       this.setState({nama:response.fileName})
    //     }
    // })
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
              paddingVertical:10,
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
          
        
            {
              this.state.status==='yes'?(
                <View style={{marginHorizontal:0,paddingVertical:20,backgroundColor:'white'}}>
                 <View style={{flexDirection:'row',marginHorizontal:20,height:50,alignItems:'center'}}>
                    <Text style={{fontSize:20,width:'25%'}}>File</Text>
                    <TextInput style={{
                            flex:1,borderWidth:1,height:40,justifyContent:'center'}}
                            value ={this.state.nama}
                    >

                    </TextInput>
                    <TouchableOpacity onPress={()=>this.openGallery()}
                                      style={{
                                            backgroundColor:'#0d47a1',
                                            width:40,height:40,
                                            marginLeft:10,borderRadius:10,
                                            justifyContent:'center',alignItems:'center',
                    }}>
                      <Icon name="paperclip" size={20} color="white"></Icon>
                    </TouchableOpacity>
                  </View>

                  <View style={{flexDirection:'row',marginHorizontal:20,height:50,alignItems:'center'}}>
                    <Text style={{fontSize:20,width:'25%'}}>Nama</Text>
                    <SelectPicker
                              style={{flex:1,borderBottomWidth:1, borderBottomColor:'#bdbdbd'}}
                              placeholder="Task"
                              onSelectedStyle={{fontSize: 20, color:'black',paddingLeft:10}}
                              placeholderStyle={{fontSize: 20, color:'black',}}
                              onValueChange={(value) => {
                                  this.setState({idTask:value})
                              }}
                              selected={this.state.idTask}
                              >
                              {Object.values(this.state.listTask).map((val, index) => (
                                  <SelectPicker.Item label={val.nama_task} value={val._id} key={val._id} />
                              ))}

                    </SelectPicker>
                  </View>

                  <View style={{flexDirection:'row',marginHorizontal:20,height:50,alignItems:'center'}}>
                    <Text style={{fontSize:20,width:'25%'}} >Deskripsi</Text>
                    <TextInput style={{
                          flex:1, borderWidth:1,height:40,}}
                            
                          value ={this.state.deskripsi}
                          onChangeText={(text)=>this.setState({deskripsi:text})}
                    >

                    </TextInput>
                  </View>
                   
                      {this.state.uploading ? (
                          <View style={styles.progressBarContainer}>
                            <ProgressBar progress={this.state.transferred} width={300} />
                          </View>
                        ) : (
                          <TouchableOpacity style={styles.btn} onPress={()=>this.sendData()} >
                            <Text style={{fontWeight:'bold',color:'white'}}>Simpan</Text>
                          </TouchableOpacity>
                        )}
               </View>
              ):(
                <></>
              )
            }
            
            <ScrollView style={{flex:1,marginVertical:0}}>
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
            </ScrollView>
            <Overlay isVisible={this.state.modalVisible} 
                        backdropStyle={{opacity:0}}
                      overlayStyle={styles.modalView}
                      onBackdropPress={()=>this.setState({modalVisible:false})}>
                <Image
                        source={{ uri: this.state.img2 }}
                        style={{height:'100%',width:'100%',backgroundColor:'white'}}
                        resizeMode='contain'
                    />
              </Overlay>
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
   progressBarContainer: {
     marginVertical: 20,
     justifyContent:'center',alignItems:'center'
   },
  });
export default FotoTask;
