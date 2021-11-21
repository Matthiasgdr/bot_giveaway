import React from 'react';
import styled from 'styled-components';

const User = ({ user }) => {
    return (
        <SUser $x={user.x} $y={user.y} $win={user.win} >
            {user.username}
        </SUser>
    )
}

const getColor = {
    none: '#2e2e2e',
    win: 'green',
    lose: 'red'
}

const SUser = styled.div.attrs(p => ({
    style: {
        transform: `translate(${p.$x}px, ${p.$y}px)`,
        color: getColor[p.$win]
    }
}))`
    position: absolute;
    width: 4px;
    height: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    font-size: 24px;
    will-change: transform;
    transition: transform cubic-bezier(0.1, 0.82, 0.46, 1) 0.5s;
`

export default User
