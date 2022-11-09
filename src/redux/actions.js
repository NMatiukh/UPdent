import {
    CREATE_FIELD, CREATE_GROUP,
    DELETE_FIELD, DELETE_GROUP, EDIT_FIELD,
    EDIT_GROUP, GET_PRICE_LIST, SET_PRICE_DETAILS, SET_PRICE_LIST
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
                                    "price": parseInt(detail.price_ua),
                                    "priority": parseInt(detail.priority)
                                }
                            })
                        }
                    })
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
export function createField(field, groupID) {
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
                    "price_section_id": groupID,
                    "priority": field.priority
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
    console.log(field)
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
                    "price_section_id": parseInt(groupID),
                    "priority": field.priority
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
                dispatch({type: CREATE_GROUP, payload: {...group, "id": response.data.insertId}});
                message.success(`"${group.titleUA}" створено!`);
                console.log(response)
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
