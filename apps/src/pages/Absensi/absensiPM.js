import React,{useState,useEffect, Component} from 'react';
import { Alert, Image, StyleSheet, Text, View,SafeAreaView, FlatList} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Avatar } from 'react-native-elements';
import SelectPicker from 'react-native-form-select-picker';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
 
class AbsensiPM extends Component{

    state = {
        iduser: '',
        keterangan: '',
        deskripsi: '',
        idproject:this.props.route.params.id,
        status: this.props.route.params.status,
        loading: true,
        filteredDataSource: [],
        listPegawai: [],
        tanggal:'',
        date:  Date.now(),
        mode: 'date',
        show: false,
    }
    
    componentDidMount(){
        console.log(this.state.idproject)
        this.setState({tanggal:Moment(Date.now()).format('DD-MM-YYYY')})
        this.fetchData();
    }

    fetchData = async (props)=>{
        fetch('http://mppk-app.herokuapp.com/getDataTeam/'+this.state.idproject)
        .then(res=>res.json())
        .then(data=>{
            this.setState({filteredDataSource:data});
            this.setState({loading:false})
        })
    }

    sendData = async (props)=>{
        const { navigation } = this.props;
            fetch("http://mppk-app.herokuapp.com/send-data-absen",{
            
            method:"POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
            "iduser":this.state.iduser,
            "idproject":this.state.idproject,
            "date":Moment(Date.now()).format('DD-MM-YYYY'),
            "keterangan":this.state.keterangan,
            "deskripsi":this.state.deskripsi,
            })
            })
            .then(res=>res.json())
            .then(data=>{
                if(!data.error){
                    Alert.alert('Absensi Berhasil ')
                    this.setState({keterangan:''})
                    this.setState({deskripsi:''})
                    this.setState({iduser:''})
                    navigation.replace("AbsensiPM",{id:this.state.idproject})
                }
                else{
                    Alert.alert(data.error)
                }
            
            })
    }
    
    
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({show:false})
        this.setState({date:currentDate})
        this.setState({tanggal:Moment(currentDate).format('DD-MM-YYYY')})
    };
    
    
    showMode = (currentMode) => {
            this.setState({show:true})
            this.setState({mode:currentMode});
        };
        
    showDatepicker1 = () => {
            this.showMode('date');
        };

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
                    <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>Absensi</Text>
                </View>
            
            {
              this.state.status==='yes'?(
                <View style={{height:'35%'}}>
                
                <ScrollView>
                    
                            <SelectPicker
                                style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                                placeholder="Nama Pegawai"
                                onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                onValueChange={(value) => {
                                    this.setState({iduser:value})
                                }}
                                selected={this.state.iduser}
                                >
                                {Object.values(this.state.filteredDataSource).map((val, index) => (
                                    <SelectPicker.Item label={val.user.nama} value={val.user._id} key={val._id} />
                                ))}

                            </SelectPicker>
                        <View style={{flexDirection:'row'}}>
                            
                            <SelectPicker
                                style={{flex:1,borderBottomWidth:0.7,marginHorizontal:"3%", marginBottom:17}}
                                placeholder="Keterangan"
                                onSelectedStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                placeholderStyle={{fontSize: 20, color:'#757575',paddingLeft:10}}
                                onValueChange={(value) => {
                                    this.setState({keterangan:value})
                                }}
                                selected={this.state.keterangan}
                                >
                                <SelectPicker.Item label="Masuk" value="masuk"  />
                                <SelectPicker.Item label="Tidak Masuk" value="tidak masuk"  />
                            

                            </SelectPicker>
                        </View>
                        <Input
                            placeholder='Deskripsi'
                            value={this.state.deskripsi}
                            onChangeText={(text)=>this.setState({deskripsi:text})}
                            style={{marginHorizontal:"5%"}}
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
                            placeholder='Tanggal'
                            value={this.state.tanggal}
                            onChangeText={(text)=>this.setState({tanggal:text})}
                            leftIcon={
                                <Icon
                                name='calendar'
                                size={24}
                                color='black'
                                
                                />
                            }
                        />
                        </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={()=> this.sendData()}>
                        <Text style={{fontWeight:'bold',color:"white"}}>Absen</Text>
                    </TouchableOpacity>
                </ScrollView>
                </View>
            
              ):(
                <></>
              )
            }
            <SafeAreaView style={{ flex: 1 }}>
                
                <FlatList
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={() => {navigation.navigate('ListAbsensiPM',{id:item.user._id,status:item.user.status,idproject:this.state.idproject})}} >
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
                          
                          <Image source={{uri:item.user.image}} style={{width:50,height:50,borderRadius:25}}></Image>
                          <View style={{width:'70%'}}>
                          
                          <Text style={{fontSize:16, paddingLeft:10}}>{item.user.nama}</Text>
                          <Text style={{paddingLeft:10,color:'grey'}}>{item.user.email}</Text>
                          {
                            item.user.status === 'karyawan'?(
                              <Text style={{paddingLeft:10,color:'grey'}}>Pekerja</Text>
                            ):(
                              <Text style={{paddingLeft:10,color:'grey'}}>mandor</Text>
                            )
                          }
                          
                          </View>
                          
                        </View>
                        </TouchableOpacity>
                      )}
                      onRefresh={this.fetchData}
                      refreshing={this.state.loading}
                      data={this.state.filteredDataSource}
                      keyExtractor={(Item, index) => index.toString()}
                      ItemSeparatorComponent={this.renderSeparatorView}
                />
                
            </SafeAreaView>

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
export default AbsensiPM;

