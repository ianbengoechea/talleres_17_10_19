import React from 'react';
import {
  Scene,
  Router,
} from 'react-native-router-flux';
import { View } from "react-native";
import LoginForm from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Noticia from './screens/Noticia';

class RouterComponent extends React.PureComponent {
  render(){
    return (
      <View style={{ flex: 1 }}>
        <Router>
          <Scene hideNavBar>
            <Scene key="login" component={LoginForm} initial />
            <Scene key="register" component={Register} />
            <Scene key="noticia" component={Home} title="Talleres" />
            <Scene key="detalleNoticia" component={Noticia} />
          </Scene>
        </Router>
      </View>
    );
  }
}

export default RouterComponent;
