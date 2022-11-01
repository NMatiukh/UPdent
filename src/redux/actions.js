import {
    CREATE_FIELD, CREATE_GROUP,
    DELETE_FIELD, DELETE_GROUP, EDIT_FIELD,
    EDIT_GROUP, GET_PRICE_LIST
} from "./types";
import {message} from "antd";
import axios from "axios";

const URL = 'https://updent.com.ua/api/v1/';

export function getPriceList() {
    return async dispatch => {
        axios
            .get(URL + "price_sections")
            .then(response => {
                dispatch({
                    type: GET_PRICE_LIST, payload: response.data.data.map(value => {
                        return {
                            "id": parseInt(value.id),
                            "titleUA": value.attributes.title_ua,
                            "titleEN": value.attributes.title_en,
                            "titlePL": value.attributes.title_pl,
                            "details": value.attributes.price_lines.map(detail => {
                                return {
                                    "id": parseInt(detail.id),
                                    "subtitleUA": detail.title_ua,
                                    "subtitleEN": detail.title_en,
                                    "subtitlePL": detail.title_pl,
                                    "sectionId": parseInt(detail.price_section_id),
                                    "price": parseInt(detail.price_ua)
                                }
                            })
                        }
                    })
                })
            })
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
                    "price_section_id": groupID
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
                url: URL + '/price_lines/' + field.id,
                data: {
                    "id": field.id,
                    "title_ua": field.subtitleUA,
                    "title_en": field.subtitleEN || '',
                    "title_pl": field.subtitlePL || '',
                    "price": field.price,
                    "price_section_id": parseInt(groupID)
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

export function deleteField(field, groupId) {
    return async dispatch => {
        axios
            .request({
                method: "DELETE",
                url: URL + '/price_lines/' + field.id,
            })
            .then(response => {
                dispatch({type: DELETE_FIELD, payload: {...field, "groupId": groupId}});
                console.log(field)
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
