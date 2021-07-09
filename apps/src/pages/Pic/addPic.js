import React from 'react';
import { Component,useState,useEffect } from 'react';
import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';

class AddPic extends Component{
    state = {
        listProject: [],
        listPegawai:[],
        project:'',
        pm: '',
    }

    componentDidMount(){
        this.fetchDataProject();
        this.fetchDataPegawai();
    }

    fetchDataProject = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataProjectPIC')
        .then(res=>res.json())
        .then(data=>{
            this.setState({listProject:data})
        })
    }

    fetchDataPegawai = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataPM')
        .then(res=>res.json())
        .then(data=>{
            this.setState({listPegawai:data})
        })
    }

    sendData = async ()=>{
        const { navigation } = this.props;
        if (!this.state.pm.trim()) {
            alert('Please Choose Mandor');
        }
        else if(!this.state.project.trim()){
            alert('Please Choose Project');
        }
        else{
            fetch("http://mppk-app.herokuapp.com/send-data-pic",{
                method:"POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                "iduser":this.state.pm,
                "idproject":this.state.project,
                })
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(!data.error){
                        Alert.alert('Data tersimpan')
                        navigation.replace("Dashboard")
                    }
                    else{
                        Alert.alert(data.error)
                    }
                
                })
        }
        
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
                <Text style={{
                    marginVertical:30, 
                    marginHorizontal:50, 
                    justifyContent:'center', 
                    textAlign:'center',
                    fontSize:20, fontWeight:'bold'}}
                    >
                        Input Data PIC
                    </Text>
                <View>
                    <View style={{flexDirection:'row'}}>
                            
                            <SelectPicker
                                style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                                placeholder="Nama Project Manager"
                                onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                onValueChange={(value) => {
                                    this.setState({pm:value})
                                }}
                                selected={this.state.pm}
                                >
                                {Object.values(this.state.listPegawai).map((val, index) => (
                                    <SelectPicker.Item label={val.nama} value={val._id} key={val._id} />
                                ))}

                            </SelectPicker>
                        </View>
                        
                        <View style={{flexDirection:'row'}}>
                            
                            <SelectPicker
                                style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                                placeholder="Nama Project"
                                onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                onValueChange={(value) => {
                                    this.setState({project:value})
                                }}
                                selected={this.state.project}
                                >
                                {Object.values(this.state.listProject).map((val, index) => (
                                    <SelectPicker.Item label={val.nama} value={val._id} key={val._id} />
                                ))}

                            </SelectPicker>
                        </View>

                    <TouchableOpacity style={styles.btn} onPress={()=>this.sendData()}>
                        <Text style={{fontWeight:'bold',color:"white"}}>Tambah</Text>
                    </TouchableOpacity>
                </View>
            </View>

            </View>
        )
    }
}

// const AddPic = ({navigation},props) => {



     
//   useEffect(()=>{
//     fetchDataPegawai();
//     fetchDataProject();
    
//   },[])


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
    btn:{
        marginVertical:10,
        borderRadius:20,
        paddingVertical:10,
        marginHorizontal:100,
        backgroundColor:'#0d47a1',
        alignItems:'center',
    }
});
export default AddPic;

