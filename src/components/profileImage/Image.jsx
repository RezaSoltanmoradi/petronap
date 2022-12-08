import classNames from "classnames";
import classes from "./Image.module.scss";
const Image = () => {
    return (
        <div
            className={classNames({
                "icon icon-xl i-user": true,
                [classes.Image]: true,
            })}
        >
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
