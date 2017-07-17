/**
 * @class Login
 */

import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback
} from "react-native";
const logo = require("../images/download.jpeg");

import React, {Component} from "react";
import { Button } from 'react-native-elements';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";

import CommonStyle from "../styles/common.css";
class Login extends Component {
    static navigationOptions = {
      title:"Login",
      headerBackTitle:null
    }
    constructor(props)
    {
      super(props);
      this.state = {
        username:'anna@gmail.com',
        password:'anna123',
      }
    }
    handleChange(event)
    {
      this.setState({
        username:event.nativeEvent.text
      });
      console.log('USERNAME',event.nativeEvent.text);
    }
    handleChangePass(event)
    {
      this.setState({
        password:event.nativeEvent.text
      });
      console.log('PASSWORD',event.nativeEvent.text);
    }
    handleSubmit(){
      this.setState({
        isLoading:true

      });
      console.log('SUBMIT',this.state.username);
      console.log('SUBMIT',this.state.password);
       if (this.state.username === "anna@gmail.com" & this.state.password ==="anna123")
       {
            this.props.navigation.navigate('Home')

       }
       else if (this.state.username === ""& this.state.password ==="") {
         alert("Username and Password was empty");

       }
       else {
         alert("Username or Password was wrong");
       }
    }
    handleSignUp(){

      this.props.navigation.navigate('SignUp')


    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View style={CommonStyle.container}>
                    <View style={styles.formGroups}>
                       <Image source={logo} style={styles.imageStyle}></Image>
                    </View>
                    <View style={styles.formGroup}>
                        <Sae
                            label={"Email Address"}
                            iconClass={FontAwesomeIcon}
                            iconName={"pencil"}
                            iconColor={"black"}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            labelStyle={{ color: 'black' }}
                            inputStyle={{ color: 'black' }}
                            value={this.state.username}
                            onChange={this.handleChange.bind(this)}

                        />
                        <Sae
                            label={"Password"}
                            iconClass={FontAwesomeIcon}
                            iconName={"key"}
                            iconColor={"black"}
                            password={true}
                            autoCapitalize="none"
                            labelStyle={{ color: 'black' }}
                            inputStyle={{ color: 'black' }}
                            value={this.state.password}
                            onChange={this.handleChangePass.bind(this)}

                        />

                        <View style={styles.submit}>
                            <Button  style={CommonStyle.buttons} textStyle={{fontSize: 18}}
                                onPress={this.handleSubmit.bind(this)} title="Login"
                                backgroundColor='white'
                                color="black"
                            >
                            </Button>
                            <View style={styles.topView}>

                            <View style={styles.txtcolor}>
                            <TouchableOpacity activeOpacity={.5}>
                               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={styles.fg}>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignUp.bind(this)} >
                               <Text style={styles.forgotPasswordText}>Sign Up</Text>
                            </TouchableOpacity>
                            </View>
                            </View>

                        </View>
                    </View>
                    <View>
                        <Text style={styles.response}></Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    formGroup: {
        padding: 40,
        flex:6,
        flexDirection:'column'
    },
    formGroups:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    imageStyle:{
      borderRadius:70,
      alignItems:'center',
      justifyContent:'center'
    },
    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "bold",
        opacity: 0.8,
    },

    submit: {
        paddingTop: 30,
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    },
    forgotPasswordText:{
      color:'#6185E9',
    },
    topView:{
      padding:10,
      alignSelf: 'stretch',
      justifyContent:'space-between',
      flexDirection:'row'
    },
    txtcolor:{
      padding:10,
      alignSelf: 'stretch',
      justifyContent:'space-between',
    },
    fg:{
      marginRight:10,
      justifyContent:'center',

    }
});

module.exports = Login;
