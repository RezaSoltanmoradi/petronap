import Image from "../../../components/profileImage/Image";
import classes from "./Profile.module.scss";
import Form from "react-bootstrap/Form";
import Input from "../../../components/UI/input/Input";
import { useEffect, useState } from "react";
import Switch from "../../../components/switch/Switch";
import Scroller from "../../../components/scroller/Scroller";
import { useSelector } from "react-redux";
import { NATIONALIT_CHOICES } from "src/helper/types";
import useRequest from "src/hooks/useRequest";
import classNames from "classnames";
import Notification from "src/components/notification/Notification";

const ViewProfile = () => {
    const { accessToken } = useSelector(state => state.user);

    const {
        sendRequest: getProfileData,
        error: profileError,
        data: profileData,
    } = useRequest();

    const [formData, setFormData] = useState({
        companyName: "",
        companyPhone: "",
        companyNationalId: "",
        companyId: "",
        companyFax: "",
        Url: "",
        emailAddress: "",
        companyAddress: "",
        ceoName: "",
        agentName: "",
        agentPhone: "",
        agentEmail: "",
        about: "",
        companyDocFile: "",
        licenseFile: "",
        profilePicture: "",
        type: "1",
        mobile: "",

        nationality: {
            name: "internal",
            id: "0",
            title: "داخلی",
        },
    });
    useEffect(() => {
        if (accessToken) {
            getProfileData({
                url: `trader/profile/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (profileData) {
            console.log("profileData", profileData);

            const updatedNationality = NATIONALIT_CHOICES.find(
                n => n.id === profileData.company_origin
            );
            console.log("updatedNationality", updatedNationality);

            setFormData({
                companyName: profileData.company_name,
                companyAddress: profileData.company_address,
                Url: profileData.url,
                about: profileData.about,
                agentEmail: profileData.agent_email,
                agentName: profileData.agent_name,
                agentPhone: profileData.agent_phone,
                ceoName: profileData.ceo_name,
                companyDocFile: profileData.company_doc_file,
                companyFax: profileData.company_fax,
                companyId: profileData.company_id,
                companyNationalId: profileData.company_national_id,
                companyPhone: profileData.company_phone,
                emailAddress: profileData.company_address,
                licenseFile: profileData.license_file,
                profilePicture: profileData.profile_picture_file,
                type: profileData.type,
                nationality: updatedNationality,
                mobile: profileData.mobile,
            });
        }
    }, [profileData]);

    const {
        companyName,
        companyAddress,
        Url,
        about,
        agentEmail,
        agentName,
        agentPhone,
        ceoName,
        companyDocFile,
        companyFax,
        companyId,
        companyNationalId,
        companyPhone,
        emailAddress,
        licenseFile,
        profilePicture,
        nationality,
        type,
        mobile,
    } = formData;

    return (
        <div className={classes.container}>
            {profileError && <Notification message={profileError} />}
            <Scroller>
                <div className={classes.imageContainer}>
                    <Image view={true} image={profilePicture} />
                </div>
                {type === "2" && (
                    <Switch
                        changeTitle={() => {}}
                        option={nationality?.title}
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
                        [classes.FormNatural]: type === "1",
                        [classes.FormLegal]: type === "2",
                    })}
                    onSubmit={e => e.preventDefault()}
                >
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder={
                            type === "1" ? "نام و نام خانوادگی" : "نام شرکت "
                        }
                        value={companyName}
                        label={
                            type === "1" ? "نام و نام خانوادگی" : "نام شرکت "
                        }
                        inputIsValid={companyName}
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder={type === "2" ? "شناسه ملی" : "کد ملی "}
                        value={companyNationalId}
                        inputIsValid={companyNationalId}
                        label={type === "2" ? "شناسه ملی" : "کد ملی "}
                    />
                    {type === "2" && (
                        <Input
                            elementType="select"
                            inputType="number"
                            placeholder="شماره ثبت"
                            value={companyId}
                            inputIsValid={companyId}
                            label="شماره ثبت"
                            isLogin={false}
                        />
                    )}

                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="شماره همراه"
                        value={mobile}
                        inputIsValid={mobile}
                        label="شماره همراه"
                        isLogin={false}
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
                        elementType="select"
                        inputType="number"
                        placeholder="شماره تلفن"
                        value={companyPhone}
                        inputIsValid={companyPhone}
                        label="شماره تلفن"
                        isLogin={false}
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="شماره فکس"
                        value={companyFax}
                        inputIsValid={companyFax}
                        label="شماره فکس"
                        isLogin={false}
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="نشانی اینترنتی"
                        value={Url}
                        inputIsValid={Url}
                        label="نشانی اینترنتی"
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder={type === "1" ? "ایمیل" : "ایمیل شرکت"}
                        value={emailAddress}
                        inputIsValid={emailAddress}
                        label={type === "1" ? "ایمیل" : "ایمیل شرکت"}
                    />
                    <Input
                        elementType="textarea-readonly"
                        inputType="text"
                        placeholder="آدرس"
                        value={companyAddress}
                        inputIsValid={companyAddress}
                        label="آدرس"
                    />
                    {type === "2" && (
                        <Input
                            elementType="select"
                            inputType="text"
                            placeholder="نام و نام خانوادگی مدیر عامل"
                            value={ceoName}
                            inputIsValid={ceoName}
                            label="نام و نام خانوادگی مدیر عامل"
                        />
                    )}
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="نام و نام خانوادگی نماینده "
                        value={agentName}
                        inputIsValid={agentName}
                        label="نام و نام خانوادگی نماینده لجستیک"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="شماره همراه نماینده "
                        value={agentPhone}
                        inputIsValid={agentPhone}
                        label="شماره همراه نماینده"
                        isLogin={false}
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="ایمیل نماینده لجستیک "
                        value={agentEmail}
                        inputIsValid={agentEmail}
                        label=" ایمیل نماینده لجستیک"
                    />
                    {type === "2" && (
                        <Input
                            elementType="select"
                            inputIsValid={licenseFile}
                            inputType="text"
                            fileName="licenseFile"
                            value={
                                licenseFile
                                    ? nationality.id === "1"
                                        ? "فایل لیسانس  شرکت "
                                        : "فایل اساس نامه شرکت "
                                    : ""
                            }
                            placeholder={
                                nationality.id === "1"
                                    ? "فایل لیسانس  شرکت "
                                    : "فایل اساس نامه شرکت "
                            }
                            label={
                                licenseFile
                                    ? ""
                                    : nationality.id === "1"
                                    ? "فایل لیسانس  شرکت "
                                    : "فایل اساس نامه شرکت "
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
                    {type === "2" && (
                        <Input
                            elementType="select"
                            inputIsValid={companyDocFile}
                            inputType="text"
                            placeholder="فایل ثبت شرکت"
                            label={companyDocFile ? "" : "فایل ثبت شرکت"}
                            value={companyDocFile ? "فایل ثبت شرکت" : ""}
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
                        elementType="textarea-readonly"
                        inputType="text"
                        placeholder={type === "1" ? "درباره من" : "درباره شرکت"}
                        value={about}
                        inputIsValid={about}
                        label={type === "1" ? "درباره من" : "درباره شرکت"}
                    />
                </Form>
            </Scroller>
        </div>
    );
};

export default ViewProfile;
