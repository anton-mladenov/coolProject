import React, { Component } from 'react'
import { View, Text, Button, FlatList } from "react-native"
import { connect } from "react-redux"
import { getAllCategories } from "../../actions/categoriesActions"
import CategoryDetails from "./CategoryDetails"

class AllCategories extends Component {

    state = {
        showFlatList: true,
        showDetails: false,
        categoryId: null
    }

    componentDidMount() {
        this.props.getAllCategories()
    }

    showCategoryDetails = (id) => {
        const idInt = parseInt(id, 10)
        console.log("state cat id in showCategoryDetails: ", this.state.categoryId, this.state.showDetails, { idInt })
        return this.setState({
            categoryId: idInt,
            showDetails: !this.state.showDetails,
            showFlatList: !this.state.showFlatList,
        })
    }

    render() {

        const { allCategories } = this.props
        console.log("state cat id in RENDER: ", this.state.categoryId, this.state.showDetails)
        const id = this.state.categoryId

        return (
            <View>

                {
                    this.state.showFlatList &&
                    <FlatList
                        data={ allCategories }
                        renderItem={ ({ item }) => <Button title={ item.name } onPress={ () => this.showCategoryDetails(item.id) } /> }
                    />
                }

                {
                    this.state.showDetails &&
                    <CategoryDetails categoryId={ id } />
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategories: state.categories
})

export default connect(mapStateToProps, { getAllCategories })(AllCategories)
