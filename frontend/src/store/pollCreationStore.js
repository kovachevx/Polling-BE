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
  const [options, setOptions] = useState(optionsBase);
  const [fetchedPolls, setFetchedPolls] = useState([]);
  const [imageUpload, setImageUpload] = useState({});

  const addOptionHandler = (event) => {
    event.preventDefault();
    options[0].options.push({ votes: 0 });

    setOptions((prevState) => {
      return [...prevState];
    });
  };

  const imageUploadOnChange = (event) => {
    return setImageUpload(event.target.files[0]);
  };

  const inputChangeHandler = (event, index) => {
    options[0].options[index].text = event.target.value;
  };

  const removeOptionHandler = (event) => {
    event.preventDefault();
    if (options[0].options.length === 2) return;
    options[0].options.pop();

    setOptions((prevState) => {
      return [...prevState];
    });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    console.log(options[0], "options[0]");
    let formData = new FormData();

    formData.append("image", imageUpload, title.current.value);
    formData.append("creatorId", loggedUser.id);
    formData.append("creatorUsername", loggedUser.username);
    formData.append("imageURL", imageURL?.current?.value || "");

    console.log(imageUpload);

    // options[0].title = title.current.value;
    // options[0].creatorId = loggedUser.id;
    // options[0].creatorUsername = loggedUser.username;
    // options[0].voters = [];
    // options[0].imageURL = imageURL?.current?.value || "";

    const currentOptions = [];

    for (let option of options[0].options) {
      if (option.text === undefined || option.text === "" || !title || title.current.value === "") {
        return alert("No empty fields are allowed! Either fill in or remove the empty options.");
      }
      if (currentOptions.includes(option.text)) {
        return alert("No matching options are allowed. Either change or remove the option in question.");
      } else {
        currentOptions.push(option.text);
      }
    }

    formData.append("options", options[0].options);

    setOptions((previousState) => {
      return [...previousState];
    });

    await postPoll(formData);
    await getPolls();
    navigate("/submitted", { replace: true });
  };

  const createAnotherPollHandler = () => {
    setOptions([...optionsBase]);
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
    console.log(newPoll, "post request");
    try {
      const response = await fetch("http://localhost:5000/polls/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: newPoll
      });
      if (!response.ok) throw new Error();
    } catch (err) {
      alert("There was an error posting your poll. Please retry submitting it.");
    }
  }

  async function uploadImageHandler(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("image", imageUpload, imageUpload.name);

    axios
      .post("http://localhost:5000/polls/upload", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // try {
    //   await fetch("http://localhost:5000/polls/upload", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringfy(formData)
    //   });
    // } catch (err) {
    //   alert("There was an error uploading your image.");
    // }
  }

  return (
    <AppContext.Provider
      value={{
        title,
        imageURL,
        imageUploadOnChange,
        options,
        fetchedPolls,
        uploadImageHandler,
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
