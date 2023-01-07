import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import classes from "./Header.module.scss";

import { imageHandler } from "src/helper/baseUrls";
import { showUploadModal } from "src/store/uploadFile-slice";
import Menu from "../menu/Menu";
import { useState } from "react";

const Header = () => {
    const { traderId, freightId, producerId, orderId, offerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";
    const { profilePicture } = useSelector(state => state.user.otp);

    const allRoles = [traderId, freightId, producerId];
    const createOrdersRoles = [producerId, traderId];

    const validOrdersPath = !!createOrdersRoles.find(p => p === "orders");
    const validOffersPath = !!createOrdersRoles.find(p => p === "offers");
    const validOrders = validOrdersPath && !validOffersPath && !orderId;

    const validProfile =
        !!allRoles.find(p => p === "profile") && !validOffersPath;
    const validProfileView = !!allRoles.find(p => p === "view-profile");
    const validPassword = !!allRoles.find(p => p === "change-password");

    const titleHandler = () => {
        return {
            [validProfile]: "پروفایل",
            [orderId === "new" && validOrdersPath]: "ثبت سفارش",
            [validOrders || (freightId === "offers" && !orderId)]:
                "فعالیت های اخیر",
            [freightId === "orders" && !orderId]: "بارهای موجود",
            [(freightId === "offers" || freightId === "orders") && !!orderId]:
                "جزئیات بار",
            [!traderId && !producerId && !freightId]: "پترونپ",
            [validOrdersPath && !!orderId && orderId !== "new"]: "پیشنهادات",
            [typeof offerId !== "undefined"]: "جزئیات پیشنهاد",
            [validProfileView]: " اطلاعات کاربری",
            [validPassword]: "ویرایش کلمه عبور",
        };
    };

    const backRouteHandler = () => {
        navigate(-1);
        dispatch(showUploadModal());
    };

    return (
        <>
            <header className={classes.Header}>
                {!profilePictureFile && !profilePicture ? (
                    <span
                        className="icon i-user-circle icon-lg"
                        onClick={() => {
                            setShowMenu(true);
                        }}
                    />
                ) : (
                    <img
                        onClick={() => {
                            setShowMenu(true);
                        }}
                        className={classes.Image}
                        alt=""
                        src={imageHandler(
                            !profilePictureFile
                                ? profilePicture
                                : profilePictureFile
                        )}
                    />
                )}
                <p className={classes.title}>{titleHandler().true}</p>
                <span
                    className="icon i-back icon-md"
                    onClick={backRouteHandler}
                />
            </header>
            <Menu show={showMenu} setShow={setShowMenu} />
        </>
    );
};

export default Header;
