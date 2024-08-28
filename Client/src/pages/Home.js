// Import React
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Import Style
import { Container } from "react-bootstrap";
import noResult from "../img/no-result.png";

// Import Components
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import GroupTour from "../components/Main/Main";
import Footer from "../components/Footer/Footer";

// Import API
import { API } from "../config/api";

function Home() {
  const [trips, setTrips] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const currentState = useSelector((state) => state);
  const isAdmin = currentState.user.status === "admin";

  const getTrips = async () => {
    try {
      const response = await API.get("/trips");
      console.log(response.data.data);
      setTrips(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      {isAdmin ? (
        <>
          <GroupTour data={trips} isAdmin={isAdmin} />
        </>
      ) : (
        <div>
          <Header
            trips={trips}
            setIsSearching={setIsSearching}
            searchData={searchData}
            setSearchData={setSearchData}
          />
          {isSearching ? (
            <div className="mt-5">
              <GroupTour data={trips} searchData={searchData} />
            </div>
          ) : (
            <>
              {trips === null ? (
                <div className="d-flex justify-content-center align-items-center fs-4">
                  <img
                    src={noResult}
                    alt="no-result"
                    width="450px"
                    height="450px"
                  />
                </div>
              ) : (
                <Container fluid className="main">
                  <GroupTour data={trips} />
                </Container>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
export default Home;
