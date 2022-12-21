import { useState } from "react";
import classes from "./LoginWhitPassword.module.scss";
import Form from "react-bootstrap/Form";
import { validUserName, validPassword } from "../../../helper/utils";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import Input from "../../../components/UI/input/Input";
import useInput from "../../../hooks/useInput";

const LoginWithPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        hasError: userNameHasError,
        inputBlurHandler: userNameBlurHandler,
        isValid: userNameIsValid,
        value: userNameValue,
        valueChangeHandler: userNameChangeHandler,
    } = useInput(validUserName);

    const {
        hasError: passwordHasError,
        inputBlurHandler: passwordBlurHandler,
        isValid: passwordIsValid,
        value: passwordValue,
        valueChangeHandler: passwordChangeHandler,
    } = useInput(validPassword);
    let formIsValid = false;
    if (userNameIsValid && passwordIsValid) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        // send request to database
        navigate({ pathname: "/profile" });
    };

    return (
        <div className={classes.Container}>
            <Form className={classes.Form} onSubmit={e => e.preventDefault()}>
                <p className={classes.title}>ورود با کلمه عبور</p>
                <Form.Group
                    className={classes.FormGroup}
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label className={classes.label}>
                        لطفاشماره تلفن همراه یا ایمیل و کلمه عبور خود را وارد
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
                        errorMessage=" شماره همراه یا ایمیل نامعتبر هست"
                    />
                    <Input
                        elementType="inputGroup"
                        blurInput={passwordBlurHandler}
                        changeInput={passwordChangeHandler}
                        inputIsValid={passwordIsValid}
                        isTouched={passwordHasError}
                        inputType={showPassword ? "text" : "password"}
                        placeholder="کلمه عبور "
                        value={passwordValue}
                        isLogin={false}
                        errorMessage=" پسورد نامعتبر هست"
                    >
                        <span
                            className={classes.passwordIcon}
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                        >
                            {showPassword ? (
                                <div className="icon icon-md i-eye" />
                            ) : (
                                <div className="icon icon-md i-eye-hidden" />
                            )}
                        </span>
                    </Input>
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
                        disabled={!formIsValid}
                        clicked={formSubmitionHandler}
                        btnStyle={{
                            padding: "2px 50px",
                            height: "45px",
                            fontWeight: "400",
                            fontSize: "16px",
                        }}
                    >
                        ورود به پترونپ
                    </Button>
                    <div className="d-flex justify-content-center flex-column w-100 align-items-center">
                        <NavLink
                            // replace
                            to="/login/forget-password"
                            className={classes.link}
                        >
                            فراموشی کلمه عبور
                        </NavLink>
                        <NavLink to="/login" className={classes.link}>
                            ورود با رمز یکبار مصرف
                        </NavLink>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default LoginWithPassword;
