import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import axios from "axios"; // For making API requests

// Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Force account selection every time
provider.setCustomParameters({ prompt: "select_account" });

const App = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (person) => {
      setUser(person ? person : null);
      console.log(person);

      if (person) {
        // Fetch user data from backend
        axios
          .get(`http://localhost:5000/getUser?uid=${person.uid}`)
          .then((response) => {
            setUserData(response.data);
          })
          .catch((error) => console.error("Error fetching user data:", error));
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <center>
        {user ? (
          <div>
            <h1>Welcome, {user.displayName}!</h1>
            {userData && (
              <>
                <p>Email: {userData.email}</p>
                <img src={userData.photoURL} alt="Profile" />
              </>
            )}
            <button onClick={() => signOut(auth)}>Sign Out</button>
          </div>
        ) : (
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        )}
      </center>
    </div>
  );
};

export default App;
