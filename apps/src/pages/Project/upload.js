import React, { useState } from 'react';
import { Image, StyleSheet, Text, View ,Button,PermissionsAndroid, Alert} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FilePickerManager from 'react-native-file-picker';
import RNFetchBlob from 'rn-fetch-blob'
import { Input } from 'react-native-elements';
import RNFS from 'react-native-fs';
import Alat from '../Alat';

const Upload= ({navigation,route}) => {
  
   const idproject = route.params.id;
   const [file,setFile]= useState('')
   const [name,setName] = useState('')
   const [type,SetType]=useState('')

   console.log(idproject)

   const sendData = async ()=>{
    console.log(file)  
    console.log(name+' '+type)
    //console.log(response.data)
        const config = {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            "fileData":'data:'+type+';base64,'+ [file],
            "fileName":name,
            "type":type,
            "idproject":idproject
          }),
        };
        fetch("http://mppk-app.herokuapp.com/" + "upload", config)
        .then((checkStatusAndGetJSONResponse)=>{       
            Alert.alert('Sukses')
        }).catch((err)=>{console.log(err)});

        setName('')
   }

    const openGallery = async () => {
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
           console.log(response)
           RNFetchBlob.fs.readFile(response.uri,'base64')
            // files will an array contains filenames
            .then((files) => {
              //setState({base64Str:files})
             //console.log(files)
              setName(response.fileName)
              setFile(files)
              SetType(response.type)
            })
          }
        });

      }
           //   console.log(response.data)
                  // const config = {
                  // method: 'POST',
                  // headers: {
                  // Accept: 'application/json',
                  // 'Content-Type': 'application/json',
                  // },
                  // body:JSON.stringify({
                  //     "fileData":'data:'+response.type+';base64,'+ [files],
                  //     "fileName":response.fileName,
                  //     "type":response.type,
                  //     "idproject":idproject
                  //   }),
                  // };
                  // fetch("http://mppk-app.herokuapp.com/" + "upload", config)
                  // .then((checkStatusAndGetJSONResponse)=>{       
                  // console.log(checkStatusAndGetJSONResponse);
                  // }).catch((err)=>{console.log(err)});
           
        // ImagePicker.launchImageLibrary(options, (response) => {
        //         console.log('Response = ', response);
          
        //         if(response.didCancel){
        //           console.log('User cancelled image picker');
        //         }
        //         else{
        //        //  this.setState({ fileURL: response.uri });
        //         }
         
        // ImagePicker.launchImageLibrary({}, (response) => {
        //     console.log('Response = ', response);
        //   if (response.didCancel) {
        //     console.log('User cancelled image picker');
        //   }else if (response.error) {
        //    console.log('ImagePicker Error: ', response.error);
        //   }else if (response.customButton) {
        //    console.log('User tapped custom button: ', response.customButton);
        //   }else {
        //    // console.log('User selected a file form camera or gallery', response); 
        //     const data = new FormData();
        //     data.append('name', 'avatar');
        //     data.append('fileData', {
        //     uri : response.uri,
        //     type: response.type,
        //     name: response.fileName
        //     });

        //     console.log(response.data)
        //     const config = {
        //     method: 'POST',
        //     headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify({
        //         "fileData":'data:'+response.type+';base64,'+ [response.data],
        //         "fileName":response.fileName,
        //         "type":response.type
        //       }),
        //     };
        //     fetch("http://mppk-app.herokuapp.com/" + "upload", config)
        //     .then((checkStatusAndGetJSONResponse)=>{       
        //     console.log(checkStatusAndGetJSONResponse);
        //     }).catch((err)=>{console.log(err)});
        //   }
        // })
    

    const down =()=>{
      let url = 'https://media.suara.com/pictures/480x260/2019/12/26/49091-gambar.jpg'
      let name = Date.now()+'_logo.pdf'
      let dirs = RNFS.DownloadDirectoryPath;
      console.log("--path--",dirs)
      const file_path = dirs +'/'+name

      const fs = RNFetchBlob.fs;
      let imagePath = null;
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads : {
          // Show notification when response data transmitted
          notification : true,
          // Title of download notification
          title : name,
          // File description (not notification description)
          description : 'An image file.',
          mime : 'image/png',
          // Make the file scannable  by media scanner
          mediaScannable : true,
        }
      })
        .fetch("GET", "http://mppk-app.herokuapp.com/doc.pdf")
        // the image is now dowloaded to device's storage
        .then(resp => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile("base64");
         // console.log(resp)
        })
        .then(base64Data => {
          // here's base64 encoded image
          console.log(base64Data);
        
          RNFetchBlob.fs.createFile(file_path,base64Data,'base64')
          .then((rep) => { 
           // console.log(rep);
            return fs.unlink(imagePath);
          })
          .catch((error) => {
            console.log(error);
          });
          // remove the file from storage
        });
    }
  return(
    <View style={{ flex: 1 }}>

    <View style={{flex:1}}>
        <Text style={{
            marginVertical:30, 
            marginHorizontal:50, 
            justifyContent:'center', 
            textAlign:'center',
            fontSize:20, fontWeight:'bold'}}
            >
                Upload Dokumen
          </Text>
        <View>
              <View style={{
                  backgroundColor:'#bbdefb',
                  marginHorizontal: 20,
                  opacity:1,
              }}>
              <TextInput style={styles.input}
                  placeholder=""
              >{name}</TextInput>
              
              <TouchableOpacity style={styles.btnchoose} onPress={()=>openGallery()} > 
                  <Text style={{fontWeight:'bold',color:'white'}}>Choose File</Text>
              </TouchableOpacity>

              </View>
              
              <TouchableOpacity style={styles.btn} onPress={()=>sendData()} >
                  <Text style={{fontWeight:'bold',color:'white'}}>Upload</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btn} onPress={()=>down()} >
                  <Text style={{fontWeight:'bold',color:'white'}}>download</Text>
              </TouchableOpacity>
          </View>
    </View>
    
    </View>
  );
};



const styles=StyleSheet.create({
  input: { 
      marginVertical:10,
      borderWidth:2,
      borderRadius:10,
      paddingHorizontal:10,
      marginHorizontal:10,

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
      borderRadius:20,
      paddingVertical:10,
      marginHorizontal:100,
      backgroundColor:'#1565c0',
      alignItems:'center',
  }
});

export default Upload;

