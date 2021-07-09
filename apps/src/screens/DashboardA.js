import React , {Component} from 'react';
import { StyleSheet, View, Text, StatusBar} from 'react-native';


export default class DashboardA extends Component {
  render(){
    return(
        <View style = {styles.header}>
            <StatusBar backgroundColor="#0288d1" barStyle="lightcontent"/>
           
        </View>
      );
  }
}



const styles = StyleSheet.create({
  header:{
    width:'100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#81d4fa'
  }
   

});