import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, EDIT_EMPLOYEE, EMPLOYEE_IN_EDITING, GET_STAFF} from "../types";
import {arrayWithDelete, arrayWithFilter} from "./someFunctions";


const initialState = {
    staff: [],
    employeeInEditing: {}
}

export const staffReducer = (state = initialState, action) =>{
    switch (action.type) {
        case EDIT_EMPLOYEE:
            return {
                ...state,
                staff: arrayWithFilter(state.staff, action)
            }
        case DELETE_EMPLOYEE:
            return {...state, staff: arrayWithDelete(state.staff, action)}
        case GET_STAFF:
            return {...state, staff: action.payload}
        case CREATE_EMPLOYEE:
            return state
        case EMPLOYEE_IN_EDITING:
            return {...state, employeeInEditing: action.payload}
        default:
            return state
    }
}