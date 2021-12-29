import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';

// Remeber to add /clone_book_page when deploy

const RouterSwitch = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign_up" element={<SignUp />} />
                <Route path="/log_in" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterSwitch;