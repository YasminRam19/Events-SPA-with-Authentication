import { redirect } from "react-router-dom";

const getAuthToken = () => {
  //Get token from localStorage
  const token = localStorage.getItem("token");
  return token;
};

export default getAuthToken;

export const tokenLoader = () => {
  return getAuthToken();
};

//Loader to protect the routes
export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }

  return null;
};
