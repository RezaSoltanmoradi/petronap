import classes from "./Scroller.module.scss";
const Scroller = ({ children }) => {
    return <div className={classes.Scroller}>{children}</div>;
};

export default Scroller;
