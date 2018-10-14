
import { baseUrl, jwtDecodeToExpDate } from "../lib/lib"
import axios from "axios"
import { logout } from "./usersActions"

// CREATE A NEW CATEGORY
export const CREATE_CATEGORY = "CREATE_CATEGORY"

const createCategory = (category) => ({
    type: CREATE_CATEGORY,
    payload: category
})

export const createNewCategory = (newCategory) => (dispatch, getState) => {

    console.log({ newCategory })
    const state = getState()
    if (!state.currentUserReducer) return logout()

    const jwt = state.currentUserReducer
    if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: 'post',
        data: {
            query: `
            mutation {
                createCategory(name: "${newCategory}") {
                    id
                    name
                }
              }
            `
        }
    }).then((result) => {
        console.log({ result })
        dispatch(createCategory(result.data.data.createCategory))
    }).catch((error) => {
        console.log("There was an error when creating the new category " + error)
        return "There was an error when creating the new category " + error
    })
}


// GET ALL CATEGORIES

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"

const allCategories = (data) => ({
    type: GET_ALL_CATEGORIES,
    payload: data
})

export const getAllCategories = () => (dispatch, getState) => {

    const state = getState()
    if (!state.currentUserReducer) return logout()

    const jwt = state.currentUserReducer
    if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: "post",
        data: {
            query: `
            query {
                categories{
                    id
					name
					amount
					user {
						id
						name
					}
					expenses {
						id
						name
						amount
					}
				}
            }
            `
        }
    }).then((result) => {
        dispatch(allCategories(result.data.data.categories))
    }).catch((error) => {
        console.log("There was an error when getting all categories " + error)
        return "There was an error when getting all categories " + error
    })
}


// GET ONE CATEGORY

export const GET_A_CATEGORY = "GET_A_CATEGORY"

const getCategory = (data) => ({
    type: GET_A_CATEGORY,
    payload: data
})

export const getOneCategory = (data) => (dispatch, getState) => {

    if (!state.currentUserReducer) return logout()

    const jwt = state.currentUserReducer
    if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        headers: { "x-token": `${jwt}` },
        method: "post",
        data: {
            query: `
			query {
				category(id: ${data}) {
					id
					name
					amount
				}
			}
			`
        }
    }).then((result) => {
        console.log(result.data.data.category)
        dispatch(getCategory(result.data.data.category))
    }).catch((error) => {
        console.log("There was an error when getting all categories " + error)
        return "There was an error when getting all categories " + error
    })
}


// UPDATE A CATEGORY 

export const UPDATE_A_CATEGORY = "UPDATE_A_CATEGORY"

const updateCategory = (data) => ({
    type: UPDATE_A_CATEGORY,
    payload: data
})

export const updateOneCategory = (id, name) => (dispatch, getState) => {



    // const state = getState()
    // if (!state.currentUserReducer) return logout()

    // const jwt = state.currentUserReducer.jwt
    // if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        method: "post",
        data: {
            query: `
            mutation {
                updateCategory(id: ${id}, name: "${name}"){
                    id
                    name
                    user {
                        id
                        name
                    }
                    expenses {
                        name
                    }
                }
              }
            `
        }
    }).then((result) => {
        dispatch(updateCategory(result.data.data.updateCategory))
    }).catch((error) => {
        console.log("There was an error when trying to update a category " + error)
        return "There was an error when trying to update a category " + error
    })
}

// DELETE A CATEGORY

export const DELETE_A_CATEGORY = "DELETE_A_CATEGORY"

const deleteCategory = (data) => ({
    type: DELETE_A_CATEGORY,
    payload: data
})

export const deleteOneCategory = (data) => (dispatch, getState) => {

    // const state = getState()
    // if (!state.currentUserReducer) return logout()

    // const jwt = state.currentUserReducer.jwt
    // if (jwtDecodeToExpDate(jwt)) return logout()

    axios({
        url: baseUrl,
        method: "post",
        data: {
            query: `
			mutation {
				deleteCategory(id: ${data})
			}
			`
        }
    })
    // .then((category) => { // da polzvam li vuobshte DELETE action? 
    //     dispatch(deleteCategory(data))
    // }).catch((error) => {
    //     console.log("There was an error when trying to delete a category " + error)
    //     return "There was an error when trying to delete a category " + error
    // })
}
