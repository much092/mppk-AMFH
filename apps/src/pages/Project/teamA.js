import React, {Component,useState,useEffect} from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, Avatar } from 'react-native-elements';

class TeamAdmin extends Component{
  state = {
    idproject: this.props.route.params.id,
    iduser: '',
    idTeam:'',
    listTeam: [],
    dialogVisible: false,
  }

  componentDidMount(){
    this.fetchDataTeam();
  }

  fetchDataTeam = async (props)=>{
      fetch('http://mppk-app.herokuapp.com/getDataTeam/'+ this.state.idproject)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        this.setState({listTeam:data})
      })
    }

  updateaktif = (text,iduser,idteam) =>{
      const { navigation } = this.props;
      console.log(text)
      console.log(this.state.iduser)
      console.log(this.state.idTeam)
      fetch("http://mppk-app.herokuapp.com/updateAktif",{
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },  
        body:JSON.stringify({
          "_id":iduser,
          "aktif":text,
          "idteam":idteam,
        })
        })
      .then(res=>res.json())
      .then(data=>{
          if(!data==[]){
              //console.log('nonull')
              navigation.replace('TeamAdmin',{id:this.state.idproject})
          }
          else{
            // console.log('null')
              console.log(data)
          }
      })
  }

  onPress = (text,iduser,idteam)=>{
    this.setState({iduser:iduser})
    this.setState({idTeam:idteam})

    console.log(text)
    console.log(iduser)
    console.log(this.state.idTeam)

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
          <Text style={{marginHorizontal:20,color:'white',fontWeight:'bold',fontSize:20}}>
            Team Project
          </Text>
        </View>


      <View style={{ flex: 1 }}>
          {
            this.state.listTeam.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{uri:l.user.image}} />
                <ListItem.Content>
                  <ListItem.Title>{l.user.nama}</ListItem.Title>
                  <ListItem.Subtitle>{l.user.status}</ListItem.Subtitle>
                  
                </ListItem.Content>
                    {
                        l.user.aktif === 'yes'?(
                            <TouchableOpacity  style={styles.btnupdate}  onPress={()=>{this.setState({dialogVisible:true}),this.setState({iduser:l.user._id}),this.setState({idTeam:l._id})}}>
                                <Icon name="check-circle" size={20} color='green'></Icon>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity  style={styles.btnupdate}  onPress={()=>{this.updateaktif('yes',l.user._id,l._id)}}>
                                <Icon name="times-circle" size={20} color='red'></Icon>
                            </TouchableOpacity>
                        )

                    }
                   
              </ListItem>
            ))
          }
          
      </View>
      <ConfirmDialog
              title="Alert !!!!"
              message="Apakah anda yakin ?"
              visible={this.state.dialogVisible}
              onTouchOutside={()=>this.setState({dialogVisible:false})}
              positiveButton={{
                  title: "YES",
                  onPress: () => this.updateaktif('no',this.state.iduser,this.state.idTeam)
              }}
              negativeButton={{
                  title: "NO",
                  onPress: () => this.setState({dialogVisible:false})
              }}
          />
      
      </View>
    )
  }
}
  
const styles=StyleSheet.create({
    fab: { 
     //   position: 'absolute', 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        },
    
  btnupdate: { 
    //   position: 'absolute', 
       width: 36, 
       height: 36, 
       alignItems: 'center', 
       justifyContent: 'center',  
       backgroundColor: 'white', 
       borderRadius: 30, 
       elevation: 8,
       marginHorizontal:5
       }, 
});
export default TeamAdmin;
