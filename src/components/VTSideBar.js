import React, { Component } from "react";
import {
	List,
	ListItem,
	Text,
	Icon,
	Left,
	Body,
	Container
} from "native-base";
import { View, Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import AppMem from "./common/AppMem";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class VTSideBar extends Component {
	constructor(props, context) {
		super(props, context);
		this.onPressExit = this.onPressExit.bind(this);
	}

	onPressExit() {
		AppMem.closeDrawer();
		// this.props.actLogout();
		Actions.reset('login');
	}

	onPressMenuitem(action) {
		Actions.push(action);
		AppMem.closeDrawer();
	}

	render() {
		const { headerStyle, avatarIconStyle, messageStyle } = styles;

		return (
			<Container style={{ backgroundColor: "#FFFFFF" }}>
				<View>
					<View style={headerStyle}>
						<Icon
							ios="ios-contact-outline"
							android="md-contact"
							style={avatarIconStyle}
						/>
						<Text style={messageStyle}>Hola, extraño</Text>
					</View>
					<List>
						<ListItem
							avatar
							key={0}
							onPress={this.onPressMenuitem.bind(this, "entryByItemCode")}
						>
							<Left>
								<Icon name="home" style={{ color: "black" }} />
							</Left>
							<Body>
								<Text>Inicio</Text>
							</Body>
						</ListItem>
						<ListItem avatar key="exit" onPress={this.onPressExit}>
							<Left>
								<Icon
									name={Platform.OS === "ios" ? "ios-exit-outline" : "md-exit"}
									style={{ color: "black" }}
								/>
							</Left>
							<Body>
								<Text>Cerrar Sesión</Text>
							</Body>
						</ListItem>
					</List>
				</View>
			</Container>
		);
	}
}
const styles = {
	headerStyle: {
		padding: 30,
		height: 120,
		flexDirection: "row",
		backgroundColor: 'blue'
	},
	avatarIconStyle: {
		color: "#fff",
		paddingRight: 20,
		fontSize: 50
	},
	messageStyle: {
		alignSelf: "center",
		color: "#fff"
	}
};

function mapStateToProps(store) {
	
	return {
		// userdata: store.authReducer.userdata
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			// actLogout
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(VTSideBar);

