import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <h1>Welcome</h1>
      <p>
        Not a user? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  );
}
