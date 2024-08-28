// Import React
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Import Style
import { Container } from "react-bootstrap";
import noResult from "../img/no-result.png";

// Import Components
import GroupTour from "../components/Main/Main";

// Import API
import { API } from "../config/api";
import Image from "../components/Utils/Image";
import NavbarComp from "../components/Navbar/Navbar";
import Card from "../components/Items/card/Card";
import services from "../data/services.json";
import "./Home.css";

function Home() {
  const [trips, setTrips] = useState(null);
  const currentState = useSelector((state) => state);
  const isLoginSession = useSelector((state) => state.isLogin);
  const isAdmin = currentState.user.status === "admin";

  const getTrips = async () => {
    try {
      const response = await API.get("/trips");
      setTrips(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  console.log(trips);

  return (
    <>
      {isLoginSession && <NavbarComp />}
      {isAdmin ? (
        <>
          <GroupTour data={trips} isAdmin={isAdmin} />
        </>
      ) : (
        <div>
          <div className="header-image">
            {!isLoginSession && <NavbarComp />}
            <div className="container-lg container">
              <h1>Explore</h1>
              <h2>your amazing city together</h2>
              <span className="text-white">Find great places to holliday</span>
            </div>
          </div>

          {/* SERVICE CARDS */}
          <section className="container service-card relative flex justify-center grid grid-cols-4 gap-4">
            {services.map((service, index) => {
              return (
                <Card
                  key={index}
                  image={service.image}
                  title={service.title}
                  subtitle={service.subtitle}
                />
              );
            })}
          </section>
          {/* TOUR SECTION */}
          <section
            id="tour-section"
            className="flex items-center justify-center mt-5 mb-5"
          >
            {trips === null ? (
              <div>
                <Image
                  src={noResult}
                  width={400}
                  height={400}
                  alt="not-found"
                />
              </div>
            ) : (
              <Container fluid className="main">
                <GroupTour data={trips} />
              </Container>
            )}
          </section>
        </div>
      )}
    </>
  );
}
export default Home;
