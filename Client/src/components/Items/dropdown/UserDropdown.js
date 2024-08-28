// Import React
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import store from "../../../reducers/store";

// Import Style
import "./DropdownComp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "../../../img/Icon1.png";
import User from "../../../img/user 2.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";
import { Navbar, Nav } from "react-bootstrap";

// Import API
import { API, setAuthToken } from "../../../config/api";
import checkUser from "../../../config/auth";

toast.configure();

function UserDropdown() {
  let history = useHistory();
  const [profile, setProfile] = useState(null);
  const currentState = useSelector((state) => state);

  const logoutSession = () => {
    store.dispatch({
      type: "LOGOUT",
      isLogin: false,
      user: {
        email: "",
        password: "",
      },
    });

    history.push("/");
    toast.success("Logout success, welcome back anytime", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  const getMyProfile = async () => {
    try {
      const response = await API.get(`/user/${currentState.user.id}`);
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <Navbar expand="lg" className="container">
      <Navbar.Brand href="/">
        <Link to="/">
          <img src={Icon} alt="icon-dewetour" className="icon-dewetour" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ background: "white" }}
      />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="flex items-center justify-end"
      >
        <Nav className="space-x-4">
          <Nav.Link href="#profile" className="nav-link">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div
                className="d-flex align-items-center gap-2"
                style={{ color: "white" }}
              >
                <img src={User} alt=""></img>
                Profile
              </div>
            </Link>
          </Nav.Link>
          <Nav.Link href="#payment" className="nav-link">
            <Link to="/payment" style={{ textDecoration: "none" }}>
              <div
                className="d-flex align-items-center gap-2"
                style={{ color: "white" }}
              >
                <img src={Payment} alt=""></img>
                Payment
              </div>
            </Link>
          </Nav.Link>
          <Nav.Link href="#logout" className="nav-link">
            <Link onClick={logoutSession} style={{ textDecoration: "none" }}>
              <div
                className="d-flex align-items-center gap-2"
                style={{ color: "white" }}
              >
                <img src={Logout} alt=""></img>
                Logout
              </div>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default UserDropdown;
