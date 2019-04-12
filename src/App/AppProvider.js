import React, { Component } from 'react';

// Create a new react context
export const AppContext = React.createContext();

export default class AppProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 'settings',
            setPage: this.setPage
        }
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
