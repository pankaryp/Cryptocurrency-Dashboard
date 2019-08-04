import HighchartsConfig from './HighchartsConfig';
import React from 'react';
import {Tile} from '../Shared/Tile';
import {AppContext} from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts';

export default function() {
    return (
        <AppContext.Consumer>
            {({}) => 
                <Tile>
                    <ReactHighcharts config={HighchartsConfig()}/>
                </Tile>
            }
        </AppContext.Consumer>
    )
}