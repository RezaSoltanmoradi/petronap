import Image from "../../../components/profileImage/Image";
import classes from "./Profile.module.scss";
import {
    validTextInput,
    validEmail,
    validConfirmPassword,
    validPhone,
    validPassword,
} from "../../../helper/utils";
import useInput from "../../../hooks/useInput";
import Form from "react-bootstrap/Form";
import Input from "../../../components/UI/input/Input";
import Button from "../../../components/UI/button/Button";
import { useState } from "react";
import Alert from "../../../components/alert/Alert";
import Scroller from "../../../components/scroller/Scroller";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "src/hooks/useRequest";
import { getOldRole, logout } from "src/store/user-slice";
import { resetUploader } from "src/store/uploadFile-slice";
import Notification from "src/components/notification/Notification";

const Profile = () => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [required, setRequired] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [requiredError, setRequiredError] = useState(null);

    const { otp, role, accessToken } = useSelector(state => state.user);
    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";
    const companyDocFile = uploadFiles?.companyDocFile ?? "";
    const licenseFile = uploadFiles?.licenseFile ?? "";
    const dispatch = useDispatch();

    const { receiver: mobile } = otp;
    const { sendRequest: sendProfileData, error: profileError } = useRequest();

    const {
        hasError: hasErrorCompanyName,
        inputBlurHandler: onBlurCompanyName,
        isValid: validCompanyName,
        value: companyName,
        valueChangeHandler: onChangeCompanyName,
    } = useInput(validTextInput, 50);
    const {
        hasError: hasErrorCompanyPhone,
        inputBlurHandler: onBlurCompanyPhone,
        isValid: validCompanyPhone,
        value: companyPhone,
        valueChangeHandler: onChangeCompanyPhone,
    } = useInput("", 12);
    const {
        hasError: hasErrorCompanyNationalId,
        inputBlurHandler: onBlurCompanyNationalId,
        isValid: validCompanyNationalId,
        value: companyNationalId,
        valueChangeHandler: onChangeCompanyNationalId,
    } = useInput(validTextInput, 10);
    const {
        hasError: hasErrorCompanyId,
        inputBlurHandler: onBlurCompanyId,
        isValid: validCompanyId,
        value: companyId,
        valueChangeHandler: onChangeCompanyId,
    } = useInput(validTextInput, 10);
    const {
        hasError: hasErrorCompanyFax,
        inputBlurHandler: onBlurCompanyFax,
        isValid: validCompanyFax,
        value: companyFax,
        valueChangeHandler: onChangeCompanyFax,
    } = useInput("", 11);
    const {
        inputBlurHandler: onBlurEmailAddress,
        isValid: validEmailAddress,
        value: emailAddress,
        valueChangeHandler: onChangeEmailAddress,
    } = useInput(validEmail);
    const {
        hasError: hasErrorUrl,
        inputBlurHandler: onBlurUrl,
        isValid: validUrl,
        value: Url,
        valueChangeHandler: onChangeUrl,
    } = useInput();
    const {
        hasError: hasErrorCompanyAddress,
        inputBlurHandler: onBlurCompanyAddress,
        isValid: validCompanyAddress,
        value: companyAddress,
        valueChangeHandler: onChangeCompanyAddress,
    } = useInput(validTextInput);
    const {
        hasError: hasErrorCeoName,
        inputBlurHandler: onBlurCeoName,
        isValid: validCeoName,
        value: ceoName,
        valueChangeHandler: onChangeCeoName,
    } = useInput(validTextInput, 50);
    const {
        hasError: hasErrorAgentName,
        inputBlurHandler: onBlurAgentName,
        isValid: validAgentName,
        value: agentName,
        valueChangeHandler: onChangeAgentName,
    } = useInput(validTextInput, 50);
    const {
        hasError: hasErrorAgentPhone,
        inputBlurHandler: onBlurAgentPhone,
        isValid: validAgentPhone,
        value: agentPhone,
        valueChangeHandler: onChangeAgentPhone,
    } = useInput(validPhone, 12);
    const {
        hasError: hasErrorAgentEmail,
        inputBlurHandler: onBlurAgentEmail,
        isValid: validAgentEmail,
        value: agentEmail,
        valueChangeHandler: onChangeAgentEmail,
    } = useInput(validEmail);
    const {
        hasError: hasErrorAbout,
        inputBlurHandler: onBlurAbout,
        isValid: validAbout,
        value: about,
        valueChangeHandler: onChangeAbout,
    } = useInput(validTextInput);
    const {
        inputBlurHandler: onBlurPassword,
        isValid: passwordIsValid,
        value: password,
        valueChangeHandler: onChangePassword,
    } = useInput(validPassword);
    const {
        inputBlurHandler: onBlurConfirmPassword,
        value: confirmPassword,
        valueChangeHandler: onChangeConfirmPassword,
    } = useInput(validPassword);

    const validConfirmPasswordHandler = validConfirmPassword(
        password,
        confirmPassword
    );
    const validEmailError =
        !validEmailAddress && emailAddress.trim().length > 0;
    const validPasswordError = !passwordIsValid && password.trim().length > 0;

    let formIsValid = false;
    const formValidation =
        mobile &&
        validCompanyName &&
        validCompanyId &&
        validCompanyNationalId &&
        validCeoName &&
        validAgentName &&
        validAgentPhone &&
        validAgentEmail &&
        licenseFile &&
        companyDocFile &&
        validAbout &&
        validCompanyAddress &&
        validConfirmPasswordHandler &&
        !validEmailError;

    if (formValidation) {
        formIsValid = true;
    }

    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            setRequired(true);
            setRequiredError("لطفا فیلدهای ضروری را وارد کنید");

            return;
        }
        setRequiredError(null);

        sendProfileData({
            url: `producer/profile/`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            data: {
                type: "2",
                company_origin: "0",
                role: role.id,
                company_name: companyName,
                company_id: companyId,
                company_national_id: companyNationalId,
                email: emailAddress,
                mobile: mobile,
                company_fax: companyFax,
                url: Url,
                company_address: companyAddress,
                ceo_name: ceoName,
                agent_name: agentName,
                agent_phone: agentPhone,
                agent_email: agentEmail,
                about: about,
                profile_picture_file: profilePictureFile,
                company_doc_file: companyDocFile,
                license_file: licenseFile,
                password: password,
                company_phone: companyPhone,
            },
        }).then(data => {
            if (data?.id) {
                dispatch(getOldRole(role.id));
                setIsCompleted(true);
            }
        });
    };

    if (isCompleted) {
        return (
            <Alert
                confirmed={() => {
                    dispatch(logout());
                    dispatch(resetUploader());
                }}
                height="209px"
                width="270px"
                title="تبریک!"
                description="اطلاعات کاربری شما با موفقیت ثبت گردید. صحت این اطلاعات تا 24 ساعت آینده بررسی و نتیجه به شما از طریق پیامک اعلام میشود."
            />
        );
    }

    return (
        <div className={classes.container}>
            {(profileError || requiredError) && (
                <Notification message={profileError || requiredError} />
            )}
            <Scroller>
                <div className={classes.imageContainer}>
                    <Image />
                </div>
                <Form
                    className={classes.Form}
                    onSubmit={e => e.preventDefault()}
                >
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyName}
                        changeInput={onChangeCompanyName}
                        inputIsValid={validCompanyName}
                        isTouched={hasErrorCompanyName}
                        inputType="text"
                        placeholder="نام شرکت"
                        value={companyName}
                        label="نام شرکت"
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyNationalId}
                        changeInput={onChangeCompanyNationalId}
                        inputIsValid={validCompanyNationalId}
                        isTouched={hasErrorCompanyNationalId}
                        inputType="number"
                        placeholder="شناسه ملی"
                        value={companyNationalId}
                        label="شناسه ملی"
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyId}
                        changeInput={onChangeCompanyId}
                        inputIsValid={validCompanyId}
                        isTouched={hasErrorCompanyId}
                        inputType="number"
                        placeholder="شماره ثبت"
                        value={companyId}
                        label="شماره ثبت"
                        required={required}
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="شماره همراه"
                        value={mobile}
                        inputIsValid={mobile}
                        label="شماره همراه"
                        isLogin={false}
                        required={required}
                    >
                        <span className={classes.innerIcon}>
                            {mobile ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </span>
                    </Input>
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyPhone}
                        changeInput={onChangeCompanyPhone}
                        inputIsValid={validCompanyPhone}
                        isTouched={hasErrorCompanyPhone}
                        inputType="number"
                        placeholder="شماره تلفن"
                        value={companyPhone}
                        label="شماره تلفن"
                        isLogin={false}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyFax}
                        changeInput={onChangeCompanyFax}
                        inputIsValid={validCompanyFax}
                        isTouched={hasErrorCompanyFax}
                        inputType="number"
                        placeholder="شماره فکس"
                        value={companyFax}
                        label="شماره فکس"
                        isLogin={false}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurUrl}
                        changeInput={onChangeUrl}
                        inputIsValid={validUrl}
                        isTouched={hasErrorUrl}
                        inputType="text"
                        placeholder="نشانی اینترنتی"
                        value={Url}
                        label="نشانی اینترنتی"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurEmailAddress}
                        changeInput={onChangeEmailAddress}
                        inputIsValid={validEmailAddress}
                        isTouched={validEmailError}
                        inputType="text"
                        placeholder="ایمیل شرکت"
                        value={emailAddress}
                        label="ایمیل شرکت"
                        required={validEmailError ? required : false}
                    />
                    <Input
                        elementType="textarea"
                        blurInput={onBlurCompanyAddress}
                        changeInput={onChangeCompanyAddress}
                        inputIsValid={validCompanyAddress}
                        isTouched={hasErrorCompanyAddress}
                        inputType="text"
                        placeholder="آدرس"
                        value={companyAddress}
                        label="آدرس"
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCeoName}
                        changeInput={onChangeCeoName}
                        inputIsValid={validCeoName}
                        isTouched={hasErrorCeoName}
                        inputType="text"
                        placeholder="نام و نام خانوادگی مدیر عامل"
                        value={ceoName}
                        label="نام و نام خانوادگی مدیر عامل"
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentName}
                        changeInput={onChangeAgentName}
                        inputIsValid={validAgentName}
                        isTouched={hasErrorAgentName}
                        inputType="text"
                        placeholder="نام و نام خانوادگی نماینده لجستیک"
                        value={agentName}
                        label="نام و نام خانوادگی نماینده لجستیک"
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentPhone}
                        changeInput={onChangeAgentPhone}
                        inputIsValid={validAgentPhone}
                        isTouched={hasErrorAgentPhone}
                        inputType="number"
                        placeholder="شماره همراه نماینده "
                        value={agentPhone}
                        label="شماره همراه نماینده"
                        isLogin={false}
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentEmail}
                        changeInput={onChangeAgentEmail}
                        inputIsValid={validAgentEmail}
                        isTouched={hasErrorAgentEmail}
                        inputType="text"
                        placeholder="ایمیل نماینده لجستیک "
                        value={agentEmail}
                        label=" ایمیل نماینده لجستیک"
                        required={required}
                    />
                    <Input
                        elementType="select-file"
                        inputIsValid={licenseFile}
                        inputType="text"
                        fileName="licenseFile"
                        required={required}
                        value={licenseFile ? "فایل اساس نامه شرکت " : ""}
                        label={licenseFile ? "" : "فایل اساس نامه شرکت "}
                        placeholder="فایل اساس نامه شرکت "
                    >
                        <div className={classes.innerIcon}>
                            {licenseFile ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </div>
                    </Input>
                    <Input
                        elementType="select-file"
                        inputIsValid={companyDocFile}
                        inputType="text"
                        placeholder="فایل ثبت شرکت"
                        label={companyDocFile ? "" : "فایل ثبت شرکت"}
                        value={companyDocFile ? "فایل ثبت شرکت" : ""}
                        required={required}
                        fileName="companyDocFile"
                    >
                        <span className={classes.innerIcon}>
                            {companyDocFile ? (
                                <div className="icon icon-md i-completed" />
                            ) : (
                                <div className="icon icon-md i-plus" />
                            )}
                        </span>
                    </Input>
                    <Input
                        elementType="textarea"
                        blurInput={onBlurAbout}
                        changeInput={onChangeAbout}
                        inputIsValid={validAbout}
                        isTouched={hasErrorAbout}
                        inputType="text"
                        placeholder="درباره شرکت "
                        value={about}
                        label="درباره شرکت"
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurPassword}
                        changeInput={onChangePassword}
                        inputIsValid={passwordIsValid}
                        isTouched={validPasswordError}
                        inputType={showPassword ? "text" : "password"}
                        placeholder="کلمه عبور "
                        value={password}
                        label="کلمه عبور"
                    >
                        <span
                            className={classes.innerIcon}
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
                        elementType="input"
                        blurInput={onBlurConfirmPassword}
                        changeInput={onChangeConfirmPassword}
                        inputIsValid={validConfirmPasswordHandler}
                        isTouched={!validConfirmPasswordHandler}
                        inputType={showConfirmPassword ? "text" : "password"}
                        placeholder=" تکرار کلمه عبور "
                        value={confirmPassword}
                        label="تکرار کلمه عبور"
                    >
                        <span
                            className={classes.innerIcon}
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
                                height: "40px",
                                fontWeight: "400",
                                fontSize: "16px",
                            }}
                        >
                            تایید
                        </Button>
                    </div>
                </Form>
            </Scroller>
        </div>
    );
};

export default Profile;
