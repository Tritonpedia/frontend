import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { LoginDialog, SignupDialog } from '../../popups/dialogs';
import SearchBar from '../../topBarComponents/SearchBar';
import './LandingPage.css'
import { ReactComponent as HomeSVG } from './res/home.svg';

const LandingPage = () => {
    const [loginDialogShown, setShowLoginDialog] = useState(false);
    const [signupDialogShown, setShowSignupDialog] = useState(false);
    function hideLoginDialog() { setShowLoginDialog(false); }
    function hideSignupDialog() { setShowSignupDialog(false); }
    function showLoginDialog() { setShowLoginDialog(true); }
    function showSignupDialog() { setShowSignupDialog(true); }
    return (
        <div className="flex flex-col pt-[30vh] items-center  landing-container h-full bg-blue-200">
            <div className='flex flex-col items-center'>
                <div className='flex items-center'>
                    <HomeSVG className="w-20" />
                    <h1 className="text-3xl font-bold pl-3">Tritonpedia</h1>
                </div>
                <div className='flex justify-center items-center h-full w-full'>
                    <SearchBar />
                    {/* <input
                        type="text"
                        id="search-input"
                        placeholder="search"
                        name="search-input"
                        className='bg-gray-200 rounded-3xl p-4'
                    /> */}
                </div>
            </div>
            <div style={{ position: "absolute", top: 0 }}>
                {loginDialogShown && <LoginDialog show={showLoginDialog} hide={hideLoginDialog} />}
                {signupDialogShown && <SignupDialog show={showSignupDialog} hide={hideSignupDialog} />}
            </div>
        </div>
    )
}

export default LandingPage;
