import {
    CREATE_FIELD, CREATE_GROUP,
    DELETE_FIELD, DELETE_GROUP, EDIT_FIELD,
    EDIT_GROUP, GET_PRICE_DATA, GET_PRICE_LIST, PRICE_DATA, SET_PRICE_DETAILS, SET_PRICE_LIST
} from "./types";
import {message} from "antd";
import axios from "axios";

const URL = 'https://updent.com.ua/api/v1/';

export function getPriceList() {
    return async dispatch => {
        axios
            .get(URL + "price_sections")
            .then(response => {
                let arr = response.data.data.sort((a, b) => {
                    return a.attributes.priority - b.attributes.priority;
                })
                dispatch({
                    type: GET_PRICE_LIST, payload: arr.map(value => {
                        value.attributes.price_lines.sort((a, b) => {
                            return a.priority - b.priority;
                        })
                        return {
                            "id": parseInt(value.id),
                            "titleUA": value.attributes.title_ua,
                            "titleEN": value.attributes.title_en,
                            "titlePL": value.attributes.title_pl,
                            "priority": parseInt(value.attributes.priority),
                            "details": value.attributes.price_lines.map((detail) => {
                                return {
                                    "id": parseInt(detail.id),
                                    "subtitleUA": detail.title_ua,
                                    "subtitleEN": detail.title_en,
                                    "subtitlePL": detail.title_pl,
                                    "sectionId": parseInt(detail.price_section_id),
                                    "price": parseFloat(detail.price_ua),
                                    "pricePL": parseFloat(detail.price_pl),
                                    "priceEN": parseFloat(detail.price_en),
                                    "priceUS": parseFloat(detail.price_dol),
                                    "price1": parseFloat(detail.price_ua1),
                                    "pricePL1": parseFloat(detail.price_pl1),
                                    "priceEN1": parseFloat(detail.price_en1),
                                    "priceUS1": parseFloat(detail.price_dol1),
                                    "priority": parseInt(detail.priority)
                                }
                            })
                        }
                    })
                })
            })
    }
}

export function setPriceData(data) {
    return async dispatch => {
        axios
            .request({
                method: "POST",
                url: URL + '/currencies',
                data: {
                    "euro": data.EUR,
                    "euro_r": data.eurRounding,
                    "dollar": data.USD,
                    "dollar_r": data.usdRounding,
                    "zloty": data.PLN,
                    "zloty_r": data.plnRounding
                }
            })
            .then(response => {
                dispatch({type: PRICE_DATA, payload: data});
            })
            .catch((error) => {
                message.error('Помика! Не вдалось створити!');
                console.error(error)
            })
    }
}
export function getPriceData(){
    return async dispatch => {
        axios
            .get(URL + "/currencies/current_rate")
            .then(response => {
                dispatch({
                    type: GET_PRICE_DATA, payload: {
                        "EUR": parseFloat(response.data.data.attributes.euro),
                        "eurRounding":parseFloat(response.data.data.attributes.euro_r),
                        "USD": parseFloat(response.data.data.attributes.dollar),
                        "usdRounding":parseFloat(response.data.data.attributes.dollar_r),
                        "PLN": parseFloat(response.data.data.attributes.zloty),
                        "plnRounding":parseFloat(response.data.data.attributes.zloty_r),
                    }
                })
            })
    }
}

export function setPriceDetails(details) {
    return {
        type: SET_PRICE_DETAILS,
        payload: details
    }
}

export function setPriceList(arr) {
    return {
        type: SET_PRICE_LIST,
        payload: arr
    }
}

// FIELDS
export function createField(field, groupID, priority) {
    console.log(priority)
    return async dispatch => {
        axios
            .request({
                method: "POST",
                url: URL + '/price_lines',
                data: {
                    "title_ua": field.subtitleUA,
                    "title_en": field.subtitleEN || '',
                    "title_pl": field.subtitlePL || '',
                    "price_ua": field.price,
                    "price_ua1": field.price1,
                    "price_section_id": groupID,
                    "priority": priority
                }
            })
            .then(response => {
                dispatch({type: CREATE_FIELD, payload: {...field, ...{"groupID": groupID, "priority": priority}}});
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
                url: URL + '/price_lines/' + field.id,
                data: {
                    "id": field.id,
                    "title_ua": field.subtitleUA,
                    "title_en": field.subtitleEN || '',
                    "title_pl": field.subtitlePL || '',
                    "price_ua": field.price,
                    "price_ua1": field.price1,
                    "price_section_id": parseInt(groupID),
                    "priority": field.priority
                }
            })
            .then(response => {
                dispatch({type: EDIT_FIELD, payload: {...field, ...{"groupID": groupID}}});
                dispatch(getPriceList())
                // message.success(`"${priceList.title}" створено!`);
            })
            .catch((error) => {
                message.error('Помика! Не вдалось створити!');
                console.error(error)
            })
    }
}

export function deleteField(field, groupID) {
    return async dispatch => {
        axios
            .request({
                method: "DELETE",
                url: URL + '/price_lines/' + field.id,
            })
            .then(response => {
                dispatch({type: DELETE_FIELD, payload: {...field, "groupID": groupID}});
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
                url: URL + '/price_sections',
                data: {
                    "title_ua": group.titleUA,
                    "title_en": group.titleEN || '',
                    "title_pl": group.titlePL || '',
                    "priority": group.priority
                }
            })
            .then(response => {
                dispatch({type: CREATE_GROUP, payload: {...group, "id": parseInt(response.data.data.id)}});
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
                url: URL + '/price_sections/' + id,
                data: {
                    "title_ua": group.titleUA,
                    "title_en": group.titleEN,
                    "title_pl": group.titlePL,
                    "id": group.id,
                    "priority": group.priority

                }
            })
            .then(response => {
                dispatch({type: EDIT_GROUP, payload: {...group, ...{"id": id}}})
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
                url: URL + '/price_sections/' + group.id,
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

