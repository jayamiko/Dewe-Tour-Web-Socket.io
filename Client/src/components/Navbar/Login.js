// Import React
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../../reducers/store";
import { useSelector } from "react-redux";

// Import Style
import { Button, Form } from "react-bootstrap";
import Palm from "../../img/palm1.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import API
import { API, setAuthToken } from "../../config/api";
import checkUser from "../../config/auth";
import CModal from "../Modal/CModal";

toast.configure();

export default function Login({
  showModal,
  setShowModal,
  setShowModalRegister,
}) {
  const history = useHistory();

  const isLoginSession = useSelector((state) => state.isLogin);

  const checkAuth = () => {
    if (isLoginSession) {
      history.push("/");
    }
  };
  checkAuth();

  const closeModal = () => setShowModal(false);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const LoginHandleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const loginSession = async (event) => {
    try {
      event.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(formLogin);

      const response = await API.post("/login", body, config);

      if (response?.status === 200) {
        toast.success("Login Success", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        store.dispatch({
          type: "LOGIN",
          payload: response.data.data,
        });

        setAuthToken(response.data.data.token);
      }

      checkUser();
    } catch (error) {
      console.log(error);
      toast.success("Login Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <CModal show={showModal}>
      <img src={Palm} alt=""></img>
      <h2 className="text-center my-5">Login</h2>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={closeModal}
      ></button>
      <Form>
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={LoginHandleChange}
            type="email"
            id="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            name="password"
            onChange={LoginHandleChange}
            type="password"
            required
            id="password"
          />
        </Form.Group>
        <div class="d-flex flex-column gap-2 ">
          <Button
            onClick={loginSession}
            className="text-white fw-bold"
            variant="warning"
            type="submit"
            required
          >
            Submit
          </Button>
          <small className="text-center">
            Don't have an account ?
            <span
              className="cursor-pointer px-1"
              onClick={() => setShowModalRegister(true)}
            >
              Click Here
            </span>
          </small>
        </div>
      </Form>
    </CModal>
  );
}
