// Import React
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContextProvider";

// Import Style
import "./DropdownComp.css";
import Profile from "../../../img/elips.png";
import Logout from "../../../img/logout.png";
import Icon from "../../../img/Icon1.png";
import Polygon from "../../../img/Polygon.png";
// import iconTrans from "../../../img/icontrans.png";
import { Navbar, Nav } from "react-bootstrap";

function AdminDropdown() {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const logoutHandle = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
      isLogin: false,
      isadmin: false,
      user: {
        email: "",
        password: "",
      },
    });
    history.push("/");
  };

  return (
    <>
      <div className="background-nav">
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
            <Nav className="me-auto" className="nav-item-admin">
              <Nav.Link href="#transaction" className="nav-link">
                <Link to="/list-transaction" style={{ textDecoration: "none" }}>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ color: "white" }}
                  >
                    <img src="/assets/journey1.png" alt=""></img>
                    Profile
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
      </div>
    </>
  );
}

export default AdminDropdown;
