import classes from "./ChangePassword.module.scss";
import Form from "react-bootstrap/Form";
import { validConfirmPassword, validPassword } from "../../../helper/utils";
import Button from "../../../components/UI/button/Button";
import Input from "../../../components/UI/input/Input";
import useInput from "../../../hooks/useInput";
import { useState } from "react";
import ModalCard from "src/components/modal/Modal";
import useRequest from "src/hooks/useRequest";
import { useSelector } from "react-redux";
import Notification from "src/components/notification/Notification";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const { accessToken } = useSelector(state => state.user);

    const {
        hasError: passwordError,
        inputBlurHandler: passwordBlurHandler,
        isValid: passwordIsValid,
        value: password,
        valueChangeHandler: passwordChangeHandler,
    } = useInput(validPassword);
    const {
        hasError: newPasswordError,
        inputBlurHandler: newPasswordBlurHandler,
        isValid: newPasswordIsValid,
        value: newPassword,
        valueChangeHandler: newPasswordChangeHandler,
    } = useInput(validPassword);
    const {
        hasError: confirmPasswordError,
        inputBlurHandler: confirmPasswordBlurHandler,
        isValid: confirmPasswordIsValid,
        value: confirmPassword,
        valueChangeHandler: confirmPasswordChangeHandler,
    } = useInput(validPassword);

    const { sendRequest: sendNewPassword, error: sendNewPasswordError } =
        useRequest();

    const validConfirmPasswordHandler = validConfirmPassword(
        newPassword,
        confirmPassword
    );

    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!passwordIsValid) {
            setShowModal(true);
            setError("لطفا کلمه عبور فعلی را وارد کنید!");
            return;
        } else if (!newPassword || !confirmPassword) {
            setShowModal(true);
            setError("لطفا کلمه عبور جدید را همراه با تکرار آن وارد کنید!");
        } else if (!validConfirmPasswordHandler) {
            setShowModal(true);
            setError("کلمه عبور جدید با تکرار آن برابر نیست!");
        } else {
            sendNewPassword({
                url: `users/update_password/`,
                method: "POST",
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
                data: {
                    password: newPassword,
                    odl_password: password,
                },
            }).then(data => {
                console.log("data", data);
                //handle some action
            });
        }
    };

    return (
        <div className={classes.Container}>
            <ModalCard
                confirmText="تایید"
                confirm={() => setShowModal(false)}
                show={showModal}
                content={error}
                height={100}
                btnWidth={100}
            />
            {sendNewPasswordError && (
                <Notification message={sendNewPasswordError} />
            )}
            <Form onSubmit={e => e.preventDefault()} className={classes.Form}>
                <p className={classes.title}> ویرایش کلمه عبور</p>
                <Form.Label className={classes.label}>
                    جهت ثبت کلمه عبور جدید ابتدا کلمه عبور فعلی را وارد کنید.
                </Form.Label>
                <Input
                    elementType="inputGroup"
                    blurInput={passwordBlurHandler}
                    changeInput={passwordChangeHandler}
                    inputIsValid={passwordIsValid}
                    isTouched={passwordError}
                    inputType={showPassword ? "text" : "password"}
                    placeholder="کلمه عبور "
                    label="کلمه عبور "
                    value={password}
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
                <Input
                    elementType="inputGroup"
                    blurInput={newPasswordBlurHandler}
                    changeInput={newPasswordChangeHandler}
                    inputIsValid={newPasswordIsValid}
                    isTouched={newPasswordError}
                    inputType={showNewPassword ? "text" : "password"}
                    placeholder="کلمه عبور جدید "
                    label="کلمه عبور جدید "
                    value={newPassword}
                >
                    <span
                        className={classes.passwordIcon}
                        onClick={() => {
                            setShowNewPassword(!showNewPassword);
                        }}
                    >
                        {showNewPassword ? (
                            <div className="icon icon-md i-eye" />
                        ) : (
                            <div className="icon icon-md i-eye-hidden" />
                        )}
                    </span>
                </Input>
                <Input
                    elementType="inputGroup"
                    blurInput={confirmPasswordBlurHandler}
                    changeInput={confirmPasswordChangeHandler}
                    inputIsValid={confirmPasswordIsValid}
                    isTouched={confirmPasswordError}
                    inputType={showConfirmPassword ? "text" : "password"}
                    placeholder="تکرار کلمه عبور جدید "
                    label="تکرار کلمه عبور جدید "
                    value={confirmPassword}
                >
                    <span
                        className={classes.passwordIcon}
                        onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                        }}
                    >
                        {showConfirmPassword ? (
                            <div className="icon icon-md i-eye" />
                        ) : (
                            <div className="icon icon-md i-eye-hidden" />
                        )}
                    </span>
                </Input>

                <div className={classes.BottomSection}>
                    <Button
                        disabled={false}
                        clicked={formSubmitionHandler}
                        btnStyle={{
                            padding: "2px 50px",
                            height: "45px",
                            fontWeight: "400",
                            fontSize: "16px",
                        }}
                    >
                        تغییر کلمه عبور
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ChangePassword;
