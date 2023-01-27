import useLoginStore from "../store/loginStore";
import { Button } from "reactstrap";
import classes from "./LoginPage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const LoginPage = (props) => {
  const { loginHandler, loggedUser } = useLoginStore();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const getUsername = (event) => {
    setEnteredUsername(event.target.value);
  };

  const getPassword = (event) => {
    setEnteredPassword(event.target.value);
  };



  return (
    <div>
      <h2 className={classes.h2}>Login</h2>
      {!Object.keys(loggedUser).length > 0 && (
        <>
          <form onSubmit={(e) => loginHandler(e, enteredUsername, enteredPassword)} className={classes.formContainer}>
            <div className={classes.inputsContainer}>
              <div className="d-flex justify-content-center">
                <label htmlFor="username">Username:&nbsp;</label>
                <input type="email" id="username" onChange={getUsername} required />
              </div>
              <div className="d-flex justify-content-center">
                <label htmlFor="password">Password:&nbsp;</label>
                <input type="password" id="password" onChange={getPassword} required />
              </div>
              <div>
                <Link to="/password-reset" style={{ color: "white" }}>
                  Forgotten password?
                </Link>
              </div>
              <div className="d-flex justify-content-center">
                <Button className={classes.btn} color="primary">
                  Log in
                </Button>
              </div>
            </div>
            <div>
              <span>Don't have an account yet? &nbsp;</span>
              <Link to="/register">
                <Button color="success">Register</Button>
              </Link>
            </div>
          </form>
        </>
      )}
      {Object.keys(loggedUser).length > 0 && (
        <div>
          <p>You have successfully logged in!</p>
          <p>Feel free to create your own, or browse throughout the existing polls.</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
