import useLoginStore from "../store/loginStore";
import { Button } from "reactstrap";
import classes from "./LoginPage.module.css";
import { useState } from "react";

const ResetPasswordPage = (props) => {
  const { resetPasswordHandler, loggedUser } = useLoginStore();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const getEmail = (event) => {
    setEnteredEmail(event.target.value);
  };

  const submitEmailHandler = (event) => {
    setFormIsSubmitted(true);
    resetPasswordHandler(event, enteredEmail);
  };

  return (
    <div>
      <h2 className={classes.h2}>Password Reset</h2>
      {!Object.keys(loggedUser).length > 0  && !formIsSubmitted && (
        <form className={classes.formContainer} onSubmit={submitEmailHandler}>
          <div className={classes.inputsContainer}>
            <div className="d-flex justify-content-center">
              <label htmlFor="email">Enter your email:&nbsp;</label>
              <input type="email" name="email" id="email" required onChange={getEmail} />
            </div>
            <div className="d-flex justify-content-center">
              <Button className={classes.btn} color="success" type="submit">
                Reset Password
              </Button>
            </div>
          </div>
        </form>
      )}
      {!Object.keys(loggedUser).length > 0  && formIsSubmitted && (
        <div>
          <p>We have sent an email to {enteredEmail}.</p>
          <p>
            Please check your inbox and click on the link within the email to continue with your password reset request.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
