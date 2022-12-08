import classes from "./Button.module.scss";
const Button = ({ clicked, children, btnType, disabled, btnStyle }) => {
    return (
        <button
            className={classes.Button}
            type={btnType || "button"}
            onClick={clicked}
            disabled={disabled}
            style={btnStyle}
        >
            {children}
        </button>
    );
};

export default Button;
