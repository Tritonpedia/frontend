import React, { useState, useEffect, useContext } from 'react';
import './TopBar.css';
import { ReactComponent as HomeSVG } from './res/home.svg';
import { ReactComponent as ProfileSVG } from './res/profile.svg';
import { ReactComponent as CreateSVG } from './res/create.svg';

import SearchBar from './SearchBar'
import { Link, useLocation } from 'react-router-dom';
import { LoginDialog, SignupDialog } from '../popups/dialogs';
import { UserContext } from '../contexts/UserContext';

const ProfileDropdown = (props) => {
    const { hideProfileDropdown, showLogin, showRegister } = props;
    const { user, setUser } = useContext(UserContext);

    function signOut() {
        setUser(null);
        alert("Signed out!");
        localStorage.removeItem('currentSession');
        window.location = "/";
    }

    return (
        <ul className="profile-dropdown" onClick={() => hideProfileDropdown()}>
            {user && user.token && <Link exact to='/userProfile' className="profile-item" >
                Profile
            </Link>}
            {user && user.token && <Link className="profile-item" onClick={() => signOut()}>
                Sign Out
            </Link>}
            {(!user ||!user.token) && <Link className="profile-item" onClick={() => showLogin()}>
                Login
            </Link>}
            {(!user || !user.token) && <Link className="profile-item" onClick={() => showRegister()}>
                Register
            </Link>}
        </ul>
    );
}

const CreatePageDropdown = (props) => {
    const { hideCreatePageDropdown } = props;
    return (
        <ul className="create-page-dropdown" onClick={() => hideCreatePageDropdown()}>
            <Link exact to='/createPageClass' className="create-page-item">
                New Class Page
            </Link>
            <Link exact to='/createPageOrg' className="create-page-item">
                New Org Page
            </Link>
        </ul>
    );
}

const TopBar = () => {
    const [displayCreatePageDropdown, setCreatePageDropdown] = useState(false);
    const [displayProfileDropdown, setDisplayProfileDropdown] = useState(false);
    const [displayLoginPrompt, setDisplayLoginPrompt] = useState(false);
    const [displayRegisterPrompt, setDisplayRegisterPrompt] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setDisplaySearchBar(false);
        } else {
            setDisplaySearchBar(true);
        }
    }, [location])


    function hideProfileDropdown() {
        setDisplayProfileDropdown(false);
    }

    function hideCreatePageDropdown() {
        setCreatePageDropdown(false);
    }

    function showLogin() {
        setDisplayLoginPrompt(true);
    }

    function hideLogin() {
        setDisplayLoginPrompt(false);
    }

    function showRegister() {
        setDisplayRegisterPrompt(true);
    }

    function hideRegister() {
        setDisplayRegisterPrompt(false);
    }


    function toggleProfileDropdown(event) {
        if (!event.relatedTarget ) {
            setDisplayProfileDropdown(!displayProfileDropdown);
            // if(displayProfileDropdown)
            return;
        }
        console.log(event);
        if(event.relatedTarget.className !== "profile-item") {
            setDisplayProfileDropdown(!displayProfileDropdown);
        }
    }

    function toggleCreatePageDropdown(event) {
        if (!event.relatedTarget ) {
            setCreatePageDropdown(!displayCreatePageDropdown);
            return;
        }
        if(event.relatedTarget.className !== "create-page-item") {
            setCreatePageDropdown(!displayCreatePageDropdown);
        }
    }

    return (
        <div>
            <div className="topbar-container">
                    <Link className="home-button topbar-item" exact to='' >
                        <HomeSVG className="topbar-home-svg" />
                    </Link>
                <div id="search-input" className='topbar-item'>
                    {displaySearchBar && <SearchBar />}
                </div>
                <div id="topbar-buttons" >
                    <div className="topbar-button topbar-item" onBlur={toggleCreatePageDropdown} onFocus={toggleCreatePageDropdown} tabIndex="1">
                        <CreateSVG className="topbar-item-svg" />
                    </div>
                    <div className="topbar-button topbar-item" onBlur={toggleProfileDropdown} onFocus={toggleProfileDropdown} tabIndex="0">
                        <ProfileSVG className="topbar-item-svg" />
                    </div>
                </div>
            </div>
            {displayCreatePageDropdown && <CreatePageDropdown hideCreatePageDropdown={hideCreatePageDropdown}/>}
            {displayProfileDropdown && <ProfileDropdown hideProfileDropdown={hideProfileDropdown} showLogin={showLogin} showRegister={showRegister}/>}
            <div className="login-wrapper">
                {displayLoginPrompt && <LoginDialog show={showLogin} hide={hideLogin} />}
            </div>
            <div className="login-wrapper">
                {displayRegisterPrompt && <SignupDialog show={showRegister} hide={hideRegister}/>}
            </div>
        </div>
    );
}

export default TopBar
