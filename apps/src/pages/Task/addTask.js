import React,{useState,useEffect, Component} from 'react';
import { Image, StyleSheet, Text, View,Alert  } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import Tab from '../Tab/tabPM';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

class AddTask extends Component{

    state = {
        idproject: this.props.route.params.idproject,
        iduser: this.props.route.params.iduser,
        nama: this.props.route.params.nama,
        status: this.props.route.params.status,
        start: this.props.route.params.tglmulai,
        end: this.props.route.params.tglselesai,
        idModule:'',
        task:'', 
        tglMulai: '',
        tglSelesai: '',
        tgl1: '',
        tgl2: '',
        spesifikasi: '',
        module: [],
        date:  Date.now(),
        mode: 'date',
        show: false,
        date2:  Date.now(),
        mode2: 'date',
        show2: false,
        loading: true,
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate)
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
    
    componentDidMount(){
        console.log(this.state.start+" "+this.state.end)
        console.log((Moment(this.state.start,'YYYY-MM-DD')))
        // console.log((Moment('2021-04-04').format('YYYY-MM-DD'))+" "+Date.parse(this.state.end.toString()))
        this.fetchDataModule();
    }
        
    fetchDataModule = async (props)=>{
        fetch("http://mppk-app.herokuapp.com/getDataModule/"+this.state.idproject)
        .then(res=>res.json())
        .then(data=>{
            this.setState({module:data})
            this.setState({loading:false})
        })
    }

    
    sendData = async (props)=>{
        const { navigation } = this.props;
        const mulai = Date.parse(this.state.tgl1)
        const selesai = Date.parse(this.state.tgl2)

        
        const mstart = (Moment(this.state.start.split("-").reverse().join("-"),'YYYY-MM-DD'));
        const mend = (Moment(this.state.end.split("-").reverse().join("-"),'YYYY-MM-DD'));
        const start = Date.parse(Moment(mstart).format('YYYY-MM-DD'))
        const end = Date.parse(Moment(mend).format('YYYY-MM-DD'))

        console.log(mulai+" "+start);
        if (!this.state.idModule.trim()) {
            alert('Please Choose Kategori Pekerjaan');
        }
        else if(!this.state.task.trim()){
            alert('Please Enter Task');
        }
        else if(!this.state.tglMulai.trim()){
            alert('Please Enter Tgl Mulai');
        }
        else if(!this.state.tglSelesai.trim()){
            alert('Please Enter Tgl Selesai');
        }
        else if(!this.state.spesifikasi.trim()){
            alert('Please Enter Spesifikasi');
        }
        else{
            if (selesai<mulai){
            
                alert('Tgl Selesai lebih kecil dari Tgl Mulai')
            }
            else if(mulai<Date.parse(Moment(Date.now()).format('YYYY-MM-DD'))){
                alert('Tgl Mulai lebih kecil dari tgl sekarang')
            }
            else if (mulai<start){
            
                alert('Tgl mulai tidak boleh lebih kecil dri tgl mulai proyek')
            }
            else if (selesai>end){
            
                alert('Tgl selesai tidak boleh lebih besar dari tgl selesai proyek')
            }
            else{
                fetch("http://mppk-app.herokuapp.com/send-data-task",{
                
                method:"POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                "nama_task":this.state.task,
                "status":"none",
                "approved":"none",
                "tglMulai":this.state.tglMulai,
                "tglSelesai":this.state.tglSelesai,
                "spesifikasi":this.state.spesifikasi,
                "idmodule":this.state.idModule,
                })
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    if(!data.error){
                        Alert.alert('Data Tersimpan')
                        navigation.goBack()
                        navigation.replace('Task',{id:this.state.idproject,status:this.state.status,tglmulai:this.state.start,tglselesai:this.state.end})
                    }
                    else{
                        Alert.alert(data.error)
                    }
                
                })
        }
        
        }
    }
  
    render(){
        const { navigation } = this.props;
        return(
            <View style={{ flex: 1,
                backgroundColor:'white', }}>
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
                    <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
                        Input Task
                    </Text>
                </View>
            <View style={{flex:1}}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            padding: 16,
                            height: 600,
                        }}
                        >
                        
                        <View style={{flexDirection:'row'}}>
                                <SelectPicker
                                            style={{flex:1,borderBottomWidth:1, borderBottomColor:'#bdbdbd',marginHorizontal:"3%", marginVertical:0}}
                                            placeholder="Kategori Pekerjaan"
                                            onSelectedStyle={{fontSize: 20, color:'black',paddingLeft:10}}
                                            placeholderStyle={{fontSize: 20, color:'black',}}
                                            onValueChange={(value) => {
                                                this.setState({idModule:value})
                                            }}
                                            selected={this.state.idModule}
                                            >
                                            {Object.values(this.state.module).map((val, index) => (
                                                <SelectPicker.Item label={val.kategori_pekerjaan} value={val._id} key={val._id} />
                                            ))}

                                </SelectPicker>
                        </View>

                        <Input style={{marginVertical:10}}
                            color="black"
                            placeholderTextColor='black'
                            placeholder= "Sub Task"
                            value={this.state.task}
                            onChangeText={(text)=>this.setState({task:text})}
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
                            rightIcon={
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
                            rightIcon={
                                <Icon
                                name='calendar'
                                size={24}
                                color='black'
                                />
                            }
                        />
                        </TouchableOpacity>

                        <Input style={{marginVertical:10}}
                            color="black"
                            placeholderTextColor='black'
                            placeholder= "Spesifikasi"
                            value={this.state.spesifikasi}
                            onChangeText={(text)=>this.setState({spesifikasi:text})}
                        />
                        
                        <TouchableOpacity style={{paddingVertical:13, backgroundColor:'#0d47a1',borderRadius:25}}
                                    onPress={()=>{this.sendData()}}
                                        >
                                        <Text
                                            style={{
                                                fontSize:12,
                                                fontWeight:'bold',
                                                color: 'white',
                                                textTransform: 'uppercase',
                                                textAlign: 'center'
                                            }}
                                            >
                                        Simpan
                                        </Text>
                                </TouchableOpacity>
                        
                        </View>
        
            </View>
            
            </View>
        )
    }
}


