import React from 'react';
import styled from 'styled-components';

const User = ({ user }) => {
    return (
        <SUser className={`user ${user.win}`} $x={user.x} $y={user.y} $win={user.win} >
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
        color: getColor[p.$win],
        fontSize: p.$win === 'win' ? '52px' : '20px'
    }
}))`
    font-family: 'Readex Pro', sans-serif;
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
    text-shadow: 0 0 20px black, 0 0 20px black,  0 0 20px black;
`

export default User
