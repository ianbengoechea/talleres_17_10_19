/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  TouchableOpacity
} from "react-native";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import { Actions } from "react-native-router-flux";
import { Button, Block, Text, Input } from "../components";
import { fetchAllNoticias } from "../actions/NoticiaActions";

const { height, width } = Dimensions.get("window");

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllNoticias();
  }
  _onPress(noticia) {
    Actions.noticia({ noticia: noticia});
  }

  render() {
    const data = this.props.noticias;
    return (
      <Block style={{ backgroundColor: 'white' }}>
        <Block
          center
          middle
          row
          style={{ paddingHorizontal: 2, marginBottom: 2, flex: 0, backgroundColor: 'white' }}
        >
          <View style={{ marginHorizontal: 5, marginTop: 15, backgroundColor: 'white' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{backgroundColor: 'white' }}>
              <Text
                onPress={() => console.log("1st")}
                style={{
                  marginHorizontal: 5,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10
                }}
              >
                CATEGORIA 1
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10
                }}
              >
                CATEGORIA 2
              </Text>

              <Text
                style={{
                  marginHorizontal: 5,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
              >
                CATEGORIA 3
              </Text>
              <Text
                style={{
                  marginHorizontal: 5,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10
                }}
              >
                CATEGORIA 3
              </Text>
            </ScrollView>
          </View>
        </Block>
        <View style={{ flex: 1, marginVertical: 10, backgroundColor: 'white' }}>
          <FlatGrid
            itemDimension={width * 0.44}
            items={data}
            style={styles.gridView}
            // staticDimension={300}
            fixed
            // spacing={}
            renderItem={({ item, index }) => {
              console.log("<<<<ITEM>>>>>", item);
              return (
                <TouchableOpacity activeOpacity={0.6} onPress={() => this._onPress(item)}>
                  <View style={styles.itemContainer}>
                    <View style={{ flex: 1 }}>
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          overflow: "visible"
                        }}
                        // resizeMode = ''
                        // defaultSource={{uri: require()}}
                        source={ item.imagen
                          ? {uri: `${item.imagen.profile_pic_path.replace("localhost", "10.255.255.83")}`}
                          : require('../assets/images/Base/logo-talleres-big.png')
                        }
                      />
                    </View>
                    <View
                      style={{
                        height: "30%",
                        backgroundColor: "rgba(0, 11, 100, 0.8)",
                        borderBottomEndRadius: 5,
                        borderBottomStartRadius: 5
                      }}
                    >
                      <Text ellipsizeMode='tail' numberOfLines={2} style={styles.itemName}>
                        {item.titulo}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Block>
    );
  }
}

const mapStateToProps = state => {
  return {
    noticias: state.noticias.allNoticias
  };
};

export default connect(
  mapStateToProps,
  { fetchAllNoticias }
)(Home);

const styles = StyleSheet.create({
  categoryGrid: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: height * 0.25
  },
  itemName: {
    flex: 1,
    flexDirection:'row',
    marginHorizontal: 7,
    marginVertical: 3,
    paddingLeft: 5,
    fontSize: 13,
    color: "#fff",
    fontWeight: "500",
  },
  itemCode: {
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    fontWeight: "600",
    fontSize: 14,
    color: "#fff"
  }
});
