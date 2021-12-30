import {createStore} from "redux";
import authReducer from "./reducers/auth";

const store = createStore(authReducer);

export default store;
