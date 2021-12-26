// Import React
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Import Components
import { AuthContext } from "../../../Context/AuthContextProvider";

// Import Style
import "./DropdownComp.css";
// import Profile from "../../../img/elips.png";
import Icon from "../../../img/Icon1.png";
import User from "../../../img/user 2.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";
// import Polygon from "../../../img/Polygon.png";
import { Navbar, Nav } from "react-bootstrap";

// Import API
import { API } from "../../../config/api";

function UserDropdown() {
  let history = useHistory();
  const { stateAuth, dispatch } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  const logoutHandle = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
      isLogin: false,
      user: {
        email: "",
        password: "",
      },
    });
    history.push("/");
  };

  const getMyProfile = async () => {
    try {
      const response = await API.get(`/user/${stateAuth.user.id}`);
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <>
      <Navbar expand="lg" className="container-navbar-user">
        <Navbar.Brand href="/">
          <Link to="/">
            <img src={Icon} alt="icon-dewetour" className="icon-dewetour" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ background: "white" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" className="nav-item">
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
              <Link onClick={logoutHandle} style={{ textDecoration: "none" }}>
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
    </>
  );
}

export default UserDropdown;
