import { createStore } from 'redux';
import CONFIG from './config'

const defaultState = {
    category: CONFIG.categories[0].name,
    keyword: {
        'book': '',
        'music': '',
        'movie': ''
    },
    listData: {
        'book': null,
        'music': null,
        'movie': null
    },
    content: null,
    loadMoreStatus: 'done'
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                category: action.category
            }
        case 'UPDATE_KEYWORD':
            return {
                ...state,
                keyword: {
                    ...state.keyword,
                    [action.category]: action.keyword
                }
            }
        case 'UPDATE_LIST_DATA':
        return {
            ...state,
            listData: {
                ...state.listData,
                [action.category]: action.listData
            }
        }
        case 'UPDATE_LIST_DATA_NEXT':
            let oldResult = state.listData[action.category]? state.listData[action.category].result : [];
            return {
                ...state,
                listData: {
                    ...state.listData,
                    [action.category]: {
                        ...action.listData,
                        result: oldResult.concat(action.listData.result)
                    }
                }
            }
        case 'UPDATE_CONTENT':
            return {
                ...state,
                content: action.content
            }
        case 'UPDATE_LOAD_MORE_STATUS':
            return {
                ...state,
                loadMoreStatus: action.loadMoreStatus
            }
        default:
            return state
    }
}

let store = createStore(reducer);
window.__store__ = store;
export default store;