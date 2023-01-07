import classNames from "classnames";
import classes from "./Image.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { showUploadModal } from "src/store/uploadFile-slice";
import { imageHandler } from "src/helper/baseUrls";

const Image = ({ view, image }) => {
    const dispatch = useDispatch();
    const { uploadFiles } = useSelector(state => state.upload);
    const profilePictureFile = uploadFiles?.profilePictureFile ?? "";
    
    const imageSubmitHandler = () => {
        if (view) return;

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
            {(profilePictureFile || image) && (
                <img
                    className={classes.img}
                    alt=""
                    src={imageHandler(
                        !profilePictureFile ? image : profilePictureFile
                    )}
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
