import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    alert("Invalid email and/or password. Try again.");
  }
};

export const getPosts = async() => {
  try {
    //query a join table at endpoint and then retrieve that data
    const res = await axios.get("/posts", {timeout: 10000});
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getByPopular = async () => {
  try {
    //query the posts sorted by most likes
    const res = await axios.get("/posts/popular", {timeout: 10000});
    return res.data;
  } catch (err) {
    return err;
  }
};

