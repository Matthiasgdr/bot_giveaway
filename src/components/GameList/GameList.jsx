import React from 'react';
import Chat from '../../blocks/Chat/Chat';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const GameList = ({ channel }) => {
    return (
        <Container>
            <Link to={`/${channel}/giveaway`}>Giveaway</Link>
            <Chat channel={channel} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export default GameList;
