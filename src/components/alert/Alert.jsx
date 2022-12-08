import classes from "./Alert.module.scss";
import Button from "../UI/button/Button";

const Alert = ({ title, description, width, height, confirmed }) => {
    const alertStyles = {
        width: width,
        height: height,
    };
    return (
        <div className={classes.Alert} style={alertStyles}>
            {title && <h3 className={classes.title}>{title}</h3>}
            <p className={classes.description}>{description}</p>
            <Button
                clicked={confirmed}
                btnStyle={{
                    padding: "2px 50px ",
                    width: "170px",
                    height: "40px",
                    fontSize: "16px",
                }}
            >
                تایید
            </Button>
        </div>
    );
};

export default Alert;
