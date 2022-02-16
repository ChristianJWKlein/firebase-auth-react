import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../ConnectAuth";
import Button from "react-bootstrap/Button";

export default function Login({ setUser, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  useEffect(() => {
    const localUser = localStorage.getItem("displayName");
    const avatar = localStorage.getItem("avatar");
    const uid = localStorage.getItem("uid");

    console.log("localUser from LS ", localUser);
    if (localUser)
      setUser({ ...user, displayName: localUser, photoURL: avatar });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch(alert);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);

        localStorage.setItem("displayName", result.user.displayName);
        localStorage.setItem("avatar", result.user.photoURL);
        localStorage.setItem("uid", result.user.uid);

        console.log("this is my result ", result.user.displayName);
        navigate("/");
      })
      .catch(alert);
  };

  console.log("Here is my user from my parent App compnonent", user);

  return (
    <>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Login" />
      </form>
      <Button
        onClick={handleGoogleLogin}
        style={{ backgroundColor: "blue", color: "red", border: "none" }}
      >
        Sign in with Google
      </Button>
      <p>
        Not a user? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  );
}
