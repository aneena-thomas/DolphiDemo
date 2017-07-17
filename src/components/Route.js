import React from 'react';
import {StackNavigator} from 'react-navigation';
import Login from '../components/Login.js';
import Home from '../components/Home.js';
import SignUp from '../components/SignUp.js';
import SignUpFirstView from '../components/SignUpFirstView.js';
import SignUpSecondView from '../components/SignUpSecondView.js';

const Route = StackNavigator({
  Login:{screen: Login,},
  Home:{screen:Home},
  SignUp:{screen:SignUp},
  SignUpFirstView:{screen:SignUpFirstView},
  SignUpSecondView:{screen:SignUpSecondView},
})

export default Route;
