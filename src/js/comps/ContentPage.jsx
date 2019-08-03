import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import CONFIG from '../utils/config'
import store from '../utils/store'
import Tag from './Tag'
import PotentialError from './PotentialError'
const BackIcon = () => <Icon>keyboard_arrow_left</Icon>
const styles = {
    toolbar: {
        paddingLeft: '10px'
    },
    btn: {
        fontSize: '1.2em',
        padding: '3px 16px 3px 8px',
    },
    btncontainer: {
        flex: 1
    },
    centertitle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 2,

        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    fix: {
        flex: 1
    }


}

class ContentPage extends Component {
    constructor() {
        super();
        this.handleNavClick = this.handleNavClick.bind(this)
    }
    handleNavClick() {
        const category = this.props.match.params.category || 'book';
        const { history } = this.props;
        history.push(`/home/${category}`)
    }
    render() {
        const category = this.props.match.params.category || 'book';
        const id = this.props.match.params.id || null;
        const { classes } = this.props;
        const label = CONFIG.categories.find((c) => c.name === category).label
        const contentData = store.getState().content;
        let title = '';
        if (contentData) {
            title = contentData.title
        }
        return (
            <PotentialError>
            <div className='content-page'>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <BackIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {CONFIG.categories.find((c) => c.name === category).label}
                        </Typography> */}
                        <div className={classes.btncontainer}>
                            <Button variant="contained" className={classes.btn} color='primary' onClick={this.handleNavClick}><BackIcon />{label}</Button>
                        </div>
                        <Typography variant="h6" color="inherit" className={classes.centertitle} title={title}>
                            {title}
                        </Typography>
                        <div className={classes.fix}></div>
                    </Toolbar>
                </AppBar>
                <Content category={category} contentData={contentData} />
            </div>
            </PotentialError>
        );
    }
}
function Content(props) {
    const { category, contentData } = props
    let renderComp = (<div></div>)
    if (contentData) {
        switch (category) {
            case 'book':
            case 'music':
                const athorsArray = contentData.author.map((au) => {
                    if (typeof au === 'string') {
                        return au
                    } else if (au.name) {
                        return au.name
                    } else {
                        return '?'
                    }
                })
                const authorStr = athorsArray.join(',')
                renderComp = (
                    <div className='book-content'>
                        <div className='content-top'>
                            <img src={contentData.image}></img>
                            <div className='description'>
                                <p>名称：{contentData.title}</p>
                                <p>作者：{authorStr}</p>
                                {category === 'book' && <p>出版社：{contentData.publisher}</p>}
                                {category === 'book' && <p>时间：{contentData.pubdate}</p>}
                                {category === 'music' && <p>发布商：{contentData.attrs.publisher.join(',')}</p>}
                                {category === 'music' && <p>发布时间：{contentData.attrs.pubdate.join(',')}</p>}
                                <p>评分：{contentData.rating.average}</p>
                                {category === 'book' && <p>价钱：{contentData.price}</p>}
                                <p className='tag-container-p'>
                                    {
                                        contentData.tags.map((t, index) => {
                                            return <Tag key={index} {...t} />
                                        })
                                    }
                                </p>

                            </div>
                        </div>
                        <Divider variant="middle" />
                        <div className='content-bottom'>
                            {
                                category === 'book' &&
                                (
                                    <>
                                        <h2>序言</h2>
                                        <p >{contentData.catalog}</p>
                                        <h2>简介</h2>
                                        <p>{contentData.summary}</p>
                                    </>
                                )
                            }
                            {
                                category === 'music' &&
                                (
                                    <>
                                        <h2>内容</h2>
                                        <p >{contentData.title}</p>
                                    </>
                                )
                            }

                        </div>
                    </div>
                )
                break;
            case 'movie':
                let directors = contentData.directors.map(d => d.name)
                renderComp = (
                    <div className='movie-content'>
                        <div className='content-top'>
                            <img src={contentData.images.large}></img>
                        </div>
                        <Divider variant="middle" />
                        <div className='content-bottom'>
                            <h2>简介</h2>
                            <div className='brief'>
                                <p>名称：{contentData.title}</p>
                                <p>上映时间：{contentData.pubdates.join(',')}</p>
                                <p>导演：{directors.join(',')}</p>
                                <p className='tag-container-p'>
                                    {
                                        contentData.genres.map((g, index) => {
                                            return <Tag key={index} name={g} count={1000} />
                                        })
                                    }
                                </p>
                            </div>
                            <p >{contentData.catalog}</p>
                            <h2>演员</h2>
                            <div className='casts'>
                                {
                                    contentData.casts.map((c, index)=>{
                                        return <Cast key={index} src={c.avatars.medium} name={c.name} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
                break;
        }
    }
    return renderComp;
}

function Cast(props){
    return (
        <div className='cast-item'>
            <img src={props.src} />
            <p>{props.name}</p>
        </div>
    )
}

export default withStyles(styles)(ContentPage)