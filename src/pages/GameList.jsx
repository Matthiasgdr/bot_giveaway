import React from 'react';
import { useParams } from 'react-router-dom';
import { GameList } from '../components/GameList';
import styled from 'styled-components';

const GameListPage = () => {
    const { channel } = useParams();

    return (
        <Container>
            <GameList channel={channel}></GameList>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
`;

export default GameListPage;
