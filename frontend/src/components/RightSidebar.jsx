// src/components/RightSidebar.jsx
import React from 'react';
import './Header.css';

function RightSidebar() {
    return (
        <div className="right-sidebar p-3">
            <h5 className="text-muted mb-3">People You May Know</h5>
            <div className="suggestion mb-3 d-flex align-items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlYJfFRvdZG0LNuiRs6l1PNx1bIfZkqZIsQ&s" className="rounded-circle me-2" alt="user" />
                <div>
                    <strong>Gregory</strong>
                    <div><button className="btn btn-sm btn-outline-primary mt-1">Add Friend</button></div>
                </div>
            </div>
            <div className="suggestion mb-3 d-flex align-items-center">
                <img src="https://cinetown.s3.ap-south-1.amazonaws.com/people/profile_img/1714563743.jpeg" className="rounded-circle me-2" alt="user" />
                <div>
                    <strong>Malvika Sharma</strong>
                    <div><button className="btn btn-sm btn-outline-primary mt-1">Add Friend</button></div>
                </div>
            </div>

            <hr />

            <h6 className="text-muted mt-4 mb-2">Sponsored</h6>
            <div className="row g-3">
                <div className="col-4 col-lg-4">
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/250px-Reddit_Logo_Icon.svg.png" className="img-fluid rounded-circle mb-2" alt="ad" />
                </div>
                <div className="col-4 col-lg-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg" className="img-fluid rounded-circle" alt="ad2" />
                </div>
                <div className="col-4 col-lg-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" className="img-fluid rounded-circle" alt="ad3" />
                </div>
            </div>


        </div>
    );
}

export default RightSidebar;
