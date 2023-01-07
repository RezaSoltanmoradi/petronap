import classes from "./Input.module.scss";
import classNames from "classnames";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { showUploadModal } from "src/store/uploadFile-slice";
import { useDispatch } from "react-redux";
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
    required,
    width,
    fileName,
    view,
    fileId,
    title,
}) => {
    let inputElement = null;
    const inputClasses = classNames({
        [classes.InputElement]: true,
        [classes.validInput]: (inputIsValid && value?.length > 0) || value,
        [classes.isLogin]: isLogin,
        [classes.InvalidInput]:
            (required && !inputIsValid) || (!inputIsValid && isTouched),
    });
    const dispatch = useDispatch();

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
                    style={width && { width: width }}
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
        case "textarea-readonly":
            inputElement = (
                <textarea
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
                    style={width && { width: width }}
                />
            );
            break;
        case "select-file":
            inputElement = (
                <>
                    {view ? (
                        <input
                            type={inputType}
                            readOnly
                            placeholder={placeholder}
                            aria-label="input"
                            aria-describedby="basic"
                            className={inputClasses}
                            value={value}
                            style={{ width: width, cursor: "pointer" }}
                            onClick={() =>
                                dispatch(
                                    showUploadModal({
                                        title: placeholder,
                                        fileId,
                                        view,
                                        acceptType: "*",
                                        fileType: "document",
                                    })
                                )
                            }
                        />
                    ) : (
                        <input
                            type={inputType}
                            readOnly
                            placeholder={placeholder}
                            aria-label="input"
                            aria-describedby="basic"
                            className={inputClasses}
                            value={value}
                            style={{ width: width, cursor: "pointer" }}
                            onClick={() =>
                                dispatch(
                                    showUploadModal({
                                        fileName,
                                        title: placeholder,
                                        view: false,
                                        acceptType: "*",
                                        fileType: "document",
                                    })
                                )
                            }
                        />
                    )}
                </>
            );
            break;
        case "datepicker":
            inputElement = (
                <div className={inputClasses}>
                    <DatePicker
                        value={value}
                        onChange={changeInput}
                        placeholder={placeholder}
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY-MM-DD"
                        calendarPosition="bottom-right"
                    />
                </div>
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
        <div className={classes.Input} style={width && { width: width }}>
            {((required && !inputIsValid) || (!inputIsValid && isTouched)) && (
                <label className={classes.LabelIsRequired}>
                    {label}
                    <span className={classes.star}>*</span>
                </label>
            )}
            {inputIsValid && value?.length > 0 && (
                <label className={classes.Label}>{label}</label>
            )}
            {inputElement}
            {children}
        </div>
    );
};

export default Input;
