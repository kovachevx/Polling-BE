import classes from './Option.module.css';

const Option = ({ num, inputChangeHandler }) => {
    return (
        <div className={classes.optionContainer}>
            <label className={classes.label} htmlFor={'option' + (num + 1)}>Option {num + 1}: </label>
            <input
                className={classes.input}
                id={'option' + (num + 1)}
                type='text'
                onChange={(event) => inputChangeHandler(event, num)}
            />
        </div>
    );
}

export default Option; 