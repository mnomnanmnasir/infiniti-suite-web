import React from 'react';
import { useParams } from 'react-router-dom';

function SSTrack() {
    const token = localStorage.getItem("auth_token")
    const email = localStorage.getItem("email")
    const password = localStorage.getItem("password")
    return (
        <div style={{ padding: '70px 0 0 65px' }}>
            <iframe src={`https://sstrack-frontinfiniti.vercel.app/signin?email=${email}&password=${password}`} style={{ width: "100%", height: "100vh", overflow: "hidden", border: "none" }} />;
        </div>
    )
}

export default SSTrack;