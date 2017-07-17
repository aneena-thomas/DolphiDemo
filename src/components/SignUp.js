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
    TouchableOpacity
} from "react-native";
const logo = require("../images/download.jpeg");

import React, {Component} from "react";
import { Button } from 'react-native-elements';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
import SignUpFirstView from '../components/SignUpFirstView.js';
import ContinueButtonView from '../components/ContinueButtonView.js';

import CommonStyle from "../styles/common.css";
class SignUp extends Component {
    static navigationOptions = {
      title:"Sign Up",
      headerBackTitle:null

    }

    handleSubmitOption(){

      this.props.navigation.navigate('SignUpSecondView')


    }
    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View style={styles.container2}>
                    <View style={styles.formGroups}>
                       <Image source={logo} style={styles.imageStyle}></Image>
                       <View style={styles.txtcolor}>
                           <Text style={styles.response}>I am ...</Text>
                       </View>
                    </View>
                    <View style={styles.formGroup}>
                    <View style={styles.submit}>
                        <Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}} onPress={this.handleSubmitOption.bind(this)} title="Doctor" backgroundColor='#8D8686'></Button>
                        <Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}} onPress={this.handleSubmitOption.bind(this)} backgroundColor='#8D8686' title="Nurse"></Button>
                        <Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}} backgroundColor='#8D8686' title="Drug Representative"></Button>
                        <Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}} backgroundColor='#8D8686' title="Lab Representative"></Button>
                    </View>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
  container2: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      flexDirection:'column'
  },
  formGroup: {
      padding: 10,
      flex:6,
      flexDirection:'column'
  },
    formGroups:{
      flex:1,
      flexDirection:'row',
      alignItems:'flex-start',
      justifyContent:'flex-start',
      padding:5
    },
    imageStyle:{
      height:80,
      width:80,
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
        padding: 10,
    },

    response: {
        padding: 10,
        fontSize:23,
        fontWeight:'bold',
    },
    forgotPasswordText:{
      color:'#6185E9'
    },
    txtcolor:{
      flexDirection:'row',
      flex:1,
      padding:20,
      justifyContent:'space-between'
    }
});

module.exports = SignUp;
