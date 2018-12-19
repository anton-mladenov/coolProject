import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet, View } from "react-native"
import { Button, Title } from 'react-native-paper';

export default class ExpensesForm extends Component {

    state = {}

    handleSubmit = () => {
        return this.props.onSubmit(this.state)
    }

    render() {

        const initialValues = this.props.initialValues || {}

        return (
            <ScrollView>
                
                <View 
                    style={{ flex:1,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        marginBottom: 40
                    }} 
                    >
                    <TextInput
                        placeholder="so... what did you buy?"
                        onChangeText={ (name) => this.setState({ name: name }) }
                        value={ this.state.name !== undefined ? this.state.name : initialValues.name }
                        placeholderTextColor="white"
                        style={{ 
                            textAlign: "center",
                            color: "white",
                            marginBottom: 30,
                            marginTop: 15
                        }}
                    />

                    <TextInput
                        placeholder="...and how much does that cost?"
                        onChangeText={ (amount) => this.setState({ amount: amount }) }
                        value={ this.state.amount !== undefined ? this.state.amount : initialValues.amount }
                        placeholderTextColor="white"
                        style={{ 
                            textAlign: "center",
                            color: "white",
                            marginTop: 15,
                            marginBottom: 30,
                        }}
                    />

                    <Button
                        mode="contained"
                        onPress={ this.handleSubmit }
                        style={{ flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 60,
                            marginVertical: 5,
                            backgroundColor: "#FF951C", 
                            color: styles.buttonTextColor.color,
                            borderBottomWidth: 0.3,
                            borderRightWidth: 0.3,
                            borderColor: "white"
                        }}
                    > Submit </Button>
                
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#0B3954",
    },
    buttonBackground: {
        backgroundColor: "#00D0E5"
    },
    buttonTextColor: {
        color: "white"
    }
})