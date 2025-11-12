import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import Navbar from "../components/Navbar";

const NotFound = () => {
    return (
        <>
            <Navbar />
            <div className="notfound-container">
                <h1 className="error-code">404</h1>
                <h2 className="error-text">Oops! Page Not Found</h2>
                <p className="error-description">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="back-home-btn">
                    Go Back Home
                </Link>
            </div>
        </>
    );
};

export default NotFound;
