export function arrayWithDelete(array, action) {
    return array.filter(item => item.id !== action.payload.id)
}

export function arrayWithFilter(array, action) {
    return array.map(item => {
        if (item.id === action.payload.id) {
            return {...item, ...action.payload}
        }
        return item
    })
}

export function arrayWithFilterFromTitle(array, action) {
    return array.map(item => {
        if (item.title === action.payload.title) {
            return {...item, ...action.payload}
        }
        return item
    })
}