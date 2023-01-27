import { Progress } from "reactstrap";

const ProgressBar = props => {
    return (
        <div>
            <Progress value={props.value}>{props.children}</Progress>
        </div>
    );
}

export default ProgressBar;