import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet, View } from "react-native"
import { Button } from 'react-native-paper'
import { withNavigation } from "react-navigation"
import { connect } from "react-redux"
import { createNewCategory, getAllCategories } from "../../actions/categoriesActions"


class CategoriesForm extends Component {

    state = {}

    handleSubmit = () => {
        this.props.onSubmit(this.state)
    }

    render() {

        const initialValues = this.props.initialValues || {}

        return (
            <ScrollView
                style={styles.background}
            >
                
                <View 
                    style={{ flex:1,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop: 190,
                    }} 
                    >
                    <TextInput
                        placeholder="Give A Name To Your New Category."
                        onChangeText={ (name) => this.setState({ name: name }) }
                        value={ this.state.name !== undefined ? this.state.name : initialValues.name }
                        placeholderTextColor="white"
                        style={{ 
                            textAlign: "center",
                            color: "white",
                        }}
                    />

                    <Button
                        mode="contained"
                        onPress={ this.handleSubmit }
                        style={{ 
                            flex:1,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            marginHorizontal: 60,
                            marginVertical: 40,
                            backgroundColor: "#FF951C", 
                            color: styles.buttonTextColor.color,
                            borderBottomWidth: 0.3,
                            borderRightWidth: 0.3,
                            borderColor: "white",
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

const categoriesFormWithNav = withNavigation(CategoriesForm)

export default connect(null, { createNewCategory, getAllCategories })(categoriesFormWithNav)