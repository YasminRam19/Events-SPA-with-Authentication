import { redirect } from "react-router-dom";

//Check the remaining life of the token
export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

//Get token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

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
