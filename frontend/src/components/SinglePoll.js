import { Button } from "reactstrap";
import useLoginStore from "../store/loginStore";
import useStore from "../store/pollCreationStore";
import useVoteStore from "../store/voteStore";
import classes from "./SinglePoll.module.css";

const SinglePollCard = ({ options: poll }) => {
  const { viewPollHandler, viewResultsHandler } = useVoteStore();
  const { loggedUser } = useLoginStore();
  const { deletePollHandler } = useStore();

  return (
    <div className={classes.singlePollContainer} key={poll._id}>
      <div className={classes.title}>
        {poll.title}
        {poll.title.endsWith("?") ? "" : "?"}
        <p className={classes.creator}>
          created by{" "}
          <u>
            <b>
              <i>{poll.creatorUsername}</i>
            </b>
          </u>
        </p>
      </div>
      <div>
        <img
          className={classes.img}
          src={
            poll.imageURL ||
            poll.imagePath ||
            "https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/02/progressbars-fine.png?w=551&ssl=1"
          }
        ></img>
      </div>
      <div>
        {Object.keys(loggedUser).length > 0 && poll.voters?.includes(loggedUser.username) && (
          <p>You've already voted!</p>
        )}
        {Object.keys(loggedUser).length > 0 && !poll.voters?.includes(loggedUser.username) && (
          <Button className={classes.btn} id={poll._id} color="primary" onClick={viewPollHandler}>
            Vote
          </Button>
        )}
        <Button className={classes.btn} id={poll._id} color="success" onClick={viewResultsHandler}>
          Results
        </Button>
        {(loggedUser.id === poll.creatorId || loggedUser.role === "admin") && (
          <Button className={classes.btn} id={poll._id} color="danger" onClick={deletePollHandler}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default SinglePollCard;
