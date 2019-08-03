import store from './store'
import service from './service'
//获取第一批数据，此操作会完全刷新listData中的result数组
function fetchData(category, keyword) {
    let promise = new Promise((resolve, reject) => {
        service.getData(category, keyword, 1).then(
            (data) => {
                console.log(data)
                store.dispatch({
                    type: 'UPDATE_LIST_DATA',
                    listData: data,
                    category
                })
                resolve()
            },
            (err) => {
                //TO DO
                reject(err)
            }
        )
    })
    return promise;
}
function fetchNext(category, keyword, page) {
    let promise = new Promise((resolve, reject) => {
        service.getData(category, keyword, page).then(
            (data) => {
                console.log(data)
                store.dispatch({
                    type: 'UPDATE_LIST_DATA_NEXT',
                    listData: data,
                    category
                })
                resolve()
            },
            (err) => {
                //TO DO
                reject(err)
            }
        )
    })
    return promise;
}
var allowLoadMore = true;
function loadMore(category) {
    const state = store.getState();
    const { listData, keyword } = state;
    const _listData = listData[category];
    const _keyword = keyword[category];
    const { page, limit, count, total } = _listData;
    if (count + (page - 1) * limit >= total) {
        //no more
        store.dispatch({
            type: 'UPDATE_LOAD_MORE_STATUS',
            loadMoreStatus: 'nomore'
        })
    } else if (allowLoadMore) {
        allowLoadMore = false;
        store.dispatch({
            type: 'UPDATE_LOAD_MORE_STATUS',
            loadMoreStatus: 'loading'
        })
        setTimeout(function () {
            allowLoadMore = true;
        }, 300)
        fetchNext(category, _keyword, page + 1).then(() => {
            const listEl = document.querySelector('.list');
            // listEl.children.item(page*limit -2).scrollIntoView()
            store.dispatch({
                type: 'UPDATE_LOAD_MORE_STATUS',
                loadMoreStatus: 'done'
            })
        })
    }

}

function scrollToTop(){
    var el = document.querySelector('.list');
    el.scrollTo(0,0)
}

const fakeActions = {
    fetchData,
    loadMore,
    scrollToTop
}

export default fakeActions