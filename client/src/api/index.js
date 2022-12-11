import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
// const url = "http://localhost:5000";

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// export const getPost = () => axios.get(`${url}/post`);
// export const createPost = (newPost) => axios.post(`${url}/post`, newPost);
// export const updatePost = (id, updatedPost) =>
//   axios.patch(`${url}/post/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/post/${id}`);

export const getPost = () => API.get("/post");
export const getPot = (id) => API.get(`/post/${id}`);
export const getPostBySearch = (searchQuery) =>
  API.get(
    `/post/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/post", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);

// // export const signIn = (formData) => axios.post(`${API}/user/signin`, formData);
// export const signUp = (formData) =>
//   axios.post(`${url}/auth/register`, formData);

export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post(`/auth/register`, formData);
