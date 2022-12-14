import { useLocation } from "react-router";
import classes from "./IconCard.module.scss";
import { DUMMY_HOME_ICONS } from "src/helper/types";

const Card = ({ path, icon, title, id }) => {
    const location = useLocation();
    const findIcon = DUMMY_HOME_ICONS.find(item => item.id === id);
    return (
        <section
            className={classes.Card}
            onClick={() => {
                console.log("path", path);
            }}
        >
            <div className={icon}></div>
            <p className={classes.title}>
                {location.pathname === "/freight" && findIcon.id === "i2"
                    ? "مشاهده بارهای موجود"
                    : title}
            </p>
        </section>
    );
};

export default Card;
