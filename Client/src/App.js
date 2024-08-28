// Import React
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Import Pages
import DetailTrip from "./pages/detail_trips/DetailTrip";
import Home from "./pages/Home";
import Payment from "./pages/payment/Payment";
import Profile from "./pages/profile/Profile";
import AddTrip from "./pages/addTrip/addTrip";
import ListTransaction from "./pages/list_transactions/ListTransaction";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";
import checkUser from "./config/auth";

// Import Style
import "./App.css";

// Import API
import { setAuthToken } from "./config/api";
import Footer from "./components/Footer/Footer";
import NavbarComp from "./components/Navbar/Navbar";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  });

  useEffect(() => {
    checkUser();
  }, []);

  const currentState = useSelector((state) => state);

  return currentState.isLoading ? (
    <div className="loading-section">
      <div className="loading">
        <p>loading</p>
        <span></span>
      </div>
    </div>
  ) : (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:id" component={DetailTrip} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/add-trip" component={AddTrip} />
        <PrivateRoute
          exact
          path="/list-transaction"
          component={ListTransaction}
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
