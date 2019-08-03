import React, { Component } from 'react';
import './style.css';
import BottomNav from './BottomNav';
import SearchBar from './SearchBar';
import List from './List';
import PotentialError from './PotentialError'
class Homepage extends Component {

    render() {
        const category = this.props.match.params.category || 'book';
        const {history} = this.props
        return (
            <PotentialError>
            <div>
                <SearchBar category={category} />
                <List category={category} history={history} />
                <BottomNav category={category} history={history} />
            </div>
            </PotentialError>
        );
    }
}
export default Homepage