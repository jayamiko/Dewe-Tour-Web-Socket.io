import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
  const user = useSelector((state) => state.user);
  const getAccess = user.status === "admin" ? true : false;
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          getAccess ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
};

export default PrivateRoute;
