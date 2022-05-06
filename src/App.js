import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppWrapper from './components/AppWrapper';
import Giveaway from './pages/Giveaway';
import GameList from './pages/GameList';
import Welcome from './pages/Welcome';

const App = () => {
    return (
        <AppWrapper>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />}></Route>
                    <Route path="/:channel" element={<GameList />}></Route>
                    <Route
                        path="/:channel/giveaway"
                        element={<Giveaway />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </AppWrapper>
    );
};

export default App;
