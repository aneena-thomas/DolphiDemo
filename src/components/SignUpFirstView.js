/**
 * @class SignUpSecondView
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

import CommonStyle from "../styles/common.css";
class SignUpFirstView extends Component {
  static navigationOptions = {
    title:"Sign Up",
    headerBackTitle:null

  }
  handleSubmitOption(){

    this.props.navigation.navigate('SignUpSecondView')

  }
    render() {
        return (

                    <View style={styles.formGroup}>
                    <View style={styles.submit}>
                        <Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}} onPress={this.handleSubmitOption.bind(this)}>
                            Doctor
                        </Button>
                        <Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}}>
                            Nurse
                        </Button><Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}}>
                            Drug Representative
                        </Button><Button  style={CommonStyle.IamButton} textStyle={{fontSize: 18}}>
                            Lab Representative
                        </Button>
                    </View>
                    </View>

        );
    }
}

const styles = StyleSheet.create({

    formGroup: {
        padding: 10,
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
        padding: 10,
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50
    },
    forgotPasswordText:{
      color:'#6185E9'
    },
    txtcolor:{
      flexDirection:'row',
      flex:1,
      padding:10,
      justifyContent:'space-between'
    }
});
module.exports = SignUpFirstView;
