import * as api from "../../api";

export const getPost = () => async (dispatch) => {
  try {
    const { data } = await api.getPost();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPot = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPot(id);
    console.log(data);
    dispatch({ type: "FETCH_POST", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.getPostBySearch(searchQuery);
    dispatch({ type: "FETCH_BY_SEARCH", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (dataPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(dataPost);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, dataPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, dataPost);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const login = (result, token) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH", payload: { result, token } });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
