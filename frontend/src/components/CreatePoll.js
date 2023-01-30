import classes from "./CreatePoll.module.css";
import useStore from "../store/pollCreationStore";
import useLoginStore from "../store/loginStore";
import Option from "./Option";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

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
    addImageToggle,
    imageType
  } = useStore();
  const { loggedUser } = useLoginStore();

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
                <h5>Add an Image (optional)</h5>
                <button
                  className={imageType === "url" ? classes.activeNavLink : classes.navLink}
                  onClick={addImageToggle}
                  disabled={imageType === "url"}
                >
                  Provide URL
                </button>
                <button
                  className={imageType !== "url" ? classes.activeNavLink : classes.navLink}
                  onClick={addImageToggle}
                  disabled={imageType === "upload"}
                >
                  Upload File
                </button>
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
