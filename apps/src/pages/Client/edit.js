import React,{useState,useEffect, Component} from 'react';
import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

class EditClient extends Component{
    state = {
        nama: '',
        telp: '',
        alamat: '',
        perusahaan: '',
        ktp: '',
        idClient: this.props.route.params.id,
    }

    componentDidMount(){
        this.fetchData();
        console.log(this.state.idClient)
    }
    
    fetchData = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataClientById/'+ this.state.idClient)
        .then(res=>res.json())
        .then(data=>{
            this.setState({nama:data.nama})
            this.setState({alamat:data.alamat})
            this.setState({telp:data.telp})
            this.setState({perusahaan:data.perusahaan})
            this.setState({ktp:data.ktp})
        })
    }

    sendData = async (props)=>{
        const { navigation } = this.props;
        console.log(this.state.idClient)
        
        if(this.state.ktp.length < 16 || this.state.ktp.length > 16){
            alert('Digit NIK harus 16')
        }
        else{
            fetch("http://mppk-app.herokuapp.com/updateClient/"+ this.state.idClient,{
                method:"POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                "_id":this.state.idClient,
                "perusahaan":this.state.perusahaan,
                "alamat":this.state.alamat,
                "nama":this.state.nama,
                "telp":this.state.telp,
                "ktp":this.state.ktp
                })
            })
            .then(res=>res.json())
            .then(data=>{
                //console.log(data)
                if(!data.error){
                       alert('data berhasil diupdate')
                       navigation.goBack()
                       navigation.replace('DetailClient',{id:this.state.idClient})
                    // console.log("sukses")
                }
                else{
                    console.log(data.error)
                    alert(data.error)
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
                        Edit Data Client
                    </Text>
                <View>
                <Input
                            placeholder='Nama'
                            value={this.state.nama}
                            onChangeText={(text)=>this.setState({nama:text})}
                            leftIcon={
                                <Icon
                                name='user'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='No. KTP / NIK'
                            value={this.state.ktp}
                            onChangeText={(text)=>this.setState({ktp:text})}
                            keyboardType='numeric'
                            leftIcon={
                                <Icon
                                name='user'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='No. Telp'
                            value={this.state.telp}
                            onChangeText={(text)=>this.setState({telp:text})}
                            keyboardType='numeric'
                            leftIcon={
                                <Icon
                                name='phone'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='Alamat'
                            value={this.state.alamat}
                            onChangeText={(text)=>this.setState({alamat:text})}
                            leftIcon={
                                <Icon
                                name='map-marker'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='Nama Perusahaan'
                            value={this.state.perusahaan}
                            onChangeText={(text)=>this.setState({perusahaan:text})}
                            leftIcon={
                                <Icon
                                name='building'
                                size={24}
                                color='black'
                                />
                            }
                        />

                    <TouchableOpacity style={styles.btn} onPress={()=> this.sendData()}>
                        <Text style={{fontWeight:'bold',color:'white'}}>Ubah</Text>
                    </TouchableOpacity>
                </View>
            </View>

            </View>
        )
    }
}

  
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
export default EditClient;

