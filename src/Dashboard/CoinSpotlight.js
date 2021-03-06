import React from 'react';
import {Tile} from '../Shared/Tile';
import {AppContext} from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';
import styled from 'styled-components';

const SpotlightName = styled.h2`
    text-align:center;
`

export default function() {
    return(
        <AppContext.Consumer>
            {({currentFavorite, coinList}) =>
                <Tile>
                    <h2> {coinList[currentFavorite].CoinName}</h2>
                    <CoinImage 
                        coin={coinList[currentFavorite]}
                        spotlight/>
                </Tile>
            }
        </AppContext.Consumer>
    ) 
}