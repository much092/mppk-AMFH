import React, {Component,useState,useEffect} from 'react';
import { TextInput, SafeAreaView, FlatList, View,Text,
        TouchableOpacity,StyleSheet,Image, PermissionsAndroid } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';

import pdf from '../../../src/icons/pdf.png';
import doc from '../../../src/icons/doc.png';
import xls from '../../../src/icons/xls.png';
import jpeg from '../../../src/icons/jpg.png';
import jpg from '../../../src/icons/jpg.png';
import png from '../../../src/icons/png.png';

class Document extends Component{
//   const idproject = route.params.id;
//   const [loading, setLoading] = useState(true);
//   const [list,setList]=useState([])
//   const [file,setFile]= useState('')
//   const [name,setName] = useState('')
//   const [type,SetType]=useState('')
  state = {
    idproject: this.props.route.params.id,
    file: '',
    nama: '',
    type: '',
    list: [], 
    loading: true,
  }
  
  componentDidMount(){
    this.fetchData();
  }

  fetchData= async (props)=>{
    fetch("http://mppk-app.herokuapp.com/getDataDocument/"+this.state.idproject)
    .then(res=>res.json())
    .then(data=>{
      this.setState({list:data})
      this.setState({loading:false})
    })
  }
  
  download = async (doc,type,url) =>{
    let name = doc
    let dirs = RNFS.DownloadDirectoryPath;
    console.log("--path--",dirs)
    const file_path = dirs +'/'+name

    console.log(file_path+' '+type)
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

// const Document = ({navigation,route}) => {
//   const idproject = route.params.id;
//   const [loading, setLoading] = useState(true);
//   const [list,setList]=useState([])
//   const [file,setFile]= useState('')
//   const [name,setName] = useState('')
//   const [type,SetType]=useState('')
//   console.log(idproject)

//   useEffect(()=>{
//     fetchData();
    
//   },[])
 

//   const renderItem = ({ item }) => (
    
//     <Item 
//     name={item.fileName} 
//     id={item._id}
//     type={item.type}
//     />
//   );
  
//   const Item = ({ deskripsi,name,type }) => (
  
    
//     <TouchableOpacity  style={{backgroundColor:'grey', }} >
//     <View 
//     style={{
//         flexDirection:'row' ,
//         borderBottomWidth:0,
//         backgroundColor:'white',
//         paddingVertical:10,
//         paddingHorizontal:20,
//         borderRadius:6,
//         alignItems:'center',
//         justifyContent:'space-between'
  
//     }}>
      
//       <View style={{width:'80%', flexDirection:'row'}}>
//       {
//         type === 'application/pdf'?(
//           <Image source={pdf} style={{color:'white',height:30,width:30}}/>
//         ):
//         type === 'image/jpeg' || type === 'image/jpg'?(
//           <Image source={jpeg} style={{color:'white',height:30,width:30}}/>
//         ):
//         type === 'image/png'?(
//           <Image source={png} style={{color:'white',height:30,width:30}}/>
//         ):
//         type === 'application/doc'?(
//           <Image source={doc} style={{color:'white',height:30,width:30}}/>
//         ):
//         (
//           <Image source={xls} style={{color:'white',height:30,width:30}}/>
//         )

//       }
//       <Text style={{fontSize:16, paddingLeft:10}}>{name}</Text>
      
//       </View>
//       <View>
//       <TouchableOpacity onPress={()=>download(name,type)} style={styles.btndownload}>
//         <Icon name="download" size={25} color="white"></Icon>
//       </TouchableOpacity>
//       </View>
      
//     </View>
    
//     </TouchableOpacity>
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
      
  }
    
});
export default Document;
