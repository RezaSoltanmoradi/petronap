import { useState } from "react";
import classes from "./LoginWhitPassword.module.scss";
import Form from "react-bootstrap/Form";
import { validUserName, validPassword } from "../../../helper/utils";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import Input from "../../../components/UI/input/Input";
import useInput from "../../../hooks/useInput";
import useRequest from "src/hooks/useRequest";
import {
    getLoginStaus,
    getOldRole,
    getOtpData,
    getRole,
} from "src/store/user-slice";
import { ROLES } from "./../../../helper/types";
import { useDispatch } from "react-redux";
import Notification from "src/components/notification/Notification";

const LoginWithPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [requiredError, setRequiredError] = useState(null);

    const dispatch = useDispatch();
    const {
        hasError: userNameHasError,
        inputBlurHandler: userNameBlurHandler,
        isValid: userNameIsValid,
        value: userName,
        valueChangeHandler: userNameChangeHandler,
    } = useInput(validUserName);

    const {
        hasError: passwordHasError,
        inputBlurHandler: passwordBlurHandler,
        isValid: passwordIsValid,
        value: password,
        valueChangeHandler: passwordChangeHandler,
    } = useInput(validPassword);

    const { sendRequest: sendLoginHandler, error: sendLoginError } =
        useRequest();

    let formIsValid = false;
    if (userNameIsValid && passwordIsValid) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }

        sendLoginHandler({
            url: `users/login/`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                username: userName,
                password: password,
            },
        }).then(data => {
            if (data) {
                dispatch(
                    getLoginStaus({
                        accessToken: data.token,
                        refreshToken: data.refresh,
                    })
                );
                dispatch(
                    getOtpData({
                        companyName: data.company_name,
                        profilePicture: data.profile_picture_file,
                    })
                );
                if (data.created || data.user_role === "0") {
                    navigate(`/roles`);
                } else if (!data.created && data.user_role !== "0") {
                    dispatch(getOldRole(data.user_role));
                    dispatch(getRole(data.user_role));

                    const findRole = ROLES.find(
                        role => role.id === data.user_role
                    );

                    if (findRole.name === "freight") {
                        navigate(`/${findRole.name}/orders`);
                    } else {
                        navigate(`/${findRole.name}/orders/new`);
                    }
                }
            } else {
                setRequiredError("???????????? ???? ?????? ?????????????? ???????? ??????");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        });
    };

    return (
        <div className={classes.Container}>
            {requiredError && sendLoginError && (
                <Notification message={requiredError || sendLoginError} />
            )}

            <Form className={classes.Form} onSubmit={e => e.preventDefault()}>
                <p className={classes.title}>???????? ???? ???????? ????????</p>
                <Form.Group
                    className={classes.FormGroup}
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label className={classes.label}>
                        ???????? ?????????? ???????? ?????????? ???? ?????????? ?? ???????? ???????? ?????? ???? ????????
                        ????????
                    </Form.Label>
                    <Input
                        elementType="input"
                        blurInput={userNameBlurHandler}
                        changeInput={userNameChangeHandler}
                        inputIsValid={userNameIsValid}
                        isTouched={userNameHasError}
                        inputType="text"
                        placeholder="?????????? ?????????? ???? ??????????"
                        label="?????????? ?????????? ???? ??????????"
                        value={userName}
                        isLogin={false}
                    />
                    <Input
                        elementType="inputGroup"
                        blurInput={passwordBlurHandler}
                        changeInput={passwordChangeHandler}
                        inputIsValid={passwordIsValid}
                        isTouched={passwordHasError}
                        inputType={showPassword ? "text" : "password"}
                        placeholder="???????? ???????? "
                        label="???????? ???????? "
                        value={password}
                        isLogin={false}
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
                            ?????????????? ???? ???????????? ???? ????????
                            <span className={classes.boldContent}>
                                {" "}
                                ?????????? ???????????? ?? ????????????{" "}
                            </span>
                            ???? ??????.
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
                        ???????? ???? ????????????
                    </Button>
                    <div className="d-flex justify-content-center flex-column w-100 align-items-center">
                        <NavLink
                            to="/login/forget-password"
                            className={classes.link}
                        >
                            ?????????????? ???????? ????????
                        </NavLink>
                        <NavLink to="/login" className={classes.link}>
                            ???????? ???? ?????? ?????????? ????????
                        </NavLink>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default LoginWithPassword;
