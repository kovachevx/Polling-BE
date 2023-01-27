import React, { createContext } from "react";
import { useState } from "react";
import useLoginStore from "./loginStore";
import useStore from "./pollCreationStore";

const AppContext = createContext();

export function VoteStore(props) {
  const { fetchedPolls, getPolls } = useStore();
  const [selectedOption, setSelectedOption] = useState("");
  const [voteModalProps, setVoteModalProps] = useState({ isOpen: false });
  const [resultModalProps, setResultModalProps] = useState({ isOpen: false });

  const { loggedUser } = useLoginStore();
  const toggleVoteModal = () => setVoteModalProps({ ...voteModalProps, isOpen: !voteModalProps.isOpen });
  const toggleResultsModal = () => setResultModalProps({ ...resultModalProps, isOpen: !resultModalProps.isOpen });

  const viewPollHandler = (event) => {
    const clickedPoll = fetchedPolls.find((poll) => poll._id === event.target.id);
    setSelectedOption("");
    setVoteModalProps({ ...clickedPoll, isOpen: true });
  };

  const voteHandler = (event, poll) => {
    if (selectedOption === "") {
      return alert("You have to select an option in order to vote.");
    }

    const chosenOption = poll.options.find((option) => option.text === selectedOption);
    chosenOption.votes++;

    const currentPoll = fetchedPolls.find((p) => p._id === poll._id);

    currentPoll.totalVotes++;

    if (!currentPoll.voters) currentPoll.voters = [];
    currentPoll.voters.push(loggedUser.username);

    updatePoll(currentPoll);
    getPolls();

    toggleVoteModal();
  };

  const viewResultsHandler = (event) => {
    const clickedPoll = fetchedPolls.find((poll) => poll._id === event.target.id);
    setResultModalProps({ ...clickedPoll, isOpen: true });
  };

  async function updatePoll(poll) {
    try {
      await fetch(`http://localhost:5000/polls/${poll._id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(poll)
      });
      await getPolls();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AppContext.Provider
      value={{
        voteModalProps,
        resultModalProps,
        viewPollHandler,
        viewResultsHandler,
        setSelectedOption,
        voteHandler,
        toggleVoteModal,
        toggleResultsModal
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default function useVoteStore() {
  return React.useContext(AppContext);
}
