import { Link } from "react-router-dom";

export default function Singup() {
  return (
    <>
      <h1>Signup</h1>
      <p>
        Already a user? <Link to="/login">Login</Link>
      </p>
    </>
  );
}
