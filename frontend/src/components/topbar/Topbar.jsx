import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Logout } from "../../context/AuthActions.js";
export default function Topbar() {
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const onLogout = () => {
    dispatch(Logout());
    navigate("/login");
  };

  const onProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ScheduleMe</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="topbarLink">Home</span>
            {/* <img className="topbarLink" src={`assets/house.png`} alt="Home" width="32" height="32"></img> */}
          </Link>
          <Link to="/fakePage" style={{ textDecoration: "none" }}>
            <span className="topbarLink">PlaceholderPage</span>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <span className="topbarLink">Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="topbarRight">
        <input
          className="pfp_btn topBarRightItem"
          type="image"
          name="pfpButton"
          src="../assets/default_pfp.jpeg"
          alt=""
          onClick={onProfile}
        ></input>
        <button className="logoutBtn topBarRightItem" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
