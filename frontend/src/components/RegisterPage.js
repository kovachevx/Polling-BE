import useLoginStore from "../store/loginStore";
import { Button } from "reactstrap";
import classes from "./RegisterPage.module.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const RegisterPage = (props) => {
  const { registerHandler, loggedUser } = useLoginStore();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepass, setEnteredRepass] = useState("");

  if (Object.keys(loggedUser).length > 0 ) {
      return <Navigate to="/" replace={true}/>
  }

  const getUsername = (event) => {
    setEnteredUsername(event.target.value);
  };

  const getPassword = (event) => {
    setEnteredPassword(event.target.value);
  };

  const getRepass = (event) => {
    setEnteredRepass(event.target.value);
  };

  return (
    <div>
      <h2 className={classes.h2}>Register</h2>
      <form
        onSubmit={(e) => registerHandler(e, enteredUsername, enteredPassword, enteredRepass)}
        className={classes.formContainer}
      >
        <div className={classes.inputsContainer}>
          <div className="d-flex justify-content-center">
            <label htmlFor="registerUsername">Enter email address:&nbsp;</label>
            <input type="email" name="email" id="registerUsername" onChange={getUsername} required />
          </div>
          <div className="d-flex justify-content-center">
            <label htmlFor="registerPassword">Enter password:&nbsp;</label>
            <input type="password" name="password" id="registerPassword" onChange={getPassword} required />
          </div>
          <div className="d-flex justify-content-center">
            <label htmlFor="registerRepass">Repeat password:&nbsp;</label>
            <input type="password" name="confirmPassword" id="registerRepass" onChange={getRepass} required />
          </div>
          <p className={classes.para}>Already have an account? Simply log in.</p>
          <div className="d-flex justify-content-center">
            <Button className={classes.btn} color="success" type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
