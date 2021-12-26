// Import React
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

// Import Components
import { AuthContext } from "../../../Context/AuthContextProvider";

// Import Style
import "./DropdownComp.css";
import Profile from "../../../img/elips.png";
import User from "../../../img/user 2.png";
import Payment from "../../../img/Vector.png";
import Logout from "../../../img/logout.png";
import Polygon from "../../../img/Polygon.png";
import {
    Navbar,
    Nav,
    NavDropdown,
} from 'react-bootstrap'

// Import API
import { API } from '../../../config/api'

function UserDropdown() {
    let history = useHistory();
    const { stateAuth, dispatch } = useContext(AuthContext);
    const [profile, setProfile] = useState(null)
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
        history.push('/')
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
            <>
                <Navbar.Toggle aria-controls="navbarScroll"
                    style={{
                        border: 'solid white 1px',
                        background: 'white',
                        position: 'absolute',
                        left: '340px',
                        top: '30px'
                    }}
                />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav
                        className="me-auto my-2 my-lg-0 nav-drop-user"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <div className="nav-item">
                            <Nav.Link href="#action1" className="nav-link">
                                <Link to="/profile" style={{textDecoration:'none'}}>
                                    <div className="d-flex align-items-center gap-2"
                                        style={{ color: 'white' }}
                                    >
                                        <img src={User} alt=""></img>
                                        Profile
                                    </div>
                                </Link>
                            </Nav.Link>
                            <Nav.Link href="#action1" className="nav-link">
                                <Link to="/payments" style={{textDecoration:'none'}}>
                                    <div className="d-flex align-items-center gap-2"
                                        style={{ color: 'white' }}
                                    >
                                        <img src={Payment} alt=""></img>
                                        Payment
                                    </div>
                                </Link>
                            </Nav.Link>
                            <Nav.Link href="#action1" className="nav-link">
                                <Link onClick={logoutHandle} style={{textDecoration:'none'}}>
                                    <div className="d-flex align-items-center gap-2"
                                        style={{ color: 'white' }}
                                    >
                                        <img src={Logout} alt=""></img>
                                        Logout
                                    </div>
                                </Link>
                            </Nav.Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </>
            <div className="dropdown p-5 ">
                <img className="polygon" src={Polygon} alt="" />
                {profile?.photo === null ? (
                    <img
                        src={Profile}
                        alt="Profile"
                        width="50"
                        height="50"
                        className="border border-3 border-primary rounded-circle"
                    />
                ) : (
                    <img
                        src={profile?.photo}
                        alt="Profile"
                        width="50"
                        height="50"
                        className="border border-3 border-primary rounded-circle"
                    />
                )}
                <div className="dropdown-content py-3 px-3">
                    <div className="desc d-flex flex-column gap-4">
                        <Link to="/profile">
                            <div className="d-flex align-items-center gap-2">
                                <img src={User} alt=""></img>
                                <a className="fw-bold text-dark" href="/">Profile</a>
                            </div>
                        </Link>
                        <Link to="/payment">
                            <div className="d-flex align-items-center gap-2">
                                <img src={Payment} alt=""></img>
                                <a className="fw-bold text-dark" href="/payment">Pay</a>
                            </div>
                        </Link>
                        <div
                            onClick={logoutHandle}
                            className="d-flex align-items-center po-hover gap-2"
                        >
                            <img src={Logout} alt=""></img>
                            <a className="fw-bold text-dark" href="/">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDropdown;