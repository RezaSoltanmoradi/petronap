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
import Switch from "../../../components/switch/Switch";
import Scroller from "../../../components/scroller/Scroller";
import { useDispatch, useSelector } from "react-redux";
import { getOldRole, logout } from "src/store/user-slice";
import { NATIONALIT_CHOICES } from "src/helper/types";
import useRequest from "src/hooks/useRequest";
import { resetUploader } from "src/store/uploadFile-slice";
import classNames from "classnames";
import Notification from "src/components/notification/Notification";

const Profile = () => {
    const [required, setRequired] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [nationality, setNationality] = useState(NATIONALIT_CHOICES[0]);
    const [requiredError, setRequiredError] = useState(null);

    const { otp, type, role, accessToken } = useSelector(state => state.user);
    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";
    const companyDocFile = uploadFiles?.companyDocFile ?? "";
    const permisionDocFile = uploadFiles?.permisionDocFile ?? "";
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
        hasError: hasErrorUrl,
        inputBlurHandler: onBlurUrl,
        isValid: validUrl,
        value: Url,
        valueChangeHandler: onChangeUrl,
    } = useInput();
    const {
        inputBlurHandler: onBlurEmailAddress,
        isValid: validEmailAddress,
        value: emailAddress,
        valueChangeHandler: onChangeEmailAddress,
    } = useInput(validEmail);
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
        hasError: hasErrorPassword,
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

    let _validCompanyDocFile, _validCompanyId, _validCeoName, _validLicenseFile;

    if (type.id === "2") {
        _validCompanyDocFile = companyDocFile !== "";
        _validLicenseFile = licenseFile !== "";
        _validCompanyId = validCompanyId;
        _validCeoName = validCeoName;
    } else {
        _validCompanyDocFile = true;
        _validCompanyId = true;
        _validCeoName = true;
        _validLicenseFile = true;
    }
    let formIsValid = false;
    const formValidation =
        mobile &&
        validCompanyName &&
        _validCompanyId &&
        validCompanyNationalId &&
        validCompanyAddress &&
        _validCeoName &&
        validAgentName &&
        validAgentEmail &&
        validAgentPhone &&
        _validLicenseFile &&
        permisionDocFile &&
        validAbout &&
        validConfirmPasswordHandler &&
        _validCompanyDocFile &&
        !validEmailError;

    if (formValidation) {
        formIsValid = true;
    }
    const formSubmitionHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            setRequired(true);
            setRequiredError("???????? ?????????????? ?????????? ???? ???????? ????????");
            return;
        }
        setRequiredError(null);

        sendProfileData({
            url: `freight/profile/`,
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            data: {
                type: type.id,
                company_origin: type.id === "1" ? "0" : nationality.id,
                role: role.id,
                company_name: companyName,
                company_id: type.id === "1" ? "-" : companyId,
                company_national_id: companyNationalId,
                email: emailAddress,
                mobile: mobile,
                company_fax: companyFax,
                url: Url,
                company_address: companyAddress,
                ceo_name: type.id === "1" ? "-" : ceoName,
                agent_name: agentName,
                agent_phone: agentPhone,
                agent_email: agentEmail,
                about: about,
                profile_picture_file: profilePictureFile,
                license_file: type.id === "1" ? "-" : licenseFile,
                company_doc_file: type.id === "1" ? "-" : companyDocFile,
                permission_file: permisionDocFile,
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
                title="??????????!"
                description="?????????????? ???????????? ?????? ???? ???????????? ?????? ??????????. ?????? ?????? ?????????????? ???? 24 ???????? ?????????? ?????????? ?? ?????????? ???? ?????? ???? ???????? ?????????? ?????????? ??????????."
            />
        );
    }
    const onChangeNationality = companyType => {
        const findNationality = NATIONALIT_CHOICES.find(
            n => n.title === companyType
        );
        setNationality(findNationality);
    };

    return (
        <div className={classes.container}>
            {(profileError || requiredError) && (
                <Notification message={profileError || requiredError} />
            )}
            <Scroller>
                <div className={classes.imageContainer}>
                    <Image />
                </div>
                {type.id === "2" && (
                    <Switch
                        changeTitle={onChangeNationality}
                        option={nationality.title}
                        options={NATIONALIT_CHOICES}
                        switchStyles={{
                            top: "110px",
                            width: "280px",
                        }}
                    />
                )}
                <Form
                    className={classNames({
                        [classes.Form]: true,
                        [classes.FormNatural]: type.id === "1",
                        [classes.FormLegal]: type.id === "2",
                    })}
                    onSubmit={e => e.preventDefault()}
                >
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyName}
                        changeInput={onChangeCompanyName}
                        inputIsValid={validCompanyName}
                        isTouched={hasErrorCompanyName}
                        inputType="text"
                        placeholder={
                            type.id === "1" ? "?????? ?? ?????? ????????????????" : "?????? ???????? "
                        }
                        value={companyName}
                        label={
                            type.id === "1" ? "?????? ?? ?????? ????????????????" : "?????? ???????? "
                        }
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyNationalId}
                        changeInput={onChangeCompanyNationalId}
                        inputIsValid={validCompanyNationalId}
                        isTouched={hasErrorCompanyNationalId}
                        inputType="number"
                        placeholder={type.id === "2" ? "?????????? ??????" : "???? ?????? "}
                        value={companyNationalId}
                        label={type.id === "2" ? "?????????? ??????" : "???? ?????? "}
                        required={required}
                    />
                    {type.id === "2" && (
                        <Input
                            elementType="input"
                            blurInput={onBlurCompanyId}
                            changeInput={onChangeCompanyId}
                            inputIsValid={_validCompanyId}
                            isTouched={hasErrorCompanyId}
                            inputType="number"
                            placeholder="?????????? ??????"
                            value={companyId}
                            label="?????????? ??????"
                            required={required}
                        />
                    )}
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="?????????? ??????????"
                        value={mobile}
                        inputIsValid={mobile}
                        label="?????????? ??????????"
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
                        placeholder="?????????? ????????"
                        value={companyPhone}
                        label="?????????? ????????"
                        isLogin={false}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurCompanyFax}
                        changeInput={onChangeCompanyFax}
                        inputIsValid={validCompanyFax}
                        isTouched={hasErrorCompanyFax}
                        inputType="number"
                        placeholder="?????????? ??????"
                        value={companyFax}
                        label="?????????? ??????"
                        isLogin={false}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurUrl}
                        changeInput={onChangeUrl}
                        inputIsValid={validUrl}
                        isTouched={hasErrorUrl}
                        inputType="text"
                        placeholder="?????????? ????????????????"
                        value={Url}
                        label="?????????? ????????????????"
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurEmailAddress}
                        changeInput={onChangeEmailAddress}
                        inputIsValid={validEmailAddress}
                        isTouched={validEmailError}
                        inputType="text"
                        placeholder={type.id === "1" ? "??????????" : "?????????? ????????"}
                        value={emailAddress}
                        label={type.id === "1" ? "??????????" : "?????????? ????????"}
                        required={validEmailError ? required : false}
                    />
                    <Input
                        elementType="textarea"
                        blurInput={onBlurCompanyAddress}
                        changeInput={onChangeCompanyAddress}
                        inputIsValid={validCompanyAddress}
                        isTouched={hasErrorCompanyAddress}
                        inputType="text"
                        placeholder="????????"
                        value={companyAddress}
                        label="????????"
                        required={required}
                    />
                    {type.id === "2" && (
                        <Input
                            elementType="input"
                            blurInput={onBlurCeoName}
                            changeInput={onChangeCeoName}
                            inputIsValid={_validCeoName}
                            isTouched={hasErrorCeoName}
                            inputType="text"
                            placeholder="?????? ?? ?????? ???????????????? ???????? ????????"
                            value={ceoName}
                            label="?????? ?? ?????? ???????????????? ???????? ????????"
                            required={required}
                        />
                    )}
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentName}
                        changeInput={onChangeAgentName}
                        inputIsValid={validAgentName}
                        isTouched={hasErrorAgentName}
                        inputType="text"
                        placeholder="?????? ?? ?????? ???????????????? ?????????????? "
                        value={agentName}
                        label="?????? ?? ?????? ???????????????? ?????????????? ????????????"
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurAgentPhone}
                        changeInput={onChangeAgentPhone}
                        inputIsValid={validAgentPhone}
                        isTouched={hasErrorAgentPhone}
                        inputType="number"
                        placeholder="?????????? ?????????? ?????????????? "
                        value={agentPhone}
                        label="?????????? ?????????? ??????????????"
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
                        placeholder="?????????? ?????????????? ???????????? "
                        value={agentEmail}
                        label=" ?????????? ?????????????? ????????????"
                        required={required}
                    />
                    {type.id === "2" && (
                        <Input
                            elementType="select-file"
                            inputIsValid={_validLicenseFile}
                            inputType="text"
                            fileName="licenseFile"
                            required={required}
                            value={
                                licenseFile
                                    ? nationality.id === "1"
                                        ? "???????? ????????????  ???????? "
                                        : "???????? ???????? ???????? ???????? "
                                    : ""
                            }
                            placeholder={
                                nationality.id === "1"
                                    ? "???????? ????????????  ???????? "
                                    : "???????? ???????? ???????? ???????? "
                            }
                            label={
                                licenseFile
                                    ? ""
                                    : nationality.id === "1"
                                    ? "???????? ????????????  ???????? "
                                    : "???????? ???????? ???????? ???????? "
                            }
                        >
                            <span className={classes.innerIcon}>
                                {licenseFile ? (
                                    <div className="icon icon-md i-completed" />
                                ) : (
                                    <div className="icon icon-md i-plus" />
                                )}
                            </span>
                        </Input>
                    )}
                    {type.id === "2" && (
                        <Input
                            elementType="select-file"
                            inputIsValid={_validCompanyDocFile}
                            inputType="text"
                            placeholder="???????? ?????? ????????"
                            label={companyDocFile ? "" : "???????? ?????? ????????"}
                            value={companyDocFile ? "???????? ?????? ????????" : ""}
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
                    )}
                    <Input
                        elementType="select-file"
                        inputIsValid={permisionDocFile}
                        inputType="text"
                        placeholder={
                            type.id === "2"
                                ? "???????? ?????? ?? ?????? ???????? "
                                : "???????? ?????? ????????"
                        }
                        label={
                            permisionDocFile
                                ? ""
                                : type.id === "2"
                                ? "???????? ?????? ?? ?????? ???????? "
                                : "???????? ?????? ????????"
                        }
                        value={
                            permisionDocFile
                                ? type.id === "2"
                                    ? "???????? ?????? ?? ?????? ???????? "
                                    : "???????? ?????? ????????"
                                : ""
                        }
                        required={required}
                        fileName="permisionDocFile"
                    >
                        <span className={classes.innerIcon}>
                            {permisionDocFile ? (
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
                        placeholder={
                            type.id === "1" ? "???????????? ????" : "???????????? ????????"
                        }
                        value={about}
                        label={type.id === "1" ? "???????????? ????" : "???????????? ????????"}
                        required={required}
                    />
                    <Input
                        elementType="input"
                        blurInput={onBlurPassword}
                        changeInput={onChangePassword}
                        inputIsValid={passwordIsValid}
                        isTouched={validPasswordError}
                        inputType={showPassword ? "text" : "password"}
                        placeholder="???????? ???????? "
                        value={password}
                        label="???????? ????????"
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
                        placeholder=" ?????????? ???????? ???????? "
                        value={confirmPassword}
                        label="?????????? ???????? ????????"
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
                            ??????????
                        </Button>
                    </div>
                </Form>
            </Scroller>
        </div>
    );
};

export default Profile;
