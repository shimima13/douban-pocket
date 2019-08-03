import React, { Component } from 'react';
import store from '../utils/store'
import Tag from './Tag'
import fakeActions from '../utils/fakeActions'
import CONFIG from '../utils/config'
import PullToRefresh from 'pulltorefreshjs';
import PotentialError from './PotentialError'
class List extends Component {
    constructor(){
        super()
        this.handleClickItem = this.handleClickItem.bind(this)

    }
    handleClickItem(index, event) {
        const { category, history } = this.props;
        const selectedData = store.getState().listData[category].result[index]
        store.dispatch({
            type: 'UPDATE_CONTENT',
            content: selectedData
        })
        history.push(`/content/${category}/${selectedData.id}`)
    }
    render() {
        const _this = this
        const { category } = this.props;
        const state = store.getState()
        const data = state['listData'][category];
        const loadMoreStatus = state['loadMoreStatus'];
        
        let resultArray = []
        if (data && data.total > 0)
            resultArray = data.result;


        return (
            <>
                <PotentialError>
                <div className='list minirefresh-wrap' id='minirefresh' >
                        {
                            resultArray.map((d, index) => {
                                return <ListItem key={index} category={category} data={d} onClick={_this.handleClickItem.bind(_this, index)} />
                            })
                        }
                        <LoadMore key='load-more' loadMoreStatus={loadMoreStatus} />
                </div>
                </PotentialError>
            </>
        );
    }

    componentDidMount() {
        const _this = this;
        const { category } = this.props;
        const { listData, keyword } = store.getState();

        //初始化提交一个关键词为空的查询
        CONFIG.categories.forEach((c) => {
            let category = c.name
            if (!listData[category]) {
                fakeActions.fetchData(category, '')
            }
        });

        //下拉刷新逻辑（用的控件实现）
        const ptr = PullToRefresh.init({
            mainElement: 'div.list',
            onRefresh() {
                fakeActions.fetchData(_this.props.category, keyword[category])
            },
            instructionsPullToRefresh: '下拉刷新',
            instructionsReleaseToRefresh: '释放刷新',
            instructionsRefreshing: '刷新中'
          });



        // 底部加载更多（自己实现）
        const listEl = document.querySelector('.list');
        listEl.addEventListener('scroll',function(){
            let scrollTop = listEl.scrollTop;
            // let searchBarHeight = 56;
            let scrollHeight = listEl.scrollHeight;
            let offsetHeight = listEl.offsetHeight;
            let preloadDistance = 10
            if(scrollHeight - offsetHeight <= scrollTop + preloadDistance){
                fakeActions.loadMore(_this.props.category);
            }

        })

    }
    componentWillUnmount() {
        PullToRefresh.destroyAll();
    }
}

let ListItem = (props) => {
    const { category, data } = props
    switch (category) {
        case 'book':
        case 'music':
            const athorsArray = data.author.map((au) => {
                if (typeof au === 'string') {
                    return au
                } else if (au.name) {
                    return au.name
                } else {
                    return '?'
                }
            })
            const authorStr = athorsArray.join(',')
            // no need to sort
            // if(Array.isArray(data.tags)){
            //     tags = data.tags.sort((a,b)=>{
            //         return b-a;
            //     })
            // }

            return (
                <div className='list-item book-item' onClick={props.onClick}>
                    <img src={data.image}></img>
                    <div className='description'>
                        <p>名称：{data.title}</p>
                        <p className='tag-container-p'>
                            {
                                data.tags.map((t, index) => {
                                    return <Tag key={index} {...t} />
                                })
                            }
                        </p>
                        <p>作者：{authorStr}</p>
                        <p>评分：{data.rating.average}</p>
                        {category === 'book' && <p>时间：{data.pubdate}</p>}
                    </div>
                </div>
            );
        case 'movie':
            const casts = data.casts.map(c => c.name);
            const castsStr = casts.join(' ')
            return (
                <div className='list-item movie-item' onClick={props.onClick}>
                    <img src={data.images.small}></img>
                    <div className='description'>
                        <p className='title'>{`${data.title} - ${data.year}`}</p>
                        <p className='tag-container-p'>
                            {
                                data.genres.map((g, index) => {
                                    return <Tag key={index} name={g} count={1000} />
                                })
                            }
                        </p>
                        <p className='casts'>{castsStr}</p>
                        <p>评分：{data.rating.average}</p>
                    </div>
                </div>
            );
    }
}

function LoadMore(props){
    let { loadMoreStatus } = props;
    let loadMoreText = '';
    let loadMoreClass = 'load-more';
    if(loadMoreStatus === 'done')
        loadMoreClass = 'load-more hidden'
    if(loadMoreStatus === 'loading'){
        loadMoreText = '加载中...'
    }
    if(loadMoreStatus === 'nomore'){
        loadMoreText = '没有更多数据了'
    }
    return (
        <div className={loadMoreClass}>
            <p>{loadMoreText}</p>
        </div>
    )
}


export default List;