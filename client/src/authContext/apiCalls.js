import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { apiUrl } from "../constant";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
