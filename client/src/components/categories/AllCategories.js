import React, { Component } from 'react'
import { ScrollView, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllCategories, createNewCategory } from "../../actions/categoriesActions"
import CategoryDetails from "./CategoryDetails"
import CategoriesForm from "./CategoriesForm"
import PureChart from 'react-native-pure-chart';

const pickColor = () => {
    const availableColors = ["#120309", "#2e0f15", "#8a405f", "#95b2b8", "#307351", "#ed6a5a", "#f4f1bb", "#573280", "#cecfc7", "#B2967D"]
    const theChosenOne = Math.floor(Math.random() * availableColors.length)
    return availableColors[theChosenOne]
}
 
class pieChart {
    constructor(value, label) {
        this.value = value
        this.label = label
        this.color = pickColor()
    }
}

class AllCategories extends Component {

    state = {
        showFlatList: true,
        showDetails: false,
        categoryId: null,
        showAddButton: true, 
        showForm: false
    }

    componentDidMount() {
        const { currentUser, navigation } = this.props
        !currentUser && navigation.navigate("WelcomeScreen")
        currentUser && this.props.getAllCategories()
    }

    showCategoryDetails = (id) => {
        const idInt = parseInt(id, 10)
        return this.setState({
            categoryId: idInt,
            showDetails: !this.state.showDetails,
            showFlatList: !this.state.showFlatList,
        })
    }

    showAddForm = () => {
        this.setState({
            showForm: !this.state.showForm,
            showAddButton: !this.state.showAddButton,
            showFlatList: !this.state.showFlatList
        })
    }

    handleSubmit = (data) => {
        this.props.createNewCategory(data.name)
        this.setState({
            showForm: !this.state.showForm,
            showAddButton: !this.state.showAddButton,
            showFlatList: !this.state.showFlatList
        })
    }

    render() {

        const { allCategories, currentUser } = this.props
        const { navigate } = this.props.navigation
        const id = this.state.categoryId

        // // estimating total expense for all categories
        // const totalCategoryAmount = allCategories.map((cat) => cat.amount).reduce((acc, cur) => { return acc + cur }, 0)

        const categoriesToDisplay = allCategories.map((cat) => new pieChart(cat.amount, cat.name, pickColor()))
        
        return (
            <ScrollView>

                {
                    !allCategories && <Text> Loading ... </Text>
                }

                {
                    (this.state.showAddButton && currentUser) &&
                    <Button
                        title="Add A New Category"
                        onPress={ this.showAddForm }
                    />
                }

                {
                    this.state.showForm &&
                    <CategoriesForm onSubmit={ this.handleSubmit } />
                }

                {
                    allCategories.length !== 0 &&
                    <PureChart data={categoriesToDisplay} type='pie' />
                }

                {
                    (this.state.showFlatList && currentUser) &&
                    <FlatList
                        data={ allCategories }
                        keyExtractor={ (item, index) => item.id.toString() }
                        renderItem={ ({ item }) => <Button
                            title={ item.name }
                            onPress={ () => navigate("CategoryDetails", {
                                categoryId: item.id
                            })
                            }
                        /> }
                    />
                }

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategories: state.categories,
    currentUser: state.currentUserReducer !== null,
})

export default connect(mapStateToProps, { getAllCategories, createNewCategory })(AllCategories)