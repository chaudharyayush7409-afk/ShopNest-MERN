import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../config';
import '../styles/auth.css';

const Verify = () => {
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    // Email passed from register page
    const email = location.state?.email;

    const handleverify = async (e) => {
        e.preventDefault();

        console.log("Verify button clicked");
        console.log("Email:", email);
        console.log("OTP:", otp);

        if (!otp || otp.length !== 6) {
            alert('Please enter valid OTP');
            return;
        }

        if (!email) {
            alert('Email not found. Register again');
            navigate('/register');
            return;
        }

        try {
            console.log("Sending OTP verification request...");

            const res = await fetch(
                `${config.API_URL}/auth/verify-otp`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        otp
                    })
                }
            );

            console.log("Response status:", res.status);

            const data = await res.json();

            console.log("Response:", data);

            if (res.ok) {
                alert('OTP verified successfully');
                navigate('/login');
            } else {
                alert(data.message || 'Invalid OTP');
            }

        } catch (error) {
            console.error("OTP verification error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="verify-container">

            <div className="verify-box">

                <h2>Verify OTP</h2>

                <p>
                    OTP sent to: {email}
                </p>

                <form onSubmit={handleverify}>

                    <input
                        type="text"
                        placeholder="Enter 6 digit OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(
                                e.target.value
                                    .replace(/\D/g, '')
                                    .slice(0, 6)
                            )
                        }
                        maxLength="6"
                        inputMode="numeric"
                        required
                    />

                    <button type="submit">
                        Verify OTP
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Verify;
