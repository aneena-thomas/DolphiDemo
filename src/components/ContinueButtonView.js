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
import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
import SignUpSecondView from '../components/SignUpSecondView.js';
import SignUpFirstView from '../components/SignUpFirstView.js';

import CommonStyle from "../styles/common.css";
class ContinueButtonView extends Component {



    render() {

        return (

                    <View style={styles.submit}>
                        <Button  style={CommonStyle.ContinueButton} textStyle={{fontSize: 18}}>
                            Continue
                        </Button>
                    </View>

        );
    }
}

const styles = StyleSheet.create({
  container2: {
      flex: 1,
      backgroundColor: "#FFFFFF",
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
      flex:1,
      flexDirection:'row',
        padding: 30,
        alignItems:'center',
        justifyContent:'center'
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

module.exports = ContinueButtonView;
