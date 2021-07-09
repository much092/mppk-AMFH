import React from 'react';
import { Component,useState,useEffect } from 'react';
import { Image, StyleSheet, Text, View, Alert,Button } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

class AddProject extends Component{
   //variabel
    state = {
        client: '',
        nama: '',
        tglMulai: '',
        tglSelesai: '',
        tgl1: '',
        tgl2: '',
        deskripsi: '',
        client: '',
        budget: '',
        lokasi: '',
        list: [],
        date:  Date.now(),
        mode: 'date',
        show: false,
        date2:  Date.now(),
        mode2: 'date',
        show2: false,
    }

        
    componentDidMount(){
        this.fetchData();
    }
    
    /// mengambil data client
    fetchData = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataClient')
        .then(res=>res.json())
        .then(data=>{
            this.setState({list:data})
        })
    }
        
    sendData = async (props)=>{
        const { navigation } = this.props;
        const mulai = Date.parse(this.state.tgl1)
        const selesai = Date.parse(this.state.tgl2)

        if (!this.state.nama.trim()) {
            alert('Please Enter Nama Project');
        }
        else if(!this.state.tglMulai.trim()){
            alert('Please Enter Tgl Mulai');
        }
        else if(!this.state.tglSelesai.trim()){
            alert('Please Enter Tgl Selesai');
        }
        else if(!this.state.budget.trim()){
            alert('Please Enter Budget');
        }
        else if(!this.state.lokasi.trim()){
            alert('Please Enter Lokasi');
        }
        else if(!this.state.deskripsi.trim()){
            alert('Please Enter Deskripsi');
        }
        else if(!this.state.client.trim()){
            alert('Please Choose Klien');
        }
        else{
            if (selesai<mulai){
            
                alert('Tgl Selesai lebih kecil dari Tgl Mulai')
            }
            else if(mulai<Date.parse(Moment(Date.now()).format('YYYY-MM-DD'))){
                alert('Tgl Mulai lebih kecil dari tgl sekarang')
            }
            else{
                fetch("http://mppk-app.herokuapp.com/send-data-project",{
        
                    method:"POST",
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                    "nama":this.state.nama,
                    "tglMulai":this.state.tglMulai,
                    "tglSelesai":this.state.tglSelesai,
                    "deskripsi":this.state.deskripsi,
                    "idclient":this.state.client,
                    "status":"undone",
                    "budget":this.state.budget,
                    "lokasi":this.state.lokasi,
                    "aktif":"null"
                    })
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data)
                        if(!data.error){
                            Alert.alert(data.nama+' Tersimpan')
                            navigation.replace("Dashboard")
                        }
                        else{
                            Alert.alert(data.error)
                        }
                    
                    })
            }
        }
        
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({show:false})
        this.setState({date:currentDate})
        this.setState({tgl1:Moment(currentDate).format('YYYY-MM-DD')})
        this.setState({tglMulai:Moment(currentDate).format('DD-MM-YYYY')})
    };
    
    onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({show2:false})
        this.setState({date2:currentDate})
        this.setState({tgl2:Moment(currentDate).format('YYYY-MM-DD')})
        this.setState({tglSelesai:Moment(currentDate).format('DD-MM-YYYY')})
    };
    
    showMode = (currentMode) => {
        this.setState({show:true})
        this.setState({mode:currentMode});
    };

    showMode2 = (currentMode) => {
        this.setState({show2:true})
        this.setState({mode2:currentMode});
    };
    
    showDatepicker1 = () => {
        this.showMode('date');
    };
    
    showDatepicker2 = () => {
        this.showMode2('date');
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
                      Input Data Project
                </Text>
              <ScrollView>
                    <Input
                        placeholder='Nama Project'
                        value={this.state.nama}
                        onChangeText={(text)=>this.setState({nama:text})}
                        leftIcon={
                            <Icon
                            name='file'
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
                    
                    {this.state.show2 && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date2}
                        mode={this.state.mode2}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange2}
                        />
                    )}
                    <TouchableOpacity onPress={this.showDatepicker1} >
                    <Input
                        placeholder='Tgl Mulai'
                        value={this.state.tglMulai}
                        onChangeText={(text)=>this.setState({tglMulai:text})}
                        leftIcon={
                            <Icon
                            name='calendar'
                            size={24}
                            color='black'
                            
                            />
                        }
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showDatepicker2} >
                    <Input
                        placeholder='Tgl Selesai'
                        value={this.state.tglSelesai}
                        onChangeText={(text)=>this.setState({tglSelesai:text})}
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
                        placeholder='Budget'
                        value={this.state.budget}
                        onChangeText={(text)=>this.setState({budget:text})}
                        keyboardType='numeric'
                        leftIcon={
                            <Icon
                            name='dollar'
                            size={24}
                            color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='Alamat'
                        value={this.state.lokasi}
                        onChangeText={(text)=>this.setState({lokasi:text})}
                        leftIcon={
                            <Icon
                            name='home'
                            size={24}
                            color='black'
                            />
                        }
                    />

                  <TextInput style={styles.inputarea}
                     placeholder="Deskripsi"
                     multiline={true}
                     textAlignVertical="top"
                     value={this.state.deskripsi}
                     onChangeText={(text)=>this.setState({deskripsi:text})}
                  ></TextInput>

                  <View style={{flexDirection:'row'}}>
                        
                        <SelectPicker
                            style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                            placeholder="Client"
                            onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                            placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                            onValueChange={(value) => {
                                this.setState({client:value})
                            }}
                            selected={this.state.client}
                            >
                            {Object.values(this.state.list).map((val, index) => (
                                <SelectPicker.Item label={val.nama} value={val._id} key={index} />
                            ))}

                        </SelectPicker>
                    </View>

                  <TouchableOpacity style={styles.btn} onPress={()=>this.sendData()}>
                      <Text style={{fontWeight:'bold',color:'white'}}>Tambah</Text>
                  </TouchableOpacity>
              </ScrollView>
          </View>

          </View>
        )
    }
}

// const AddProject = ({navigation},props) => {
    
//     const [client, setClient] = useState()
//     const [list,setList]=useState([])
//     const [nama,setNama]=useState()
//     const [tglMulai,setTglMulai]=useState('')
//     const [tglSelesai,setTglSelesai]=useState('')
//     const [tgl1,setTgl1]=useState()
//     const [tgl2,setTgl2]=useState()
//     const [deskripsi,setDeskripsi]=useState()
//     const [budget,setBudget]=useState()
//     const [lokasi,setLokasi]=useState()
//     //console.log()

 
//      }
     
//     useEffect(()=>{
//         fetchData();
        
//       },[])
   
    
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
        backgroundColor:'#0d47a1',
        alignItems:'center',
    }
});
export default AddProject;

