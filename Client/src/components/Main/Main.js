// Import React
import { Link, useHistory } from "react-router-dom";

export default function GroupTour({ data, isAdmin }) {
  const history = useHistory();
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <section className="group-tour mb-5">
      <div className="container">
        <div className="title text-center">
          {isAdmin ? (
            <div
              className="d-flex justify-content-between"
              style={{ paddingTop: 70 }}
            >
              <h2
                className="fs-1 fw-bold"
                style={{
                  paddingLeft: "20px",
                }}
              >
                Income Trip
              </h2>
              <button
                className="buttonAddTrip"
                style={{
                  width: 150,
                  height: 40,
                  background: "#FFAF00",
                  fontSize: "18px",
                  color: "#FFFFFF",
                  fontWeight: "900",
                  fontFamily: "Avenir",
                  lineHeight: "25px",
                  textAlign: "center",
                  borderRadius: "5px",
                  border: "white",
                }}
                onClick={() => {
                  history.push("/add-trip");
                }}
              >
                Add Trip
              </button>
            </div>
          ) : (
            <h2 className="fs-1 fw-bold">Group Tour</h2>
          )}
        </div>
        <div
          className="row gy-5 pb-5"
          style={{
            marginTop: "5px",
          }}
        >
          {data?.map((item, index) => {
            return (
              <>
                <div
                  key={`groupTour-index${index}`}
                  className={`${
                    item.quota > 0
                      ? "col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
                      : "d-none"
                  }`}
                >
                  <Link
                    to={`/detail/${item.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card shadow-sm p-2">
                      <img
                        src={item.image[0].url}
                        alt={item.title}
                        className="card-img-top rounded mb-1"
                        width="328"
                        height="241"
                      />
                      <div className="capacity rounded-start bg-white text-dark d-flex justify-content-center align-items-center fw-bold">
                        {item.quota}/{item.maxQuota}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mb-3 text-dark fw-bold text-truncate">
                          {item.title}
                        </h5>
                        <div className="card-text d-flex justify-content-between">
                          {isAdmin ? (
                            <span style={{ color: "orange" }}>
                              Rp. {(item.maxQuota - item.quota) * item.price}
                            </span>
                          ) : (
                            <span style={{ color: "orange" }}>
                              Rp. {rupiah(item.price)}
                            </span>
                          )}
                          <span className="text-muted">{item.country}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
