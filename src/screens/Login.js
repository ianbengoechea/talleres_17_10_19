import React, { Component } from 'react';
import { Image, Dimensions, View } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { Button, Block, Text, Input } from '../components';
import * as theme from '../constants/theme';

const { height, width } = Dimensions.get('window');

class Login extends Component {
  render() {
    console.log("desde la pantalla del login estas son mis props", this.props.navigation.actions.navigate);
    const { navigation } = this.props;

    return (
      <KeyboardAwareScrollView
        style={{marginVertical: 10}}
        showsVerticalScrollIndicator={false}>
        <Block center middle>
          <Block middle>
            <Image
              source={require('../assets/images/Base/logo-talleres-big.png')}
              style={{ height: 90, width: 100, overflow: 'hidden' }}
            />
          </Block>
          <Block flex={3} center>
            <Text h3 style={{ marginBottom: 6 }}>
              Talleres
            </Text>
            <Text paragraph color="black3">
              Ingresa tus datos para continuar.
            </Text>
            <Block center style={{ marginTop: 44 }}>
              <Input
                full
                email
                label="Direccion de email"
                style={{ marginBottom: 25 }}
              />
              <Input
                full
                password
                label="Contraseña"
                style={{ marginBottom: 25 }}
                rightLabel={
                  <Text
                    color="gray"
                    onPress={() => navigation.navigate('Forgot')}>
                    Olvido su contraseña?
                  </Text>
                }
              />

              <Button
                full
                style={{ marginBottom: 30}}
                onPress={() => Actions.noticia()}>
                <Text button>Ingresá</Text>
              </Button>
              <Text style={{marginBottom: 30}} paragraph color="gray">
                Todavia no tenés cuenta?{' '}
                <Text
                  height={16}
                  color="blue"
                  onPress={() => Actions.register()}>
                  Registrarse
                </Text>
              </Text>
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: height * 0.02,
                }}>
                <Button
                  // fullwidth
                  style={{ height: 20, width: width + 10, backgroundColor: 'rgb(3,40,89)' }}
                  onPress={() => Actions.noticia()}>
                  <Text button>Ingresá sin cuenta</Text>
                </Button>
              </View>
            </Block>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    );
  }
}



export default Login;
