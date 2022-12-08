import classes from "./ForgetPassword.module.scss";
import Form from "react-bootstrap/Form";
import { validUserName } from "../../../helper/utils";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import Input from "../../../components/UI/input/Input";
import useInput from "../../../hooks/useInput";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const {
        hasError: userNameHasError,
        inputBlurHandler: userNameBlurHandler,
        isValid: userNameIsValid,
        value: userNameValue,
        valueChangeHandler: userNameChangeHandler,
    } = useInput(validUserName);

    let formIsValid = false;
    if (userNameIsValid) {
        formIsValid = true;
    }

    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        // send request to database
        navigate({ pathname: "/login/otp" });
    };

    return (
        <div className={classes.Container}>
            <Form onSubmit={formSubmitionHandler} className={classes.Form}>
                <p className={classes.title}> فراموشی کلمه عبور</p>
                <Form.Group
                    className={classes.FormGroup}
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label className={classes.label}>
                        برای بازیابی کلمه ی عبورشماره همراه یا ایمیل خود را وارد
                        کنید
                    </Form.Label>
                    <Input
                        elementType="input"
                        blurInput={userNameBlurHandler}
                        changeInput={userNameChangeHandler}
                        inputIsValid={userNameIsValid}
                        isTouched={userNameHasError}
                        inputType="text"
                        placeholder="شماره همراه یا ایمیل"
                        value={userNameValue}
                        isLogin={false}
                        errorMessage="شماره همراه یا ایمیل نامعتبر هست"
                    />
                </Form.Group>
                <div className={classes.BottomSection}>
                    <Form.Label className={classes.rule}>
                        <p className={classes.content}>
                            <span className="icon icon-sm i-info mx-1" />
                            استفاده از پترونپ به معنی
                            <span className={classes.boldContent}>
                                {" "}
                                پذیرش قوانین و مقررات{" "}
                            </span>
                            آن است.
                        </p>
                    </Form.Label>

                    <Button
                        disabled={formIsValid ? false : true}
                        clicked={formSubmitionHandler}
                        btnStyle={{
                            padding: "2px 50px",
                            height: "45px",
                            fontWeight: "400",
                            fontSize: "16px",
                        }}
                    >
                        بازیابی کلمه عبور
                    </Button>
                    <div className="d-flex justify-content-center flex-column w-100 align-items-center">
                        <NavLink to="/login" className={classes.link}>
                            ورود با رمز یکبار مصرف
                        </NavLink>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ForgetPassword;
