import React from 'react'
import "./createPage.css";
function successPage(){
    

    return(
        
        <div className="spacing successBackground">
            <div className="successDialog">
                <p>Successfully submitted!</p>
                <p>Thank you for creating a new page.</p>
            
            <a href="/">
                    <button className="homepage-button">
                        Back to homepage
                    </button>
            </a>
            </div>
        </div>
    );
}

export default successPage;