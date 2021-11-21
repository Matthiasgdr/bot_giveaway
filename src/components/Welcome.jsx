import React from 'react';
import styled from 'styled-components'


const Welcome = () => {
    return (
        <Container><div>Hello</div></Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    height: 100vh;
`

export default Welcome;
