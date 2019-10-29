import React from 'react';
import { AppState } from "react-native";
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import Router from './Router';
import AppMem from './components/common/AppMem';
import { Drawer } from "native-base";
import VTSideBar from './components/VTSideBar';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { appState: AppState.currentState };
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    AppMem.appLoader = this.refs.loader;
    AppMem.calendar = this.refs.calendar;
    AppMem.drawerRef = this.drawer._root;
    AppMem.modalRef = this.refs.modal;
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange(nextAppState) {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    } else {
      console.log("App has come to the background!");
    }
    this.setState({ appState: nextAppState });
  }

  render() {
    const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<VTSideBar navigator={this.navigator} />}
          onClose={() => AppMem.closeDrawer()}>
          <Router />
        </Drawer>
      </Provider>
    );
  }
}

export default App;
