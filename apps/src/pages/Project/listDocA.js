import React, {Component,useState,useEffect} from 'react';
import { TextInput, SafeAreaView, FlatList, View,Text,
         TouchableOpacity,StyleSheet, PermissionsAndroid, Alert, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
//import * as Progress from 'react-native-progress';
//import PushNotification from 'react-native-push-notification'

import pdf from '../../../src/icons/pdf.png';
import doc from '../../../src/icons/doc.png';
import xls from '../../../src/icons/xls.png';
import jpeg from '../../../src/icons/jpg.png';
import png from '../../../src/icons/png.png';

class ListDocAdmin extends Component{
  state = {
    idproject: this.props.route.params.id,
    status: this.props.route.params.status,
    file: '',
    nama: '',
    type: '',
    list: [],
    loading: true,
    uploading:false,transferred:0,
  }
    
  componentDidMount(){
    this.fetchData();
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

  fetchData= async ()=>{
    fetch("http://mppk-app.herokuapp.com/getDataDocument/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({list:data})
      this.setState({loading:false})
    })
  }

  sendData = async ()=>{
    
    const { navigation } = this.props;
    // console.log(file)  
    // console.log(name+' '+type)
    //console.log(response.data)

    const uri = this.state.file.path;
    const filename = this.state.file.fileName;
    const uploadUri = uri;
    const date = Date.now();

    console.log(uri)
    this.setState({uploading:true})
    this.setState({transferred:0})
    // setUploading(true);
    // setTransferred(0);
    const task = storage()
      .ref('file/'+date+'_'+filename)
      .putFile(uploadUri);
    // // set progress state
     task.on('state_changed', snapshot => {
     this.setState({transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000});
    });
    try {
      await task;
      const url = await storage()
      .ref('file/'+date+'_'+filename)
      .getDownloadURL();

      console.log(url)
      const config = {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body:JSON.stringify({
              //"fileData":'data:'+this.state.type+';base64,'+ [this.state.file],
              "fileName":date+'_'+filename,
              "type":this.state.type,
              "idproject":this.state.idproject,
              "url":url,
            }),
          };
          fetch("http://mppk-app.herokuapp.com/" + "upload", config)
          .then((checkStatusAndGetJSONResponse)=>{       
          // Alert.alert('Sukses')
            this.setState({nama:''})
          }).catch((err)=>{console.log(err)});
    } catch (e) {
      console.error(e);
    }
    this.setState({uploading:false})
    Alert.alert(
      'File uploaded!',
      'Your File has been uploaded!'
    );

    navigation.replace('ListDocAdmin',{id:this.state.idproject,status:this.state.status})  
        
  }

  openGallery = async () => {
        const options = {
          
        }
        FilePickerManager.showFilePicker(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled file picker');
          }
          else if (response.error) {
            console.log('FilePickerManager Error: ', response.error);
          }
          else if (response.uri){
          console.log(response.size)
          
              this.setState({nama:response.fileName})
              this.setState({file:response})
              this.setState({type:response.type})
          // RNFetchBlob.fs.readFile(response.uri,'base64')
          //   // files will an array contains filenames
          //   .then((files) => {
          //     //setState({base64Str:files})
          //   //console.log(files)
          //     this.setState({nama:response.fileName})
          //     this.setState({file:files})
          //     this.setState({type:response.type})
          //   })
          }
        });

      }

  download = async (doc,type,url) =>{
    let name = doc
    let dirs = RNFS.DownloadDirectoryPath;
  // console.log("--path--",dirs)
    const file_path = dirs +'/'+name

    console.log(file_path+' '+type)
    let imagePath = null;
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNFetchBlob
        .config({
            addAndroidDownloads : {
                useDownloadManager : true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification : true,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                mime : type,
                path:file_path,
                description : 'File downloaded by download manager.'
            } 
        })
        .fetch('GET', url)
        .then((resp) => {
          // the path of downloaded file
          resp.path()
        })
      } else {
        console.log("permission denied");
      }
    } catch (err) {
      console.warn(err);
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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Dokumen</Text>
        </View>
      <View style={{flex:1}}>
          {
              this.state.status==='yes'?(
               <View>
                  <View style={{
                  marginHorizontal:0,
                  opacity:1,marginHorizontal:20,
                  flexDirection:'row',justifyContent:'space-between'
                }}>
                <TextInput style={styles.input}
                    placeholder=""
                >{this.state.nama}</TextInput>
                
                <TouchableOpacity style={styles.btnchoose} onPress={()=>this.openGallery()} > 
                  <Icon name="paperclip" size={30} color="white"></Icon>
                </TouchableOpacity>

                </View>
                {this.state.uploading ? (
                  <View style={styles.progressBarContainer}>
                    <ProgressBar progress={this.state.transferred} width={300} />
                  </View>
                ) : (
                  <TouchableOpacity style={styles.btn} onPress={()=>this.sendData()} >
                    <Text style={{fontWeight:'bold',color:'white'}}>Upload</Text>
                  </TouchableOpacity>
                )}
               </View>
             
              ):(
                <></>
              )
            }
        
          <SafeAreaView style={{marginVertical:10}}>
              <FlatList
                data={this.state.list}
                renderItem={({item})=>(
                    <TouchableOpacity  style={{backgroundColor:'grey', }} >
                      <View 
                      style={{
                          flexDirection:'row' ,
                          borderBottomWidth:0,
                          backgroundColor:'white',
                          paddingVertical:10,
                          paddingHorizontal:20,
                          borderRadius:6,
                          alignItems:'center',
                          justifyContent:'space-between'
                    
                      }}>
                        
                        <View style={{width:'80%', flexDirection:'row'}}>
                        {
                          item.type === 'application/pdf'?(
                            <Image source={pdf} style={{color:'white',height:30,width:30}}/>
                          ):
                          item.type === 'image/jpeg'?(
                            <Image source={jpeg} style={{color:'white',height:30,width:30}}/>
                          ):
                          item.type === 'image/png'?(
                            <Image source={png} style={{color:'white',height:30,width:30}}/>
                          ):
                          item.type === 'application/doc'?(
                            <Image source={doc} style={{color:'white',height:30,width:30}}/>
                          ):
                          (
                            <Image source={xls} style={{color:'white',height:30,width:30}}/>
                          )

                        }
                        <Text style={{fontSize:16, paddingLeft:10}}>{item.fileName}</Text>
                        
                        </View>
                        <View>
                        <TouchableOpacity onPress={()=>this.download(item.fileName,item.type,item.url)} style={styles.btndownload}>
                          <Icon name="download" size={25} color="white"></Icon>
                        </TouchableOpacity>
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
      </View>
      
      </View>
    )
  }
}

