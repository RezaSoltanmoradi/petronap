import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import classes from "./Header.module.scss";
import { logout } from "src/store/user-slice";
import { imageHandler } from "src/helper/baseUrls";
import { resetUploader, showUploadModal } from "src/store/uploadFile-slice";

const Header = () => {
    const { traderId, freightId, producerId, orderId } = useParams();
    const navigate = useNavigate();
    const { oldRole, role } = useSelector(state => state.user);

    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";
    const dispatch = useDispatch();

    let title;
    if (
        traderId === "profile" ||
        freightId === "profile" ||
        producerId === "profile"
    ) {
        title = "پروفایل";
    } else if (
        orderId === "new" &&
        (traderId === "orders" ||
            freightId === "orders" ||
            producerId === "orders")
    ) {
        title = "ثبت سفارش";
    } else if (
        traderId === "orders" ||
        freightId === "orders" ||
        producerId === "orders"
    ) {
        title = "سفارشات";
    }
    const changeRouteHandler = () => {
        // if (oldRole.id === "0") {
        //     navigate(`/${role.name}/profile`);
        // } else {
        //     return;
        // }
        dispatch(logout());
        dispatch(resetUploader());
    };
    const backRouteHandler = () => {
        navigate(-1);
        dispatch(showUploadModal());
    };
    return (
        <header className={classes.Header}>
            {!profilePictureFile ? (
                <span
                    className="icon i-user-circle icon-lg"
                    onClick={changeRouteHandler}
                />
            ) : (
                <img
                    className={classes.Image}
                    alt=""
                    src={imageHandler(profilePictureFile)}
                />
            )}
            <p className={classes.title}>{title}</p>
            <span className="icon i-back icon-md" onClick={backRouteHandler} />
        </header>
    );
};

export default Header;
