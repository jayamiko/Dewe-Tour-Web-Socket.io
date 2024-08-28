// Import React
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Components
import Login from "./Login";
import Register from "./Register";
import AdminDropdown from "../Items/dropdown/AdminDropdown";
import UserDropdown from "../Items/dropdown/UserDropdown";

// Import Style
import "./Navbar.css";
import Icon from "../../img/Icon1.png";
import { Navbar, Nav } from "react-bootstrap";
import Button from "../Utils/Button";
import Image from "../Utils/Image";
import { useState } from "react";

function NavbarComp() {
  const currentState = useSelector((state) => state);
  const isAdmin = currentState.user.status === "admin";
  const isLoginSession = useSelector((state) => state.isLogin);

  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const openModalLogin = () => {
    setShowModalLogin(true);
    setShowModalRegister(false);
  };

  const openModalRegister = () => {
    setShowModalRegister(true);
    setShowModalLogin(false);
  };

  console.log(isLoginSession, " hdjd");

  return (
    <>
      {isLoginSession || isAdmin ? (
        currentState.user.status === "admin" ? (
          <AdminDropdown />
        ) : (
          <UserDropdown />
        )
      ) : (
        <Navbar expand="lg" className="container">
          <Link to="/">
            <Image src={Icon} alt="dewe-tour-logo" />
          </Link>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ background: "white" }}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="flex items-center justify-end"
          >
            <Nav className="space-x-4">
              <Button
                bgColor="skyblue"
                color="white"
                onClick={openModalLogin}
                disabled={false}
              >
                Login
              </Button>

              <Login
                showModal={showModalLogin}
                setShowModal={setShowModalLogin}
                setShowModalRegister={setShowModalRegister}
              />

              <Button
                bgColor="#ffaf00"
                color="white"
                onClick={openModalRegister}
                disabled={false}
              >
                Register
              </Button>

              <Register
                showModal={showModalRegister}
                setShowModal={setShowModalRegister}
                setShowModalLogin={setShowModalLogin}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
}

export default NavbarComp;
