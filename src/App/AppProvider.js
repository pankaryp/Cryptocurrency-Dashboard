import React, { Component } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');

// Create a new react context
export const AppContext = React.createContext();

// Constants
const MAX_FAVORITES = 10;

export default class AppProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins
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

    // Add coins
    addCoin = key => {
        let favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites});
        }
    }

    // Remove coins
    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites,key )});
    }

    // Disable coins when they are already inside the favorites
    isInFavorites = key => _.includes(this.state.favorites, key);

    // Confirm Favorites
    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });

        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    // Saved Settings
    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData) {
            return {page: 'settings', firstVisit: true}
        }
        let {favorites} = cryptoDashData;
        return {favorites};
    }

    // Set page on app
    setPage = page => this.setState({page});

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
