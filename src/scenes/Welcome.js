import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Welcome({ user }) {
  console.log(user);

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.clear();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Welcome</h1>
      <h2>{user.displayName || user.email}</h2>
      {user.photoURL && (
        <img src={user.photoURL} alt="Profile picture logged-in user" />
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
