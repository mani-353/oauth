import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';

const clientId = "56383530545-5g9n6fbpsst2nbt1g21ad6kjqckbkm80.apps.googleusercontent.com";

function LogIn() {
    const [sessionKey, setSessionKey] = useState(null);
    // tokenID => mailId
    const onSuccess = async (response) => {
        console.log("LOGIN SUCCESS!", response.profileObj);

        // Send tokenId to backend
        const res = await fetch("http://localhost:5000/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.tokenId }),
        });

        const data = await res.json();
        console.log(data);

        if (data.sessionKey) {
            setSessionKey(data.sessionKey); // Store session key in state/localStorage
            console.log("Session Key:", data.sessionKey);
        }
    }

    const onFailure = (response) => {
        console.log(response);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
            />
        </div>
    );
}

export default LogIn;