// Import React
import React from "react";
import { useContext, useState, useEffect } from "react";

// Import Style
import { Container } from "react-bootstrap";
import noResult from '../img/no-result.png';

// Import Components
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import GroupTour from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import { AuthContext } from "../Context/AuthContextProvider";

// Import API
import { API } from '../config/api'

function Home() {

    const { stateAuth } = useContext(AuthContext);
    const [trips, setTrips] = useState(null);
    const [searchData, setSearchData] = useState("");
    const [isSearching, setIsSearching] = useState(false)

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

    return (
        <>
            {
                stateAuth?.user.status === "admin" ? (
                    <>
                        <Navbar />
                        <GroupTour data={trips} isAdmin={stateAuth.user.status === "admin"} />
                    </>
                ) : (
                    <div>
                        <Navbar />
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
                                        <img src={noResult} alt="no-result" width="450px" height="450px" />
                                    </div>
                                ) : (
                                    <Container fluid className="main">
                                        <GroupTour data={trips} />
                                    </Container>
                                )}
                            </>
                        )}
                        <Footer />
                    </div>
                )
            }
        </>
    );
}
export default Home;