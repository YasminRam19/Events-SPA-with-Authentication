import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

//Triggered whenever the form is submitted
export const action = async ({ request }) => {
  //Get current url params by default browser features
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }
  //Get acces to the form data that was submitted
  const data = await request.formData();
  //Get method existis on the data object returned by formData
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(authData),
  });

  //If validation errors
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  //Extract the token
  const resData = await response.json();
  const token = resData.token;
  //Store the token
  localStorage.setItem("token", token);
  return redirect("/");
};
