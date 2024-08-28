// Import React
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import moment from "moment";
// Import Components
import Navbar from "../../components/Navbar/Navbar";

// Import Style
import "./DetailTrip.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calender from "../../img/calender.png";
import Plane from "../../img/plane.png";
import Hotel from "../../img/hotel.png";
import Time from "../../img/time.png";
import Meal from "../../img/meal.png";

// Import API
import { API } from "../../config/api";
import Image from "../../components/Utils/Image.jsx";
import InfoTripBox from "../../components/Items/box/InfoTripBox.jsx";
import Login from "../../components/Navbar/Login.js";
import Register from "../../components/Navbar/Register.js";

toast.configure();

function DetailTrip() {
  const { id } = useParams();
  const history = useHistory();

  const currentState = useSelector((state) => state);
  const stateAuth = currentState.user;
  const isLoginSession = useSelector((state) => state.isLogin);

  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const [detailTrip, setDetailTrip] = useState(null);

  const getDetailTrip = async (id) => {
    try {
      const response = await API.get("/trip/" + id);
      setDetailTrip(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailTrip(id);
  }, [id]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(number);
  };

  const [transaction, setTransaction] = useState({
    counterQty: 1,
    total: detailTrip?.price,
    tripId: detailTrip?.id,
    userId: stateAuth.id,
  });

  let totalPrice = transaction?.counterQty * detailTrip?.price;
  const [quotaRemaining, setQuotaRemaining] = useState({
    quota: detailTrip?.quota - transaction?.counterQty,
  });

  const [dataTransaction, setDataTransaction] = useState([]);

  useEffect(() => {
    const getDataTransactionsByUserId = async () => {
      const response = await API.get("/transactions");
      const filteredTransactions = response.data.data.filter(
        (item) => item.user.id === stateAuth.id
      );
      setDataTransaction(filteredTransactions[filteredTransactions.length - 1]);
    };
    getDataTransactionsByUserId();
  }, [stateAuth.id]);

  const handleAdd = () => {
    if (transaction?.counterQty < detailTrip?.quota) {
      const add = transaction?.counterQty + 1;
      const updateQuota = detailTrip?.quota - add;
      setQuotaRemaining({ quota: updateQuota });
      setTransaction(() => ({
        tripId: detailTrip?.id,
        userId: stateAuth.id,
        counterQty: add,
        total: totalPrice + detailTrip?.price,
      }));
    }
  };

  const handleSubtract = () => {
    if (transaction?.counterQty > 0) {
      const subtract = transaction?.counterQty - 1;
      const updateQuota = detailTrip?.quota - subtract;
      setQuotaRemaining({ quota: updateQuota });
      setTransaction(() => ({
        tripId: detailTrip?.id,
        userId: stateAuth.id,
        counterQty: subtract,
        total: totalPrice + detailTrip?.price,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (isLoginSession) {
        const detailTripData = await API.get(`/trip/${detailTrip?.id}`);
        const quotaTrip = detailTripData.data.data.quota;

        let resultQuota = quotaTrip - transaction?.counterQty;

        if (resultQuota < 0) {
          toast.success(`Limited Quota Tour`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });

          const pushToHome = setTimeout(() => {
            history.push("/");
          }, 3000);

          return pushToHome;
        }

        if (dataTransaction?.status === "Waiting Payment") {
          toast.success(`Booking is Success`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
          history.push("/payment");
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const bodyTransaction = JSON.stringify(transaction);
        const response = await API.post(
          "/transaction",
          bodyTransaction,
          config
        );

        const bodyQuota = JSON.stringify(quotaRemaining);
        await API.put(`/trip/${detailTrip?.id}`, bodyQuota, config);
        response.data.status === "success" &&
          toast.success(`Order successful, now complete your transaction`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });

        history.push("/payment");
      } else {
        setShowModalLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(detailTrip?.image.slice(1, 4));

  return (
    <>
      <div className="background-nav">
        <Navbar />
      </div>
      <div className="container min-h-screen py-5">
        {/* TITLE */}
        <div>
          <h1 className="title">
            {detailTrip?.day}D/{detailTrip?.night}N {detailTrip?.title}
          </h1>
          <small>{detailTrip?.country}</small>
        </div>

        {/* IMAGE TOUR */}
        <Image
          src={detailTrip?.image[0].url}
          styles="w-full"
          alt="main-image"
        />
        <div className="flex justify-between mt-2">
          {detailTrip?.image.slice(1, 4).map((trip, i) => {
            return <Image key={i} src={trip.url} width="33%" />;
          })}
        </div>

        {/* INFO DESCRIPTION */}
        <h5 className="text-black mt-4 font-bold">Information Trip</h5>

        <div className="w-full flex flex-wrap justify-between gap-2">
          <InfoTripBox
            title="Accomodation"
            image={Hotel}
            description={detailTrip?.accomodation}
          />
          <InfoTripBox
            title="Transportation"
            image={Plane}
            description={detailTrip?.transportation}
          />
          <InfoTripBox
            title="Transportation"
            image={Meal}
            description={detailTrip?.eat}
          />
          <InfoTripBox
            title="Date Trip"
            image={Time}
            description={`${detailTrip?.day} Day ${detailTrip?.night}Night`}
          />
          <InfoTripBox
            title="Date Trip"
            image={Calender}
            description={moment(detailTrip?.dateTrip).format("l")}
          />
        </div>

        <h5 className="text-black mt-4 font-bold">Description</h5>

        <p className="description">{detailTrip?.description}</p>

        <section className="detail-calculate mb-5">
          <div>
            <div className="d-flex justify-content-between fw-bold fs-5">
              <div style={{ fontFamily: "Avenir" }} className="text-carrot">
                Rp.
                <span className="ml-4">{rupiah(detailTrip?.price)}</span>/
                <span className="text-black">Person</span>
              </div>
              <div className="quantity">
                <button
                  onClick={handleSubtract}
                  className="bg-carrot text-white rounded"
                >
                  -
                </button>
                <span className="text-center px-2">
                  {transaction.counterQty}
                </span>
                <button
                  onClick={handleAdd}
                  className="bg-carrot text-white rounded"
                >
                  +
                </button>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <div className="fs-5">Total :</div>
              <h4 className="totalPrice">Rp. {rupiah(totalPrice)}</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn-booking"
                onClick={handleSubmit}
              >
                BOOK NOW
              </button>

              {/* SHOW MODAL IF USER IS LOGIN YET */}

              <Login
                showModal={showModalLogin}
                setShowModal={setShowModalLogin}
                setShowModalRegister={setShowModalRegister}
              />

              <Register
                showModal={showModalRegister}
                setShowModal={setShowModalRegister}
                setShowModalLogin={setShowModalLogin}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DetailTrip;
