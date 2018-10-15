import React, { Component } from 'react'
import { View, Text, Button } from "react-native"
import { connect } from "react-redux"
import { getOneExpense, editOneExpense, deleteOneExpense } from "../../actions/expensesActions"
import ExpensesForm from "./ExpensesForm"

class ExpenseDetails extends Component {

    state = {
        edit: false
    }

    componentDidMount() {
        data = {
            id: this.props.expenseId,
            categoryId: this.props.category.id
        }
        this.props.getOneExpense(data)
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleSubmit = (data) => {
        const newData = {
            name: data.name,
            amount: data.amount,
            expenseId: this.props.expenseId,
            categoryId: this.props.category.id
        }
        this.props.editOneExpense(newData)
    }

    render() {

        const { oneExpense, category } = this.props

        return (
            <View>

                <Text> { oneExpense.name } </Text>
                <Text> { oneExpense.amount } </Text>
                <Text> Added to Category: { category.name } </Text>

                <Button
                    title="Edit Expense"
                    onPress={ this.handleEdit }
                />

                {
                    this.state.edit &&
                    <ExpensesForm onSubmit={ this.handleSubmit } initialValues={ oneExpense } />
                }

                <Button
                    title="Delete Expense"
                    onPress={ () => this.props.deleteOneExpense({ id: oneExpense.id, categoryId: category.id }) }
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        oneExpense: state.expensesReducer,
        category: state.categories[0]
    }
}

export default connect(mapStateToProps, { getOneExpense, editOneExpense, deleteOneExpense })(ExpenseDetails)
