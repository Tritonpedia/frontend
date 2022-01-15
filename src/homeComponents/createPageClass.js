import React from 'react'
import "./createPage.css";
//import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL; 

function createPageClass() {

    let coverImageInput;

    function previewImage() {
        const preview = document.getElementById("course-preview-img");
        const file = document.querySelector("input[type=file]").files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            preview.src = reader.result;
            coverImageInput = reader.result;
            //   console.log(reader.result);
            // setPreviewImgSrc(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }


    function handleSubmit(e) {
        e.preventDefault();

        let titleInput;
        let typeInput;
        let contentInput;

        if (document.getElementById("titleInput").value === null) {
            titleInput = " ";
        }
        else {
            titleInput = document.getElementById("titleInput");
        }

        if (document.getElementById("typeInput").value === null) {
            typeInput = " ";
        }
        else {
            typeInput = document.getElementById("typeInput");
        }

        if (document.getElementById("contentInput").value === null) {
            contentInput = " ";
        }
        else {
            contentInput = document.getElementById("contentInput");
        }

        let user = JSON.parse(localStorage.getItem('currentSession'));
        let JWTtoken = user.token;

        let postBody = {
            name: titleInput.value,
            // date: new Date().getTime()/1000,
            description: contentInput.value,
            image: coverImageInput,
            // links: linksInput.value,
        }

        console.log(postBody);

        fetch(`${REACT_APP_BACKEND_URL}/class/${typeInput.value}`, {
            method: 'POST', 
            headers: {
                'content-type': "application/json",
                'auth_token': JWTtoken
            }
        }).then(response => {
            if (!response.json()["value"]) {
                fetch(`${REACT_APP_BACKEND_URL}/department/`, {
                    method: 'POST',
                    headers: {
                        'content-type': "application/json",
                        'auth_token': JWTtoken
                    },
                    body: JSON.stringify({
                        name: typeInput.value
                    })
                }).then(() => {
                    fetch(`${REACT_APP_BACKEND_URL}/class/${typeInput.value
                        }`, {
                        method: 'POST',
                        headers: {
                            'content-type': "application/json",
                            'auth_token': JWTtoken
                        },
                        body: JSON.stringify(postBody)
                    }).then(response => { window.location.assign("/successPage") });

                });
            } else {
                fetch(`${REACT_APP_BACKEND_URL}/class/${typeInput.value}`, {
                    method: 'POST',
                    headers: {
                        'content-type': "application/json",
                        'auth_token': JWTtoken
                    },
                    body: JSON.stringify(postBody)
                    }).then(response => {window.location.assign("/successPage")});
                // }).then(response => console.log(response));
            }
        })

    }

    return (

        <div className="spacing" style={{ backgroundImage: "url(https://ucsandiegobookstore.com/Images/06BookstorePerksWallpapers.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
            <div className="fullPage">
                <div id="buttonsDiv">
                    <a href="/">
                        <button className='bg-gray-300 rounded-md hover:bg-blue-300 transition-all'>
                            Back<i className='fas fa-arrow-left'></i>
                        </button>
                    </a>

                    <a href="/createPageSection">
                        <button className="createsection-button">
                            Create Section
                        </button>
                    </a>
                </div>

                <div id="formDiv" className="spacing px-64">
                    <form onSubmit={e => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <label className="spacing yellow">Department</label>
                        <input id="text" className="textbox " style={{ type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5" }} required />

                        <label id="largetextbox" className="spacing yellow">Course Name</label>
                        <input id="titleInput" className="textbox" style={{ type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5" }} required></input>

                        <label className="spacing yellow">Content</label>
                        <textarea id="contentInput" class="textbox" style={{ height: "392px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5" }} required />

                        <label class="spacing yellow">Cover Photo</label>
                        <input id="coverImageInput" className="yellow" type="file" name="filename" onChange={previewImage}></input>
                        <img src="" id="course-preview-img" alt="Preview..." style={{ width: "40%", maxHeight: "auto" }}></img>


                        {/* <label className="spacing yellow">Additional Links</label>
                        <input id="linksInput" class="textbox" style={{type: "text", height: "30px", fontSize: "18px", fontFamily: "Montserrat, sans-serif", zIndex: "5"}}></input> */}

                        <div className="spacing" style={{ float: "right", marginTop: "3%" }}>
                            <button type="submit" className="publish-button">
                                Publish
                            </button>
                        </div>

                    </form>


                </div>
            </div>
        </div>
    );
}

export default createPageClass;