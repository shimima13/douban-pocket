import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import CONFIG from '../utils/config'
import ButtonBase from '@material-ui/core/ButtonBase'
import fakeActions from '../utils/fakeActions';
import PotentialError from './PotentialError'
const styles = {
    root: {
      backgroundColor: 'rgba(246, 246, 246, 1)',
      width: '100%',
      position: 'fixed',
      bottom: 0
    },
  };
class BottomNav extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e, value){
        const {history} = this.props;
        const foundCategory = CONFIG.categories.find((c)=>{return c.index == value})
        if(foundCategory){
            const pathName = foundCategory.name;
            fakeActions.scrollToTop()
            history.push(`/home/${pathName}`)
        }
    }
    render() {
        const { classes, category } = this.props;
        const foundCategory = CONFIG.categories.find((c)=>{return c.name == category})
        let value = foundCategory ? foundCategory.index : 0
        return (
            <PotentialError>
            <div className='bottom-nav'>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                >
                {CONFIG.categories.map((c)=>{
                    return <BottomNavigationAction key={c.index}  label={c.label} icon={<Icon>{c.icon}</Icon>} />
                })}
                </BottomNavigation>
            </div>
            </PotentialError>
        );
    }
}
export default withStyles(styles)(BottomNav);