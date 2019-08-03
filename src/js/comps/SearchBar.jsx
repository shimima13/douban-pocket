import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Button, FormHelperText } from '@material-ui/core';
import CONFIG from '../utils/config'
import store from '../utils/store'
import service from '../utils/service'
import fakeActions from '../utils/fakeActions'
import PotentialError from './PotentialError'
const SearchIcon = () => (<Icon>search</Icon>)
const styles = theme => ({
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    iconButton: {
        padding: 10,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
        display: 'flex',
        border: '1px silver solid'
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    searchButton: {

    }

})
class Search extends Component {
    constructor() {
        super();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleSearch(e) {
        const { category } = this.props;
        const keyword = store.getState()['keyword'][category]
        fakeActions.fetchData(category, keyword).then(()=>{
            //完成后滚动到头部
            fakeActions.scrollToTop()
        })
    }
    handleInputChange(e) {
        let newValue = e.target.value;
        const { category } = this.props;
        store.dispatch({
            type: 'UPDATE_KEYWORD',
            keyword: newValue,
            category
        })
    }
    componentDidMount() {
        const _this = this;
        window.addEventListener("keydown", function (e) {
            const key = e.which && e.which || e.keyCode();
            if(key == 13){
                _this.handleSearch()
            }
        })
    }
    render() {
        const { classes, category } = this.props;
        const keyword = store.getState()['keyword'][category]
        let placeholder = '';
        let foundCategory = CONFIG.categories.find((c) => { return c.name == category })
        if (foundCategory) {
            placeholder = foundCategory.placeholder
        }
        return (
            <PotentialError>
            <div className='search-bar'>
                {/* <IconButton className={classes.iconButton} >
                    <SearchIcon />
                </IconButton>
                <InputBase
                    id="bootstrap-input"
                    defaultValue="react-bootstrap"
                    classes={{
                        root: classes.bootstrapRoot,
                        input: classes.bootstrapInput,
                    }}
                /> */}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder={placeholder}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        value={keyword}
                        onChange={this.handleInputChange}
                    />
                    <div className={classes.searchButton}>
                        <Button variant="contained" color="primary" onClick={this.handleSearch}>搜索</Button>
                    </div>

                </div>

            </div >
            </PotentialError>
        );
    }
}
export default withStyles(styles)(Search);