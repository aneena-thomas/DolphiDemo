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
import {Button} from "react-native-elements";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
import ContinueButtonView from '../components/ContinueButtonView.js';

import CommonStyle from "../styles/common.css";
class SignUpSecondView extends Component {
  static navigationOptions = {
    title:"Sign Up",
    headerBackTitle:null

  }

    render() {
        return (

          <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
              <View style={styles.container2}>
                  <View style={styles.formGroups}>
                     <Image source={logo} style={styles.imageStyle}></Image>
                     <View style={styles.txtcolor}>
                         <Text style={styles.response}>About Me</Text>
                     </View>
                  </View>

                    <View style={styles.formGroup}>
                        <Sae
                            label={"First Name"}
                            iconClass={FontAwesomeIcon}
                            iconName={"pencil"}
                            iconColor={"black"}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            labelStyle={{ color: 'black' }}
                            inputStyle={{ color: 'black' }}

                        />
                        <Sae
                            label={"Last Name"}
                            iconClass={FontAwesomeIcon}
                            iconName={"pencil"}
                            iconColor={"black"}
                            password={true}
                            autoCapitalize="none"
                            labelStyle={{ color: 'black' }}
                            inputStyle={{ color: 'black' }}

                        />
                        <Sae
                            label={"Email Address"}
                            iconClass={FontAwesomeIcon}
                            iconName={"pencil"}
                            iconColor={"black"}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            labelStyle={{ color: 'black' }}
                            inputStyle={{ color: 'black' }}

                        />
                        <Sae
                            label={"Personal PhoneNumber"}
                            iconClass={FontAwesomeIcon}
                            iconName={"pencil"}
                            iconColor={"black"}
                            password={true}
                            autoCapitalize="none"
                            labelStyle={{ color: 'black' }}
                            inputStyle={{ color: 'black' }}

                        />
                         <Sae
                              label={"Business PhoneNumber"}
                              iconClass={FontAwesomeIcon}
                              iconName={"pencil"}
                              iconColor={"black"}
                              keyboardType="email-address"
                              autoCapitalize="none"
                              labelStyle={{ color: 'black' }}
                              inputStyle={{ color: 'black' }}

                          />
                          <Sae
                              label={"License Number"}
                              iconClass={FontAwesomeIcon}
                              iconName={"pencil"}
                              iconColor={"black"}
                              password={true}
                              autoCapitalize="none"
                              labelStyle={{ color: 'black' }}
                              inputStyle={{ color: 'black' }}

                          />
                          <Sae
                                label={"Hospital Name"}
                                iconClass={FontAwesomeIcon}
                                iconName={"pencil"}
                                iconColor={"black"}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                labelStyle={{ color: 'black' }}
                                inputStyle={{ color: 'black' }}

                            />
                    </View>
                    <View style={styles.submit}>
                        <Button  style={CommonStyle.ContinueButton} textStyle={{fontSize: 18}} title="Continue" large={true}>
                        </Button>
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
    formGroup: {
        padding: 20,
        flex:12,
        flexDirection:'column',
        padding:20
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
      padding:10,
      justifyContent:'space-between'
    }
});

module.exports = SignUpSecondView;
