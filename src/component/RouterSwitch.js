import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';
import NavBar from './NavBar';
import LogOut from './LogOut';
import Post from './Post';
import User from './User';
import "../style/style.css";
import UserList from './UserList';
import CreatePost from './CreatePost';
import EditProfile from './EditProfile';
import DeleteUser from './DeleteUser';

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
                <Route path="/user/:id" element={<User />} />
                <Route path="/user/:id/following" element={<UserList type="following" />} />
                <Route path="/user/:id/follower" element={<UserList type="follower" />} />
                <Route path="/user/:id/pending_following" element={<UserList type="pending_following" />} />
                <Route path="/user/:id/pending_follower" element={<UserList type="pending_follower" />} />
                <Route path='/post/:id' element={<Post />} />
                <Route path='/post/create' element={<CreatePost />} />
                <Route path='/user/edit' element={<EditProfile />} />
                <Route path="/sign_up" element={<SignUp handleChange={updateStatus}/>} />
                <Route path="/log_in" element={<LogIn handleChange={updateStatus}/>} />
                <Route path="/log_out" element={<LogOut handleChange={updateStatus}/>} />
                <Route path="/delete_user" element={<DeleteUser handleChange={updateStatus} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterSwitch;