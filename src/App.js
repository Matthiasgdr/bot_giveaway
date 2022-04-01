import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AppWrapper from './components/AppWrapper';
import Giveaway from './pages/Giveaway';
import Welcome from './pages/Welcome';

const App = () => {
    return (
        <AppWrapper>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />}></Route>
                    <Route path="/:channel" element={<Giveaway />}></Route>
                </Routes>
            </BrowserRouter>
        </AppWrapper>
    );
};

export default App;
