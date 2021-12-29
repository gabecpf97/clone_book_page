import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';

const RouterSwitch = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/clone_book_page/" element={} />
                <Route path="/clone_book_page/sign_up" element={<SignUp />} />
                <Route path="/clone_book_page/log_in" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterSwitch;