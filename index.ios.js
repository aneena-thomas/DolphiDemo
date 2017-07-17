import React, {
    Component
} from "react";

import {
    AppRegistry,
    Navigator,
} from "react-native";


import Route from "./src/components/Route";

class DolphiDemo extends Component {


  render() {


      return (
          <Route/>
          );


  }

}



AppRegistry.registerComponent('DolphiDemo', () => DolphiDemo);
