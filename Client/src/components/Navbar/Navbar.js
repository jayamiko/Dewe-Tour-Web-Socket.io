// Import React
import { Link } from "react-router-dom";
import { useContext } from "react";

// Import Components
import Login from './Login'
import Register from './Register'
import AdminDropdown from "../Items/dropdown/AdminDropdown";
import { AuthContext } from "../../Context/AuthContextProvider";
import UserDropdown from "../Items/dropdown/UserDropdown";

// Import Style
import "./Navbar.css";
import Icon from "../../img/Icon1.png";
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
} from 'react-bootstrap';


function NavbarComp() {

    const { stateAuth, dispatch } = useContext(AuthContext);

    return (
        <Navbar bg="dark" expand="lg" className="navbar-comp">
            <Container fluid style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '85px',
                width:'100vw',
                padding:'10px'
            }}>
                <div >
                    <Navbar.Brand href="#" className='navbar-brand'>
                        <Link to="/">
                            <img src={Icon} alt="dewe tour" />
                        </Link>
                    </Navbar.Brand>
                </div>
                <div >
                    {stateAuth.isLogin || stateAuth.isAdmin ? (
                        stateAuth.user.status === "admin" ? (
                            <AdminDropdown />
                        ) : (
                            <UserDropdown />
                        )
                    ) : (
                        <div style={{
                            display:'flex',
                         flexDirection:'row-reverse',
                         }}>
                            <Navbar.Toggle aria-controls="navbarScroll"
                            className="nav-toggle"
                                style={{
                                    border: 'solid white 1px',
                                    background: 'white',
                                    height:'40px',
                                    marginLeft:'20px',
                                    marginTop:'15px',
                                    marginRight:'10px'
                                }}
                            />
                            <Navbar.Collapse id="navbarScroll" >
                                <Nav
                                    className="me-auto my-2 my-lg-0 "
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll>
                                    <div className="btn-login-register">
                                        <Nav.Link href="#action1">
                                            <Login />
                                            <Register />
                                        </Nav.Link>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    )}
                </div>
            </Container>
        </Navbar >
    );
}

export default NavbarComp;