import { useEffect, useState } from "react";
import classes from "./Notification.module.scss";

const Notification = ({ message }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (message) {
            setError(
                <div className={classes.NotificationContainer}>
                    <div className={classes.Notification}>
                        <span>!</span>
                        <p>{message}</p>
                    </div>
                </div>
            );
            setTimeout(() => {
                setError(null);
            }, [3000]);
        }
    }, [message]);

    return error;
};

export default Notification;
