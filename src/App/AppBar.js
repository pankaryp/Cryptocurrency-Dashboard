import React from 'react';
import styled, {css} from 'styled-components';

// Logo
const Logo = styled.div`
    font-size: 1.5em;
`

// Menu bar
const Bar = styled.div`
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 180px auto 100px 100px;
`
// Menu buttons
const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        text-shadow: 0px 0px 60px #03ff03;
    `}
`
// Transform to uppercase
function toProperCase(lower) {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({name, active}) {
    return (
        <ControlButtonElem active={active}>
            {toProperCase(name)}
        </ControlButtonElem>
    )
}

export default function() {
    return (
        <Bar>
            <Logo>CryptoDash</Logo>
            <div></div>
            <ControlButton active name="dashboard"/>
            <ControlButton name="settings"/>
        </Bar>
    )
}