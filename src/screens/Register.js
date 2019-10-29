import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Button, Block, Text, Input} from '../components';
import * as theme from '../constants/theme';
import {
  registerEmailChanged,
  registerNameChanged,
  registerPasswordChanged,
  registerSubmitForm,
} from '../actions/RegisterActions';
import {connect} from 'react-redux';

const {height} = Dimensions.get('window');

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleType = id => {
    const {active} = this.state;
    this.setState({active: active === id ? null : id});
  };
  // metodos que manejan las acciones del formulario //
  passwordChanged(text) {
    this.props.registerPasswordChanged(text);
  }
  nameChanged(text) {
    this.props.registerNameChanged(text);
  }
  emailChanged(text) {
    this.props.registerEmailChanged(text);
  }
  onButtonSubmitForm() {
    console.log('this.props', this.props)
    const {nombre, email, contrasenia} = this.props;
    this.props.registerSubmitForm({nombre, email, contrasenia})
  }
  // fin de los metodos //

  render() {
    return (
      <KeyboardAwareScrollView
        style={{marginVertical: 10}}
        showsVerticalScrollIndicator={false}>
        <Block center middle>
          <Block middle style={{marginTop: 15, marginBottom: 20}}>
            <Block center>
              <Image
                source={require('../assets/images/Base/logo-talleres-big.png')}
                style={{height: 90, width: 100, overflow: 'hidden'}}
              />
            </Block>
          </Block>
          <Block flex={2.5} center>
            <Text h3 style={{marginBottom: 6}}>
              Talleres
            </Text>
            <Text paragraph color="black3">
              Registrá tu cuenta.
            </Text>
            <Block center style={{marginTop: 15}}>
              <Input
                full
                label="Nombre"
                style={{marginBottom: 15}}
                onChangeText={this.nameChanged.bind(this)}
                value={this.props.nombre}
              />
              <Input
                full
                email
                label="Email"
                style={{marginBottom: 15}}
                onChangeText={this.emailChanged.bind(this)}
                value={this.props.email}
              />
              <Input
                full
                password
                label="Contraseña"
                style={{marginBottom: 25}}
                onChangeText={this.passwordChanged.bind(this)}
                value={this.props.contrasenia}
              />
              <Button
                full
                style={{marginBottom: 12}}
                onPress={this.onButtonSubmitForm.bind(this)}>
                <Text button>Crear cuenta</Text>
              </Button>
              <Text paragraph color="gray">
                Ya tenes cuenta?{' '}
                <Text
                  height={18}
                  color="blue"
                  onPress={() => Actions.auth('reset')}>
                  Logueate
                </Text>
              </Text>
            </Block>
          </Block>
        </Block>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({registerForm}) => {
  const {nombre, email, contrasenia, loading, error} = registerForm;
  return {nombre, email, contrasenia, loading, error};
};

export default connect(
  mapStateToProps,
  {
    registerEmailChanged,
    registerNameChanged,
    registerPasswordChanged,
    registerSubmitForm,
  },
)(Register);

const styles = StyleSheet.create({});
