import React, { useState } from 'react';
import { Input, Box, Text, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Welcome = () => {
    const [username, setUsername] = useState('');

    return (
        <Container>
            <Box width="600px" display="flex" flexDirection="column">
                <Text>
                    Entrez votre nom d'utilisateur Twitch pour accéder à votre
                    page de jeu
                </Text>
                <Input
                    autoFocus
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Button
                    disabled={!username}
                    rightIcon={<ArrowForwardIcon />}
                    to={'/' + username.toLowerCase()}
                    as={Link}
                    mt="8px"
                >
                    Accéder a votre page
                </Button>
            </Box>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export default Welcome;
