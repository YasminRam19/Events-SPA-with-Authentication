const getAuthToken = () => {
  //Get token from localStorage
  const token = localStorage.getItem("token");
  return token;
};

export default getAuthToken;
