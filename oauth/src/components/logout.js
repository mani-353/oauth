import { GoogleLogout } from 'react-google-login';

const clientId = "56383530545-5g9n6fbpsst2nbt1g21ad6kjqckbkm80.apps.googleusercontent.com";

function LogOut() {
    const onSuccess = () => {
        console.log("logout");
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default LogOut;