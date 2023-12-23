import { useState } from "react";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  /*
  //State-based logic to toggle Login/Create New User Button
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }*/

  //Data received b the action function that was submitted by the form.
  const data = useActionData();
  const navigation = useNavigation();

  //Currently set query parameters
  const [searchParams] = useSearchParams();
  //get method retrieves the value of the specific query paramater (mode)
  const isLogin = searchParams.get("mode") === "login";
  //Holds the current submission state
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {/* Output error data we might get */}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {/* <button onClick={switchAuthHandler} type="button">
            {isLogin ? "Create new user" : "Login"}
          </button> */}
          {/* Link that allow to switc between modes */}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
