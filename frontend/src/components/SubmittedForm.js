import classes from "./SubmittedForm.module.css";

const SubmittedForm = props => {
    return (
        <div className={classes.container}>
            <h2>Your poll has been successfully submitted!</h2>
            <p>You can check yours and other polls by clicking on the View Polls button.</p>
            <p>Alternatively, you can create another poll by clicking on Create Poll.</p>
        </div>
    );
};

export default SubmittedForm;