// const ListDocAdmin = ({navigation,route}) => {


//   useEffect(()=>{
//     fetchData();
    
//   },[])


//   // RNFetchBlob.config({
//   //   fileCache: true,
//   //   addAndroidDownloads : {
//   //     // Show notification when response data transmitted
//   //     notification : true,
//   //     // Title of download notification
//   //     title : name,
//   //     // File description (not notification description)
//   //     description : 'An image file.',
//   //     mime : type,
//   //     // Make the file scannable  by media scanner
//   //     mediaScannable : true,
//   //   }
//   // })
//   //   .fetch("GET", "http://mppk-app.herokuapp.com/"+doc)
//   //   // the image is now dowloaded to device's storage
//   //   .then(resp => {
//   //     // the image path you can use it directly with Image component
//   //     imagePath = resp.path();
//   //     return resp.readFile("base64");
//   //    // console.log(resp)
//   //   })
//   //   .then(base64Data => {
//   //     // here's base64 encoded image
//   //     console.log(base64Data);
    
//   //     RNFetchBlob.fs.createFile(file_path,base64Data,'base64')
//   //     .then((rep) => { 
//   //       console.log(rep);
//   //      // return fs.unlink(imagePath);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//       // remove the file from storage
//     //});
// }


  
//   const Item = ({ deskripsi,name,type }) => (
  
    

//   );
  
//   return(

//     );
//   };
  
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
    btndownload:{
      backgroundColor: '#039be5',  
      width: 36, 
      height: 36, 
      borderRadius:18,
      alignItems:'center',
      justifyContent:'center'
    },
    input: { 
      marginVertical:10,
      borderWidth:2,
      borderRadius:10,
      paddingHorizontal:10,
      width:300

      },
  btn:{
      marginVertical:10,
      borderRadius:20,
      paddingVertical:10,
      marginHorizontal:100,
      backgroundColor:'#0d47a1',
      alignItems:'center',
  },
  
  btnchoose:{
      marginVertical:10,
      borderRadius:25,
      paddingVertical:10,
      backgroundColor:'#1565c0',
      alignItems:'center',
      width:50,height:50
      
  },
  progressBarContainer: {
    marginVertical: 20,
    justifyContent:'center',alignItems:'center'
  },
    
});
export default ListDocAdmin;
