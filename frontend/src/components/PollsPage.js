import classes from "./PollsPage.module.css";
import useStore from "../store/pollCreationStore";
import SinglePollCard from "./SinglePoll";
import useLoginStore from "../store/loginStore";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LoadingSpinner from "./UI/LoadingSpinner";

const PollsPage = (props) => {
  const { fetchedPolls } = useStore();
  const { loggedUser, isLoading } = useLoginStore();
  const [soughtPhrase, setSoughtPhrase] = useState("");
  const [filteredPolls, setFilteredPolls] = useState([]);

  const searchHandler = (event) => {
    setSoughtPhrase(event.target.value);
  };

  useEffect(() => {
    if (soughtPhrase.trim() === "") {
      setFilteredPolls(fetchedPolls);
    } else {
      const filteredArray = [];
      for (let poll of fetchedPolls) {
        if (poll.title.toLowerCase().includes(soughtPhrase.trim().toLowerCase())) {
          filteredArray.push(poll);
        } else if (poll.creatorUsername.toLowerCase().includes(soughtPhrase.trim().toLowerCase())) {
          filteredArray.push(poll);
        }
      }
      setFilteredPolls(filteredArray);
    }
  }, [soughtPhrase, fetchedPolls]);

  return (
    <div className={classes.pollsContainer}>
      <h2 className={classes.h2}>
        <i>Les Polls</i>
      </h2>
      <div>
        <input
          className={classes.searchBar}
          placeholder="Find poll by its title or creator..."
          onChange={searchHandler}
        />
        {/* <div className={classes.linksContainer}>
                    <NavLink exact activeClassName={classes.activeNavLink} className={classes.navLink}to='/polls'>All Polls</NavLink>
                    &nbsp;
                    <NavLink activeClassName={classes.activeNavLink} className={classes.navLink} to='/polls/asd'>All Rooms</NavLink>
                </div> */}
      </div>
      {fetchedPolls.length > 0 && !Object.keys(loggedUser).length > 0  && (
        <div className={classes.registerPrompt}>
          <p>Only logged in users can vote!</p>
          <span>Don't have an account yet? &nbsp;</span>
          <Link to="/register">
            <Button color="success">Register</Button>
          </Link>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {filteredPolls.length > 0 &&
        filteredPolls.map((poll) => {
          return <SinglePollCard key={Math.random().toString()} options={poll} />;
        })}
      {!fetchedPolls.length && Object.keys(loggedUser).length > 0  && (
        <p className={classes.p}>
          ...There are no polls yet! Be the first to create one by clicking on the "Create Poll" button.
        </p>
      )}
      {!fetchedPolls.length && !Object.keys(loggedUser).length > 0  && (
        <div className={classes.registerPrompt}>
          <p className={classes.p}>
            ...There are no polls yet! Be the first to create one by logging in and clicking on the "Create Poll"
            button.
          </p>
          <span>Don't have an account yet? &nbsp;</span>
          <Link to="/register">
            <Button color="success">Register</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default PollsPage;
