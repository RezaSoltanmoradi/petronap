import { useNavigate, useParams } from "react-router";
import classes from "./Header.module.scss";

const Header = () => {
    const { traderId, freightId, producerId } = useParams();
    const navigate = useNavigate();

    let title;
    if (
        traderId === "profile" ||
        freightId === "profile" ||
        producerId === "profile"
    ) {
        title = "پروفایل";
    } else {
        title = "پترونپ";
    }
    return (
        <header className={classes.Header}>
            <span className="icon i-user-circle icon-lg" />
            <p className={classes.title}>{title}</p>
            <span
                className="icon i-back icon-md"
                onClick={() => navigate(-1)}
            />
        </header>
    );
};

export default Header;
