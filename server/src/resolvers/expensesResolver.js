import { combineResolvers } from "graphql-resolvers"
// imports here from the authentication file

export default {

    Query: {
        expense: async (parent, { id }, { models }) => {
            return await models.Expense.findById(id)
        },
        allExpenses: async (parent, args, { models }) => {
            return await models.Expense.findAll()
        }
    },

    Mutation: {

        createExpense: combineResolvers(
            // authentication resolver here
            async (parent, { name, amount, categoryId }, { me, models }) => {
                return await models.Expense.create({
                    name, 
                    amount, 
                    categoryId
                })
            }
        ),

        updateExpense: combineResolvers(
            // authentication resolver here
            async (parent, { id, name, amount }, { me, models }) => {
                const update = { name, amount }
                const idInt = parseInt(id, 10)
                return await models.Expense
                    .findById(idInt)
                    .then(expense => {
                        if (expense.id !== idInt) {
                            return "No expense found with this ID"
                        } else {
                            return expense.update(update)
                        }
                    })
            }
        ),

        deleteExpense: combineResolvers(
            // authentication resolver here
            async (parent, { id }, { models }) => {
                return await models.Expense.destroy({ where: { id } })
            }
        )

    },

    Expense: {
        category: async (parent, { categoryId }, { models }) => {
            return await models.Category.findById(parent.id)
        }
    }

}