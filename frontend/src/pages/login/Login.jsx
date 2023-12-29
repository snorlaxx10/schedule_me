import { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <form className="loginBox" onSubmit={handleClick}>
        <div className="heading"> Login </div>
        <input
          placeholder="Enter your email."
          type="email"
          className="loginInput"
          ref={email}
          required
        />
        <input
          placeholder="Enter your password."
          type="password"
          className="loginInput"
          ref={password}
          required
          minLength="5"
        />
        <button className="loginButton">Login</button>
        <button className="loginRegisterButton" onClick={navigateRegister}>
          Create a new account
        </button>
      </form>
    </div>
  );
}
