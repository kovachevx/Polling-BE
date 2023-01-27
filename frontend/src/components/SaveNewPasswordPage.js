import useLoginStore from "../store/loginStore";
import { Button } from "reactstrap";
import classes from "./RegisterPage.module.css";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const SaveNewPassword = (props) => {
  const { saveNewPasswordHandler, loggedUser } = useLoginStore();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepass, setEnteredRepass] = useState("");
  const params = useParams();

  if (Object.keys(loggedUser).length > 0) {
    return <Navigate to="/" replace={true} />;
  }

  const getPassword = (event) => {
    setEnteredPassword(event.target.value);
  };

  const getRepass = (event) => {
    setEnteredRepass(event.target.value);
  };

  return (
    <div>
      <h2 className={classes.h2}>Password Change</h2>
      <form
        onSubmit={(e) => saveNewPasswordHandler(e, enteredPassword, enteredRepass, params.tokenId)}
        className={classes.formContainer}
      >
        <div className={classes.inputsContainer}>
          <div className="d-flex justify-content-center">
            <label htmlFor="registerPassword">Enter new password:&nbsp;</label>
            <input type="password" name="password" id="registerPassword" onChange={getPassword} required />
          </div>
          <div className="d-flex justify-content-center">
            <label htmlFor="registerRepass">Repeat new password:&nbsp;</label>
            <input type="password" name="confirmPassword" id="registerRepass" onChange={getRepass} required />
          </div>
          <div className="d-flex justify-content-center">
            <Button className={classes.btn} color="success" type="submit">
              Save New Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SaveNewPassword;