// const AddTask = ({navigation,route}) => {

// const name = route.params.nama;
// const iduser = route.params.iduser;
// const idproject = route.params.idproject;
// const [idModule, setIdModule] = useState('');
// const [task, setTask] = useState('');
// const [loading, setLoading] = useState(true);
// const [tglMulai,setTglMulai]=useState()
// const [tglSelesai,setTglSelesai]=useState()
// const [tgl1,setTgl1]=useState()
// const [tgl2,setTgl2]=useState()
// const [spesifikasi,setSpesifikasi]=useState()
// const [module,setModule]=useState([])

// console.log(iduser)

//  const [date, setDate] = useState(Date.now());
//  const [mode, setMode] = useState('date');
//  const [show, setShow] = useState(false);
 
//  const [date2, setDate2] = useState(Date.now());
//  const [mode2, setMode2] = useState('date');
//  const [show2, setShow2] = useState(false);
 
//  const onChange = (event, selectedDate) => {
//      const currentDate = selectedDate || date;
//      setShow(false);
//      setDate(currentDate);
//      setTgl1(Moment(currentDate).format('YYYY-MM-DD'))
//      setTglMulai(Moment(currentDate).format('DD-MM-YYYY'))
//  };
 
//  const onChange2 = (event, selectedDate) => {
//      const currentDate = selectedDate || date;
//      setShow2(false);
//      setDate2(currentDate);
//      setTgl2(Moment(currentDate).format('YYYY-MM-DD'))
//      setTglSelesai(Moment(currentDate).format('DD-MM-YYYY'))
//  };
 
//  const showMode = (currentMode) => {
//      setShow(true);
//      setMode(currentMode);
//  };
//  const showMode2 = (currentMode) => {
//      setShow2(true);
//      setMode2(currentMode);
//  };
 
//  const showDatepicker1 = () => {
//      showMode('date');
//  };
 
//  const showDatepicker2 = () => {
//      showMode2('date');
//  };
 
 
// useEffect(()=>{
//     fetchDataModule();
    
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
export default AddTask;

