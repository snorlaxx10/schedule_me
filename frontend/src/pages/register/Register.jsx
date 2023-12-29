import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      await axios.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Email already exists. Use a different email.");
    }
  };

  return (
    <div className="register">
      <form className="registerBox" onSubmit={handleClick}>
        <div className="heading"> Register </div>
        <input
          placeholder="Enter your name."
          ref={name}
          className="registerInput"
        />
        <input
          placeholder="Enter your email."
          ref={email}
          className="registerInput"
        />
        <input
          placeholder="Enter your password."
          type="password"
          ref={password}
          className="registerInput"
          minLength="5"
        />
        <button className="registerButton" type="submit">
          Sign up
        </button>
        <button className="registerLoginButton" onClick={navigateLogin}>
          Log in
        </button>
      </form>
    </div>
  );
}
