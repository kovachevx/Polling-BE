import classes from "./Navigation.module.css";
import useStore from "../store/pollCreationStore";
import { Button } from "reactstrap";
import useLoginStore from "../store/loginStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = (props) => {
  const { createAnotherPollHandler } = useStore();
  const { loggedUser, logoutHandler } = useLoginStore();

  const navigate = useNavigate();

  return (
    <div>
      <div classes={classes.heading1}>
        <h1>
          <Link className={classes.link} to="/">
            <i>POLLsha</i>
          </Link>
        </h1>
        <div className={classes.username}>{Object.keys(loggedUser).length > 0 && <div>{loggedUser.username}</div>}</div>
      </div>
      <div className={classes.headingButtonContainer}>
        <Button className={classes.btn} onClick={() => navigate("/polls")} color="success">
          View Polls
        </Button>
        <Button className={classes.btn} onClick={createAnotherPollHandler} color="primary">
          Create Poll
        </Button>
        <div>
          <Button
            className={classes.btn}
            color={!Object.keys(loggedUser).length > 0 ? "warning" : "danger"}
            onClick={Object.keys(loggedUser).length > 0 ? logoutHandler : () => navigate("/login")}
          >
            {Object.keys(loggedUser).length > 0 ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
