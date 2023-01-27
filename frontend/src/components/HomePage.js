import classes from './HomePage.module.css';
import useLoginStore from '../store/loginStore';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const HomePage = props => {
    const { loggedUser } = useLoginStore();

    return (
        <div>
            <div className={classes.summary}>
                <h2 classes={classes.heading2}>Welcome to Pollsha</h2>
                <p>The easiest way to create polls, vote and figure out how, when, and where to get wasted with your friends.</p>
                <p>Approved by <i>ГЕРБ, ДПС</i> and the rest of the <u>totally-not-corrupted</u> political parties.</p>
            </div>
            {!Object.keys(loggedUser).length > 0 &&
                <div className={classes.registerPrompt}>
                    <span>You'll need to log in so that you can create polls and vote.</span>
                    <div>
                        <span>Don't have an account yet? &nbsp;</span>
                        <Link to="/register"><Button color="success">Register</Button></Link>
                    </div>
                </div>
            }
        </div >
    );
};

export default HomePage;