import classes from "./Input.module.scss";
import classNames from "classnames";
import DatePicker from "react-datepicker";

const Input = ({
    inputIsValid,
    changeInput,
    value,
    blurInput,
    label,
    placeholder,
    inputType,
    staticValue,
    elementType,
    isLogin,
    isTouched,
    children,
    errorMessage,
}) => {
    let inputElement = null;
    const inputClasses = classNames({
        [classes.InputElement]: true,
        [classes.validInput]: (inputIsValid && value?.length > 0) || value,
        [classes.isLogin]: isLogin,
        [classes.InvalidInput]: !inputIsValid && isTouched,
    });
    switch (elementType) {
        case "inputGroup":
            inputElement = (
                <div
                    className={classNames({
                        "input-group": true,
                        [classes.InputGroup]: true,
                    })}
                >
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        aria-label="input"
                        aria-describedby="basic"
                        className={inputClasses}
                        value={value}
                        onChange={changeInput}
                        onClick={changeInput}
                        onBlur={blurInput}
                    />
                    {staticValue && (
                        <div className="input-group-append">
                            <div className={classes.staticValue}>
                                {staticValue}
                            </div>
                            <div className={classes.vector}></div>
                        </div>
                    )}
                </div>
            );
            break;
        case "input":
            inputElement = (
                <input
                    type={inputType}
                    placeholder={placeholder}
                    aria-label="input"
                    aria-describedby="basic"
                    className={inputClasses}
                    value={value}
                    onChange={changeInput}
                    onClick={changeInput}
                    onBlur={blurInput}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    type={inputType}
                    placeholder={placeholder}
                    aria-label="input"
                    aria-describedby="basic"
                    className={inputClasses}
                    value={value}
                    onChange={changeInput}
                    onClick={changeInput}
                    onBlur={blurInput}
                />
            );
            break;
        case "select":
            inputElement = (
                <input
                    type={inputType}
                    readOnly
                    placeholder={placeholder}
                    aria-label="input"
                    aria-describedby="basic"
                    className={inputClasses}
                    value={value}
                />
            );
            break;
        case "datepicker":
            inputElement = (
                <>
                    <DatePicker
                        className={inputClasses}
                        selected={value}
                        onChange={changeInput}
                        placeholderText={placeholder}
                    />
                </>
            );
            break;
        default:
            inputElement = (
                <input
                    type={inputType}
                    placeholder={placeholder}
                    aria-label="input"
                    aria-describedby="basic"
                    className={inputClasses}
                    value={value}
                    onChange={changeInput}
                    onClick={changeInput}
                    onBlur={blurInput}
                />
            );
    }
    return (
        <div className={classes.Input}>
            {value?.length > 0 && (
                <label className={classes.Label}>{label}</label>
            )}
            {inputElement}
            {children}
            {errorMessage && (
                <p className={classes.error}>{isTouched && errorMessage}</p>
            )}
        </div>
    );
};

export default Input;
