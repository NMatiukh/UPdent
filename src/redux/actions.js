import axios from "axios";
import {message} from "antd";
import {
    CREATE_EMPLOYEE,
    DELETE_MESSAGE,
    DELETE_EMPLOYEE,
    GET_MESSAGES,
    GET_STAFF,
    GET_PHOTOS,
    CREATE_PHOTO, DELETE_PHOTO, EDIT_EMPLOYEE, EMPLOYEE_IN_EDITING, EDIT_PHOTO, GET_PRICE_LIST, CREATE_PRICE_LIST
} from "./types";

const URL = 'https://fake-server-app-nmatiukh.herokuapp.com';


// MESSAGES
export function getMessages() {
    return async dispatch => {
        axios
            .get(URL + '/messages')
            .then(response => {
                dispatch({type: GET_MESSAGES, payload: response.data})
            })
    }
}

export function deleteMessage(message) {
    return async dispatch => {
        axios
            .delete(URL + '/messages/' + message.id)
            .then(() => {
                dispatch({type: DELETE_MESSAGE, payload: message})
            })
    }
}

// STAFF
export function getStaff() {
    return async dispatch => {
        axios
            .get(URL + "/staff")
            .then(response => {
                dispatch({type: GET_STAFF, payload: response.data})
            })
    }
}

export function createStaff(employee) {
    return async dispatch => {
        message.loading('Loading...', 1);
        axios
            .request({
                method: "POST",
                url: URL + "/staff",
                data: employee
            })
            .then(response => {
                dispatch({type: CREATE_EMPLOYEE, payload: response.data});
                message.success(`The employee "${employee.firstName} ${employee.secondName}" created!`);
            })
            .catch(() => {
                message.error('This employee not created!');
            })
    }
}

export function deleteStaff(staff) {
    return async dispatch => {
        axios
            .delete(URL + "/staff/" + staff.id)
            .then(() => {
                dispatch({type: DELETE_EMPLOYEE, payload: staff})
            })
    }
}

export function editStaff(employee) {
    return async dispatch => {
        message.loading('Loading...', 1);
        axios
            .request({
                method: "PUT",
                url: URL + '/staff/' + employee.id,
                data: employee
            })
            .then(() => {
                dispatch({type: EDIT_EMPLOYEE, payload: employee})
                message.success(`The employee "${employee.firstName} ${employee.secondName}" edited!`);
            })
            .catch(() => {
                message.error('This employee not edited!');
            })
    }
}

export function setEmployeeInEditing(employee) {
    return {
        type: EMPLOYEE_IN_EDITING,
        payload: employee
    }
}

// GALLERY
export function getPhotos() {
    return async dispatch => {
        axios
            .get(URL + "/photos")
            .then(response => {
                dispatch({type: GET_PHOTOS, payload: response.data})
            })
    }
}

export function deletePhoto(photo) {
    return async dispatch => {
        axios
            .delete(URL + "/photos/" + photo.id)
            .then(() => {
                dispatch({type: DELETE_PHOTO, payload: photo})
            })
    }
}

export function createPhoto(photo) {
    return async dispatch => {
        message.loading('Loading...', 1);
        axios
            .request({
                method: "POST",
                url: URL + "/photos",
                data: photo
            })
            .then(response => {
                dispatch({type: CREATE_PHOTO, payload: response.data});
                message.success(`The "${photo.title}" created!`);
            })
            .catch(() => {
                message.error('This photo not created!');
            })
    }
}
export function editPhoto(photo) {
    return async dispatch => {
        message.loading('Loading...', 1);
        axios
            .request({
                method: "PUT",
                url: URL + '/photos/' + photo.id,
                data: photo
            })
            .then(() => {
                dispatch({type: EDIT_PHOTO, payload: photo})
                message.success(`The photo "${photo.title}" edited!`);
            })
            .catch(() => {
                message.error('This photo not edited!');
            })
    }
}

// PRICE LIST

export function getPriceList() {
    return async dispatch => {
        axios
            .get(URL + "/priceList")
            .then(response => {
                dispatch({type: GET_PRICE_LIST, payload: response.data})
            })
    }
}
export function test(test) {
    return async dispatch => {
        message.loading('Loading...', 1);
        axios
            .request({
                method: "PUT",
                url: URL + "/priceList",
                data: test
            })
            .then(response => {
                dispatch({type: CREATE_PRICE_LIST, payload: response.data});
                message.success(`The created!`);
            })
            .catch(() => {
                message.error('This photo not created!');
            })
    }
}
