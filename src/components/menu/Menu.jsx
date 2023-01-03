import classes from "./Menu.module.scss";
import Backdrop from "../UI/Backdrop/Backdrop";
import { imageHandler } from "src/helper/baseUrls";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Logout from "../logout/Logout";
import { useSelector } from "react-redux";
const Menu = ({ show, setShow }) => {
    const [animation, setAnimation] = useState(false);
    const { otp, oldRole } = useSelector(state => state.user);
    const { profilePicture, companyName } = otp;

    useEffect(() => {
        if (!show) {
            setTimeout(() => {
                setAnimation(false);
            }, 300);
        } else {
            setAnimation(true);
        }
    }, [show]);

    return (
        <>
            {show && (
                <Backdrop closeModal={() => setShow(false)} showModal={show} />
            )}
            {animation && (
                <div className={classes.Menu}>
                    <div
                        className={classNames({
                            [classes.MenuContainer]: true,
                            [classes.openMenu]: show,
                            [classes.closeMenu]: !show,
                        })}
                    >
                        <div className={classes.titleContainer}>
                            {profilePicture ? (
                                <div className={classes.ImageContainer}>
                                    <img
                                        alt=""
                                        src={imageHandler(profilePicture)}
                                    />
                                </div>
                            ) : (
                                <div className="icon icon-lg i-user-circle"></div>
                            )}
                            <h5 className={classes.title}>
                                {!companyName ? "نام شرکت (خالی)" : companyName}
                            </h5>
                        </div>
                        <ul className={classes.MenuItems}>
                            {oldRole.id !== "0" && (
                                <>
                                    <li className={classes.Item}>
                                        اطلاعات کاربری
                                    </li>
                                    <li className={classes.Item}>
                                        ویرایش کلمه عبور
                                    </li>
                                </>
                            )}
                            <li
                                className={classes.Item}
                                onClick={() => Logout()}
                            >
                                خروج
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;
