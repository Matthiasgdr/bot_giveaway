import React from 'react';
import styled from 'styled-components';
import shadeColor from '../../utils/shadeColor';

const User = ({ user }) => {
    return (
        <SUser
            className={`user ${user.win}`}
            $x={user.x}
            $y={user.y}
            $win={user.win}
        >
            {user.username}
        </SUser>
    );
};

const getColor = {
    none: '#ffffff',
    win: '#2BFA33',
    lose: '#FA382F',
};

const SUser = styled.div.attrs(p => ({
    style: {
        transform: `translate(${p.$x}px, ${p.$y}px) ${
            p.$win === 'win' ? 'scale(2)' : ''
        }`,
        color: getColor[p.$win],
    },
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
    text-shadow: 0 0 20px ${p => shadeColor(getColor[p.$win], -10)},
        0 0 20px ${p => shadeColor(getColor[p.$win], -10)},
        0 0 20px ${p => shadeColor(getColor[p.$win], -10)};
`;

export default User;
