import classes from "./CreatePoll.module.css";
import useStore from "../store/pollCreationStore";
import useLoginStore from "../store/loginStore";
import Option from "./Option";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const CreatePoll = (props) => {
  const {
    submitFormHandler,
    title,
    options,
    addOptionHandler,
    removeOptionHandler,
    inputChangeHandler,
    imageURL,
    imageUploadOnChange,
    uploadImageHandler
  } = useStore();
  const { loggedUser } = useLoginStore();
  const [imageType, setImageType] = useState("url");

  const addImageToggle = () => {
    imageType === "url" ? setImageType("upload") : setImageType("url");
  };

  return (
    <div>
      <h2 className={classes.h2}>
        <i>CREATE POLL</i>
      </h2>
      {!Object.keys(loggedUser).length > 0 && (
        <div>
          <p>Only logged in users can create polls.</p>
          <span>Don't have an account yet? &nbsp;</span>
          <Link className={classes.link} to="/register">
            <Button color="success">Register</Button>
          </Link>
        </div>
      )}

      <form onSubmit={uploadImageHandler} encType="multipart/form-data">
        <input type="file" name="image" id="imageUpload" onChange={imageUploadOnChange} />
        <Button className={classes.btn} color="success" type="submit">
          CREATE POLL
        </Button>
      </form>

      {Object.keys(loggedUser).length > 0 && (
        <form onSubmit={submitFormHandler} className={classes.formContainer} encType="multipart/form-data">
          <div className={classes.titleContainer}>
            <label className={classes.label} htmlFor="title">
              Poll Title:
            </label>
            <input className={classes.input} ref={title} id="title" name="title" type="text" />
          </div>
          <div className={classes.inputsContainer}>
            <div className={classes.imageContainer}>
              <div>
                <Button className={classes.btn} color="primary" onClick={addImageToggle} disabled={imageType === "url"}>
                  Provide URL
                </Button>
                <Button
                  className={classes.btn}
                  color="primary"
                  onClick={addImageToggle}
                  disabled={imageType === "upload"}
                >
                  Upload File
                </Button>
              </div>
              <div className={classes.imageInput}>
                <label className={classes.label} htmlFor="imageURL">
                  {imageType === "url" ? "Add Image via URL:" : "Upload an Image:"}
                </label>
                {imageType === "url" && (
                  <input type="text" ref={imageURL} name="imageURL" id="imageURL" defaultValue="" />
                )}
                {imageType === "upload" && (
                  <input type="file" name="imageUpload" id="imageUpload" onChange={imageUploadOnChange} />
                )}
              </div>
            </div>
            <div className={classes.buttonsContainer}>
              <div
                title={
                  options[0].options.length <= 2
                    ? "You must have at least 2 options"
                    : "Click to remove the last option"
                }
              >
                <Button
                  className={classes.btn}
                  disabled={options[0].options.length <= 2}
                  color="danger"
                  onClick={removeOptionHandler}
                >
                  REMOVE OPTION
                </Button>
              </div>
              <div title={"Click to add up to 10 options"}>
                <Button
                  className={classes.btn}
                  disabled={options[0].options.length >= 10}
                  color="warning"
                  onClick={addOptionHandler}
                >
                  ADD OPTION
                </Button>
              </div>
            </div>
            {options[0].options.map((option, index) => {
              return <Option inputChangeHandler={inputChangeHandler} key={index} num={index} />;
            })}
            <div>
              <Button className={classes.btn} color="success" type="submit">
                CREATE POLL
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePoll;
