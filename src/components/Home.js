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
    Alert
} from "react-native";
const logo = require("../images/download.jpeg");

import React, {Component} from "react";
import {Button} from "react-native-elements";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
// import RNCalendarEvents from 'react-native-calendar-events';
var { RNCalendarEvents } = require('NativeModules');

import CommonStyle from "../styles/common.css";
class Home extends Component {
    static navigationOptions = {
      title:"Home",
      headerLeft:null
    }
addToCalendar(){
  RNCalendarEvents.saveEvent('hh', {
      location: '',
      notes: 'notes',
      startDate: '2017-08-17T19:26:00.000Z',
      endDate: '2017-08-19T19:26:00.000Z'
    })
    .then(id => {
      // handle success
    })
    .catch(error => {
      // handle error
    });
}

addToCalendarClicked = ()=>{
  Alert.alert('Calendar','Do you want to add this to your calendar?',
    [
      { text : 'Cancel' },
      { text : 'OK', onPress : () => this.addToCalendarCheck()}
    ],
    { cancelable: false }
  )
}
calendarErrorAlert = ()=>{
  Alert.alert('Calendar','Please provide permission to access calendar',
    [
      { text : 'OK' }
    ]
  )
}
    render() {

        return (
          <View>
          <Button title="ADD" onPress={this.addToCalendarClicked}>
          </Button>
          </View>
        );
    }
}
addToCalendarCheck = ()=>{
  //Checks for authorization
  RNCalendarEvents.authorizationStatus()
  .then(status => {
    if(status === 'authorized'){
      this.addToCalendar();
    }else{
      //If unauthorized asks for authorization
      RNCalendarEvents.authorizeEventStore()
      .then(status => {
        if(status === 'authorized'){
          this.addToCalendar()
        }else{
          this.calendarErrorAlert();
        }
      })
      .catch((error) => {
        this.calendarErrorAlert();
      });
    }
  })
  .catch(error => {
    this.calendarErrorAlert();
  });
}

module.exports = Home;
