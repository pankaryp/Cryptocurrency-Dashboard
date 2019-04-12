import React, { Component } from 'react';

const cc = require('cryptocompare');

// Create a new react context
export const AppContext = React.createContext();

export default class AppProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }

    componentDidMount = () => {
        this.fetchCoins();
    }

    // Fetch Coins from cryptocompare
    fetchCoins = async() => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    // Confirm Favorites
    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });

        localStorage.setItem('cryptoDash', JSON.stringify({
            test: 'hello'
        }));
    }

    // Saved Settings
    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }
        return {};
    }

    // Set page on app
    setPage = page => this.setState({page});

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
