import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import * as theme from '../constants/theme';

const {height, width} = Dimensions.get('window');


class Noticia extends Component {

    componentDidMount(){
        console.log('props', this.props)
    }
    render() {
        const noticia = this.props.noticia;
        return (
                <View style={styles.viewContentAll}>
                    <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden'
                            }}
                            resizeMode='cover'
                            defaultSource = {require("../assets/images/Base/(1).jpg")}
                            source={{uri: !!noticia.imagen
                                ? `${noticia.imagen.profile_pic_path.replace("localhost", "10.255.255.83")}`
                                : ""
                            }}
                        />
                    </View>
                    <View style={{marginHorizontal: 15, marginBottom: 15}}>
                        <Text style={{fontSize: 20, marginBottom: 15}}>{noticia.titulo}</Text>
                        <HTML tagsStyles={{ p: styles.htmlText, i: styles.htmlItalic }} html={noticia.cuerpo} />
                    </View>
                    </ScrollView>
                </View>


        )
    }
}

export default Noticia;

const styles = StyleSheet.create({
    viewContentAll: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainer: {
        height: height * 0.3,
        marginBottom: 25
    },
    text: {
        marginTop: 23,
        color: "rgb(114,114,114)",
        fontSize: 16,
        lineHeight: 25,
    },
    htmlText: {
        fontFamily: 'Verdana',
        fontSize: 14,
        color: '#8798AD',
        letterSpacing: 1.2,
        lineHeight: 18,
        display: 'flex',
        marginTop: 10,
        marginBottom: 1,
    },
    htmlItalic: { 
    },
})


//     <View
// style={{
//     flex: 1,
//         width: "90%",
//         marginRight: L.h(24),
//         marginLeft: L.h(24),
//         marginBottom: L.h(30),
//         backgroundColor: "white"
// }}
// >
// <Text style={styles.textCategory}>{category}</Text>
// <Text style={styles.textTitle}>{title}</Text>
// {
// description
// ? <Text style={styles.textDescription}>{description}</Text>
// : null
// }
// </View>
// const styles = {
// textTitle: {
// color: "rgb(32, 45, 81)",
// fontSize: L.h(23),
// marginBottom: L.h(20),
// fontFamily: Fonts.DBOLD
// },
// textCategory: {
// marginTop: L.h(21),
// color: "rgb(224, 146, 47)",
// fontSize: L.h(14),
// fontFamily: Fonts.REGULAR
// },
// textDescription: {
// marginTop: L.h(23),
// color: "rgb(114,114,114)",
// fontSize: L.h(16),
// lineHeight: L.h(25),
// fontFamily: Fonts.REGULAR
// }
// };
