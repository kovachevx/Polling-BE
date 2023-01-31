import React, { createContext } from "react";
import { useState, useRef } from "react";
import useLoginStore from "./loginStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppContext = createContext();

const optionsBase = [
  {
    id: Math.random().toString(),
    options: [{ votes: 0 }, { votes: 0 }],
    totalVotes: 0,
    voters: []
  }
];

export function PollCreationStore(props) {
  const title = useRef("");
  const imageURL = useRef("");
  const navigate = useNavigate();
  const { loggedUser, setIsLoading } = useLoginStore();
  const [pollBeingCreated, setPollBeingCreated] = useState(optionsBase);
  const [fetchedPolls, setFetchedPolls] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageType, setImageType] = useState("url");

  const addOptionHandler = (event) => {
    event.preventDefault();
    pollBeingCreated[0].options.push({ votes: 0 });

    setPollBeingCreated((prevState) => {
      return [...prevState];
    });
  };

  const imageUploadOnChange = (event) => {
    return setImageUpload(event.target.files[0]);
  };

  const inputChangeHandler = (event, index) => {
    pollBeingCreated[0].options[index].text = event.target.value;
  };

  const removeOptionHandler = (event) => {
    event.preventDefault();
    if (pollBeingCreated[0].options.length === 2) return;
    pollBeingCreated[0].options.pop();

    setPollBeingCreated((prevState) => {
      return [...prevState];
    });
  };

  const addImageToggle = () => {
    if (imageType === "url") {
      setImageType("upload");
    } else {
      setImageType("url");
      setImageUpload(null);
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    if (imageUpload) {
      formData.append("image", imageUpload, title.current.value);
    }

    formData.append("title", title.current.value);
    formData.append("creatorId", loggedUser.id);
    formData.append("creatorUsername", loggedUser.username);
    formData.append("imageURL", imageURL?.current?.value || "");

    const currentOptions = [];

    for (let option of pollBeingCreated[0].options) {
      console.log(option);
      if (option.text === undefined || option.text === "" || !title || title.current.value === "") {
        return alert("No empty fields are allowed! Either fill in or remove the empty options.");
      }
      if (currentOptions.includes(option.text)) {
        return alert("No matching options are allowed. Either change or remove the option in question.");
      } else {
        currentOptions.push({ text: option.text });
      }
    }

    formData.append("options", JSON.stringify(currentOptions));

    setPollBeingCreated((previousState) => {
      return [...previousState];
    });

    setImageUpload(null);

    await postPoll(formData);
    await getPolls();
    navigate("/submitted", { replace: true });
  };

  const createAnotherPollHandler = () => {
    setPollBeingCreated([...optionsBase]);
    navigate("/create");
  };

  const deletePollHandler = async (event) => {
    const selectedPoll = fetchedPolls.find((poll) => poll._id === event.target.id);
    try {
      await fetch(`http://localhost:5000/polls/${selectedPoll._id}`, {
        method: "DELETE",
        credentials: "include"
      });
      await getPolls();
    } catch (err) {
      alert("There was an error processing your deletion request. Please try again later.");
    }
  };

  async function getPolls() {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/polls", {
        credentials: "include"
      });
      const data = await response.json();
      setFetchedPolls([...data.polls]);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  async function postPoll(newPoll) {
    axios
      .post("http://localhost:5000/polls/create", newPoll, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        alert("There was an error posting your poll. Please retry submitting it.");
      });
  }

  return (
    <AppContext.Provider
      value={{
        title,
        imageURL,
        options: pollBeingCreated,
        fetchedPolls,
        imageType,
        imageUploadOnChange,
        addImageToggle,
        getPolls,
        submitFormHandler,
        addOptionHandler,
        removeOptionHandler,
        inputChangeHandler,
        createAnotherPollHandler,
        deletePollHandler
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default function useStore() {
  return React.useContext(AppContext);
}
