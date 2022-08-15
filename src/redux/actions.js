import {
    CHANGE_PRICE_LIST_TITLE,
    CREATE_PRICE_LIST,
    DELETE_PRICE_LIST,
    EDIT_PRICE_LIST,
    GET_PRICE_LIST,
    SET_PRICE_LIST
} from "./types";
import {message} from "antd";
import axios from "axios";

const URL = 'https://fake-server-app-nmatiukh.herokuapp.com';

export function getPriceList() {
    return async dispatch => {
        axios
            .get(URL + "/priceList")
            .then(response => {
                dispatch({type: GET_PRICE_LIST, payload: response.data})
            })
    }
}

export function editPriceList(priceList) {
    return async dispatch => {
        message.loading('Loading...', 1);
        axios
            .request({
                method: "PUT",
                url: URL + '/priceList/' + priceList.id,
                data: priceList
            })
            .then(() => {
                dispatch({type: EDIT_PRICE_LIST, payload: priceList})
                message.success(`The photo "${priceList.title}" edited!`);
            })
            .catch(() => {
                message.error('This photo not edited!');
            })
    }
}

export function createPriceList(priceList) {
    return async dispatch => {
        message.loading('Loading...', 1);
        axios
            .request({
                method: "POST",
                url: URL + "/priceList",
                data: priceList
            })
            .then(response => {
                dispatch({type: CREATE_PRICE_LIST, payload: response.data});
                message.success(`The "${priceList.title}" created!`);
            })
            .catch((error) => {
                message.error('This photo not created!');
                console.log(error)
            })
    }
}

export function setPriceList(item) {
    return {
        type: SET_PRICE_LIST,
        payload: item
    }
}

export function deletePriceList(priceList) {
    return async dispatch => {
        axios
            .delete(URL + "/priceList/" + priceList.id)
            .then(() => {
                dispatch({type: DELETE_PRICE_LIST, payload: priceList})
            })
    }
}

export function changePriceListTitle(item) {
    return {
        type: CHANGE_PRICE_LIST_TITLE,
        payload: item
    }
}