import React,{Component} from 'react';
import {Animated,View, Text, StyleSheet, Image } from 'react-native';
//import Animated from 'react-native-reanimated'
import logo from '../../../src/icons/architect.png';

console.disableYellowBox = true;

class Splash extends Component{
    componentWillMount() {
        var navigation = this.props.navigation;
        setTimeout(() => {
            navigation.replace('Login')
        }, 2000);
      }

    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner:false,
    }
    componentDidMount(){
        

        const {LogoAnime,LogoText}=this.state;
        Animated.parallel([
            Animated.spring(LogoAnime,{
                toValue:1,
                tension:10,
                friction: 2,
                duration: 1000,
                
            }).start(),
            Animated.timing(LogoText,{
                toValue:1,
                duration:12000,
                useNativeDriver: false
            }),
        ]).start(()=>{
            this.setState({

                loadingSpinner:true,
            });
        });
    }

    render(){
        return(
            <View style={styles.container}>
            <Animated.View style={{
                opacity:this.state.LogoAnime,
                top: this.state.LogoAnime.interpolate({
                    inputRange:[0,1],
                    outputRange:[80,0]
                })

            }}>
                <Image source={logo} style={{height:200,width:200}}/>
                <Text style={{fontSize:50,fontWeight:'bold'}}>AMF-HAQ</Text>
            </Animated.View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#bbdefb",
        justifyContent:'center',
        alignItems:'center'
    },
    logoText:{
        color:'#0d47a1',
        fontFamily:'GoogleSans-Bold',
        fontSize: 30,
        marginTop:29,
        fontWeight:'700',
    }
});

export default Splash ;