import Image from "../../../components/profileImage/Image";
import classes from "./Profile.module.scss";

import Form from "react-bootstrap/Form";
import Input from "../../../components/UI/input/Input";
import { useEffect, useState } from "react";
import Scroller from "../../../components/scroller/Scroller";
import { useSelector } from "react-redux";
import useRequest from "src/hooks/useRequest";
import Notification from "src/components/notification/Notification";

const ViewProfile = () => {
    const { otp, accessToken, userId } = useSelector(state => state.user);
    const { receiver: mobile } = otp;

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
    });
    useEffect(() => {
        if (userId) {
            console.log("userId", userId);
            getProfileData({
                url: `producer/profile/${userId}/`,
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (profileData) {
            console.log("profileData", profileData);
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
    } = formData;
    return (
        <div className={classes.container}>
            {profileError && <Notification message={profileError} />}
            <Scroller>
                <div className={classes.imageContainer}>
                    <Image view={true} image={profilePicture} />
                </div>
                <Form
                    className={classes.Form}
                    onSubmit={e => e.preventDefault()}
                >
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="نام شرکت"
                        value={companyName}
                        inputIsValid={companyName}
                        label="نام شرکت"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="شناسه ملی"
                        value={companyNationalId}
                        inputIsValid={companyNationalId}
                        label="شناسه ملی"
                    />
                    <Input
                        elementType="select"
                        inputType="number"
                        placeholder="شماره ثبت"
                        value={companyId}
                        inputIsValid={companyId}
                        label="شماره ثبت"
                    />
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
                        placeholder="ایمیل شرکت"
                        value={emailAddress}
                        inputIsValid={emailAddress}
                        label="ایمیل شرکت"
                    />
                    <Input
                        elementType="textarea-readonly"
                        inputType="text"
                        placeholder="آدرس"
                        value={companyAddress}
                        inputIsValid={companyAddress}
                        label="آدرس"
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="نام و نام خانوادگی مدیر عامل"
                        value={ceoName}
                        inputIsValid={ceoName}
                        label="نام و نام خانوادگی مدیر عامل"
                    />
                    <Input
                        elementType="select"
                        inputType="text"
                        placeholder="نام و نام خانوادگی نماینده لجستیک"
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
                    <Input
                        elementType="select"
                        inputIsValid={licenseFile}
                        inputType="text"
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
                        elementType="select"
                        inputIsValid={companyDocFile}
                        inputType="text"
                        placeholder="فایل ثبت شرکت"
                        label={companyDocFile ? "" : "فایل ثبت شرکت"}
                        value={companyDocFile ? "فایل ثبت شرکت" : ""}
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
                        elementType="textarea-readonly"
                        inputType="text"
                        placeholder="درباره شرکت "
                        value={about}
                        inputIsValid={about}
                        label="درباره شرکت"
                    />
                </Form>
            </Scroller>
        </div>
    );
};

export default ViewProfile;
