/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Button } from 'react-native';
import { Container, Header, Content, Badge, Text, Icon, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import AuthActions from '../store/action/auth';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    static navigationOptions = {
        title: 'Home',
        // headerStyle: {
        //     backgroundColor: '#f4511e',            
        //   },
        //   headerTintColor: '#fff',
        headerTitleStyle: {
            // justifyContent: "center", alignSelf: "center", width: "15%"
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center'
        },
        headerLeft: (<View></View>),
        headerRight: (<View></View>)
    };

    render() {
        let { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Button title='signOut' onPress={(navigate) => this.props.signOut(navigate)} />
            </View>
        );
    }
}

export class Tab1 extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Tab1
                </Text>
            </View>
        )
    }
}

export class Tab2 extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Tab2
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


function mapStateToProps(state) {
    console.log(state)
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signOut: (navigate) => dispatch(AuthActions.signOut(navigate))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);