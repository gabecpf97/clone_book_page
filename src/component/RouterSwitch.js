import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';
import NavBar from './NavBar';
import LogOut from './LogOut';
import Account from './Account';
import Post from './Post';

// Remeber to add /clone_book_page when deploy

const RouterSwitch = () => {
    const [status, setStatus] = useState();

    useEffect(() => {
        (localStorage.user) ? setStatus(true) : setStatus(false);
    }, []);

    const updateStatus = () => {
        setStatus(!status);
    }

    return(
        <BrowserRouter>
            <NavBar status={status}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
                <Route path='/post/:id' element={<Post />} />
                <Route path="/sign_up" element={<SignUp handleChange={updateStatus}/>} />
                <Route path="/log_in" element={<LogIn handleChange={updateStatus}/>} />
                <Route path="/log_out" element={<LogOut handleChange={updateStatus}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterSwitch;