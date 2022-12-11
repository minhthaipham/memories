import * as api from "../../api";

export const login = (dataForm, history) => async (dispatch) => {
  try {
    const { data } = await api.login(dataForm);
    dispatch({ type: "AUTH", payload: data });
    history("/");
  } catch (error) {
    console.log(error);
  }
};

export const register = (dataForm, history) => async (dispatch) => {
  try {
    const { data } = await api.register(dataForm);
    dispatch({ type: "AUTH", payload: data });
    history("/");
  } catch (error) {
    console.log(error);
  }
};
