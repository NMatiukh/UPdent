import {
    CHANGE_PRICE_LIST_TITLE, CREATE_FIELD, CREATE_GROUP,
    DELETE_FIELD, DELETE_GROUP, EDIT_FIELD,
    EDIT_GROUP,
    GET_PRICE_LIST,
    SET_PRICE_LIST
} from "./types";
import {message} from "antd";
import axios from "axios";

const URL = 'http://localhost:3001';

export function getPriceList() {
    return async dispatch => {
        axios
            .get(URL + "/priceList")
            .then(response => {
                dispatch({type: GET_PRICE_LIST, payload: response.data})
                // console.log(response)
            })
    }
}

// FIELDS

export function createField(field, groupID) {
    return async dispatch => {
        axios
            .request({
                method: "POST",
                url: URL + '/priceLines',
                data: {
                    "subtitleUA": field.subtitleUA,
                    "subtitleEN": field.subtitleEN || '',
                    "subtitlePL": field.subtitlePL || '',
                    "price": field.price,
                    "groupID": groupID
                }
            })
            .then(response => {
                dispatch({type: CREATE_FIELD, payload: {...field, ...{"groupID": groupID}}});
                dispatch(getPriceList())
            })
            .catch((error) => {
                message.error('Помика! Не вдалось створити!');
                console.error(error)
            })
    }
}

export function editField(field, groupID) {
    return async dispatch => {
        axios
            .request({
                method: "PUT",
                url: URL + '/priceLines/' + field.id,
                data: {
                    "id": field.id,
                    "subtitleUA": field.subtitleUA,
                    "subtitleEN": field.subtitleEN || '',
                    "subtitlePL": field.subtitlePL || '',
                    "price": field.price,
                    "groupID": parseInt(groupID)
                }
            })
            .then(response => {
                dispatch({type: EDIT_FIELD, payload: {...field, ...{"groupID": groupID}}});
                // message.success(`"${priceList.title}" створено!`);
            })
            .catch((error) => {
                message.error('Помика! Не вдалось створити!');
                console.error(error)
            })
    }
}

export function deleteField(field) {
    return async dispatch => {
        axios
            .request({
                method: "DELETE",
                url: URL + '/priceLines/' + field.id,
            })
            .then(response => {
                dispatch({type: DELETE_FIELD, payload: field});
                message.success(`"${field.subtitleUA}" видалино успішно!`);
            })
            .catch((error) => {
                message.error('Помика! Не вдалось видалити!');
                console.error(error)
            })
    }
}

// GROUPS

export function createGroup(group) {
    return async dispatch => {
        axios
            .request({
                method: "POST",
                url: URL + '/priceSections',
                data: {
                    "titleUA": group.titleUA,
                    "titleEN": group.titleEN,
                    "titlePL": group.titlePL,
                }
            })
            .then(response => {
                dispatch({type: CREATE_GROUP, payload: group});
                message.success(`"${group.titleUA}" створено!`);
            })
            .catch((error) => {
                message.error('Помика! Не вдалось створити!');
                console.error(error)
            })
    }
}

export function editGroup(group, id) {
    return async dispatch => {
        axios
            .request({
                method: "PUT",
                url: URL + '/priceSections/' + id,
                data: {
                    "titleUA": group.titleUA,
                    "titleEN": group.titleEN,
                    "titlePL": group.titlePL,
                    "id": group.id
                }
            })
            .then(response => {
                dispatch({type: EDIT_GROUP, payload: group});
                // message.success(`"${priceList.title}" створено!`);
            })
            .catch((error) => {
                message.error('Помика! Не вдалось створити!');
                console.error(error)
            })
    }
}

export function deleteGroup(group) {
    return async dispatch => {
        axios
            .request({
                method: "DELETE",
                url: URL + '/priceSections/' + group.id,
            })
            .then(response => {
                dispatch({type: DELETE_GROUP, payload: group});
                message.success(`"${group.titleUA}" видалино успішно!`);
            })
            .catch((error) => {
                message.error('Помика! Не вдалось видалити!');
                console.error(error)
            })
    }
}

export function setPriceList(item) {
    return {
        type: SET_PRICE_LIST,
        payload: item
    }
}

export function changePriceListTitle(item) {
    return {
        type: CHANGE_PRICE_LIST_TITLE,
        payload: item
    }
}
