import React,{Component, useState} from 'react';
import { Alert, Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
 
class AddPegawai extends Component{
    
    state = {
        email: '',
        nama: '',
        ktp: '',
        telp: '',
        status: '',
        tglLahir: '',
        date:  Date.now(),
        mode: 'date',
        show: false,
     }
     
     
    sendCred = async (props)=>{
        const { navigation } = this.props;
        if (!this.state.ktp.trim()) {
            alert('Masukkan KTP');
        }
        else if(!this.state.email.trim()){
            alert('Masukkan Email');
        }
        else if(!this.state.nama.trim()){
            alert('Masukkan Nama');
        }
        else if(!this.state.tglLahir.trim()){
            alert('Masukkan tgl lahir');
        }
        else if(!this.state.telp.trim()){
            alert('Masukkan Telp');
        }
        else if(!this.state.status.trim()){
            alert('Pilih Status');
        }
        else if(this.state.ktp.length < 16 || this.state.ktp.length > 16){
            alert('Digit NIK harus 16')
        }
        else{
            fetch("http://mppk-app.herokuapp.com/send-data-pegawai",{
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            "email":this.state.email,
            "status":this.state.status,
            "nama":this.state.nama,
            "ktp":this.state.ktp,
            "telp":this.state.telp,
            "aktif":'no',
            "tgl_lahir":this.state.tglLahir
            })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(!data.error){
                    Alert.alert(data.nama+' Tersimpan')
                    navigation.replace("Dashboard")
                    //console.log("sukses")
                }
                else{
                    console.log('aa')
                    Alert.alert(data.error)
                }
            
            })
        }
        
    }
        
    onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            this.setState({show:false})
            this.setState({date:currentDate})
            this.setState({tglLahir:Moment(currentDate).format('DD-MM-YYYY')})
        };
        
        
    showMode = (currentMode) => {
            this.setState({show:true})
            this.setState({mode:currentMode});
        };
        
    showDatepicker1 = () => {
            this.showMode('date');
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
                        Input Data Pegawai
                    </Text>
                <ScrollView>
                        <Input
                            placeholder='No. KTP'
                            value={this.state.ktp}
                            onChangeText={(text)=>this.setState({ktp:text})}
                            keyboardType='numeric'
                            leftIcon={
                                <Icon
                                name='id-card'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        <Input
                            placeholder='Email'
                            value={this.state.email}
                            onChangeText={(text)=>this.setState({email:text})}
                            autoCapitalize='none'
                            leftIcon={
                                <Icon
                                name='envelope'
                                size={24}
                                color='black'
                                />
                            }
                        />
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
                        {this.state.show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                            />
                        )}
                        
                        <TouchableOpacity onPress={this.showDatepicker1} >
                        <Input
                            placeholder='Tgl Lahir'
                            value={this.state.tglLahir}
                            onChangeText={(text)=>this.setState({tglLahir:text})}
                            leftIcon={
                                <Icon
                                name='calendar'
                                size={24}
                                color='black'
                                
                                />
                            }
                        />
                        </TouchableOpacity>
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
                        <View style={{flexDirection:'row'}}>
                            
                            <SelectPicker
                                style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                                placeholder="Status"
                                onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                onValueChange={(value) => {
                                    this.setState({status:value})
                                }}
                                selected={this.state.status}
                                >
                                <SelectPicker.Item label="Pekerja" value="karyawan"  />
                                <SelectPicker.Item label="Mandor" value="pm"  />
                            

                            </SelectPicker>
                        </View>
                    

                    <TouchableOpacity style={styles.btn} onPress={()=> this.sendCred()}>
                        <Text style={{fontWeight:'bold',color:"white"}}>Tambah</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    },
    picker:{
        //borderWidth:2,
        marginHorizontal:10,
    }
});
export default AddPegawai;

