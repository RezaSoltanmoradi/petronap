import classNames from "classnames";
import classes from "./Image.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { showUploadModal } from "src/store/uploadFile-slice";
import { imageHandler } from "src/helper/baseUrls";

const Image = () => {
    const dispatch = useDispatch();
    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";

    const imageSubmitHandler = () => {
        dispatch(
            showUploadModal({
                fileName: "profilePictureFile",
                title: "عکس پروفایل",
                view: false,
                acceptType: "image",
                fileType: "document",
            })
        );
    };
    return (
        <div
            className={classNames({
                "icon icon-xxl i-user": true,
                [classes.Image]: true,
            })}
            onClick={imageSubmitHandler}
        >
            {profilePictureFile && (
                <img
                    className={classes.img}
                    alt=""
                    src={imageHandler(profilePictureFile)}
                />
            )}

            <div className={classes.badgeContaner}>
                <div
                    className={classNames({
                        "icon icon-md i-camera": true,
                        [classes.badge]: true,
                    })}
                />
            </div>
        </div>
    );
};

export default Image;
