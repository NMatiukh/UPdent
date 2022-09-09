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

const URL = 'https://updent.com.ua/api/v1/price_sections/';

export function getPriceList() {
    return async dispatch => {
        axios
            .get(URL)
            .then(response => {
                let priceList = response.data.data.map(value => {
                    return {
                        "id": value.id,
                        "title": value.attributes.title_ua,
                        "details": value.attributes.price_lines.map(details => {
                            return {
                                "subtitle": details.title_ua,
                                "price": details.price_ua
                            }
                        })
                    }
                });

                dispatch({type: GET_PRICE_LIST, payload: priceList})
                console.log(priceList)
            })
    }
}

export function editPriceList(priceList) {
    return async dispatch => {
        message.loading('Завантаження...', 1);
        axios
            .request({
                method: "PUT",
                url: URL + priceList.id,
                data: {
                    "id": priceList.id,
                    "type": "price_section",
                    "attributes": {
                        "title_ua": priceList.title,
                        "title_en": undefined,
                        "title_pl": undefined,
                        "priority": true,
                        "visio": true,
                        "price_lines": priceList.details.map(details => {
                            return {
                                "title_ua": details.subtitle,
                                "title_en": undefined,
                                "title_pl": undefined,
                                "price_ua": details.price,
                                "price_en": null,
                                "price_pl": null,
                                "currency_name_ua": null,
                                "currency_name_en": null,
                                "currency_name_pl": null,
                                "priority": true,
                                "visio": true,
                                "updated_at": new Date().toDateString(),
                            }
                        })
                    }
                }
            })
            .then(() => {
                dispatch({type: EDIT_PRICE_LIST, payload: priceList})
                message.success(`"${priceList.title}" редаговано!`);
            })
            .catch(() => {
                message.error('Помика! Не вдалось відредагувати');
            })
    }
}

export function createPriceList(priceList) {
    return async dispatch => {
        message.loading('Завантаження...', 1);
        axios
            .request({
                method: "POST",
                url: URL,
                data: {
                    "type": "price_section",
                    "attributes": {
                        "title_ua": priceList.title,
                        "title_en": undefined,
                        "title_pl": undefined,
                        "priority": true,
                        "visio": true,
                        "price_lines": priceList.details.map(details => {
                            return {
                                "title_ua": details.subtitle,
                                "title_en": undefined,
                                "title_pl": undefined,
                                "price_ua": details.price,
                                "price_en": null,
                                "price_pl": null,
                                "currency_name_ua": null,
                                "currency_name_en": null,
                                "currency_name_pl": null,
                                "priority": true,
                                "visio": true,
                                "created_at": new Date().toDateString(),
                            }
                        })
                    }
                }
            })
            .then(response => {
                dispatch({type: CREATE_PRICE_LIST, payload: response.data});
                message.success(`"${priceList.title}" створено!`);
                console.log(response.data)
            })
            .catch((error) => {
                message.error('Помика! Не вдалось створити!');
                console.log(error.config.data)
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
    message.loading('Завантаження...', 1);
    if (priceList.id === undefined) {
        message.success(`"${priceList.title}" редаговано!`);
        return {
            type: DELETE_PRICE_LIST,
            payload: priceList
        }
    } else {
        return async dispatch => {
            axios
                .delete(URL + priceList.id)
                .then(() => {
                    message.success(`"${priceList.title}" видалено!`);
                    dispatch({type: DELETE_PRICE_LIST, payload: priceList})
                }).catch(r => {
                message.error('Помика! Не вдалось видалити!');
            })
        }
    }
}

export function changePriceListTitle(item) {
    return {
        type: CHANGE_PRICE_LIST_TITLE,
        payload: item
    }
}
