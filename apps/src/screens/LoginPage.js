import React , {Component} from 'react';
import { View, TextInput, TouchableOpacity, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardA from './DashboardA';

export class LoginPage extends Component {
  render(){
    return(
        <View style = {styles.container}>
        <View style = {styles.textFields}>
          <TextInput style = {styles.input}
            placeholder = "Email"
            returnKeyType = "next"
            onSubmitEditing = {()=> this.passwordInput.focus()}
            keyboardType = "email-address"
            autoCapitalize = "none"
            autoCorrect = {false}
            >
          </TextInput>
          <TextInput style = {styles.input}
            placeholder = "Password"
            returnKeyType = "go"
            secureTextEntry
            ref = {(input)=>this.passwordInput = input}
            >
          </TextInput>
          <TouchableOpacity style = {styles.buttoncontainer}
            onPress = {()=> this.props.navigation.navigate('DashboardA')}
            >
            <Text style = {styles.buttontext}>Login</Text>
          </TouchableOpacity>
          <Button 
            title= "Register Here"
            color = "#1abc9c"
            
            />
        </View>
      </View>
      );
  }
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="DashboardA" component={DashboardA} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles ={
  container:{
    padding : 20,
    flex : 1,
    backgroundColor : 'ecf0f1',
    justifyContent : 'center',
    ailgnItems : 'stretch'
  },
  input:{
    paddingLeft : 20,
    borderRadius : 40,
    height : 50,
    fontSize : 25,
    backgroundColor : 'white',
    borderWidth : 1,
    marginBottom : 20,
    color : '#34495e'
  },
  buttoncontainer:{
    height: 50,
    borderRadius: 50,
    backgroundColor: '#1abc9c',
    paddingVertical: 10,
    justifyContent: 'center'
  },
  buttontext:{
    textAlign : 'center',
    color : '#ecf0f1',
    fontSize: 20
  }

}