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

function NavbarComp() {
  const currentState = useSelector((state) => state);
  const isAdmin = currentState.user.status === "admin";
  const isLoginSession = useSelector((state) => state.isLogin);
  return (
    <>
      {isLoginSession || isAdmin ? (
        currentState.user.status === "admin" ? (
          <AdminDropdown />
        ) : (
          <UserDropdown />
        )
      ) : (
        <>
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
                  onClick={null}
                  disabled={false}
                >
                  Login
                </Button>
                <Button
                  bgColor="#ffaf00"
                  color="white"
                  onClick={null}
                  disabled={false}
                >
                  Register
                </Button>
                {/* <Login />
                <Register /> */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      )}
    </>
  );
}

export default NavbarComp;
