import classes from "./Backdrop.module.scss";

const Backdrop = ({ showModal, closeModal }) => {
    return showModal ? (
        <div className={classes.Backdrop} onClick={closeModal}></div>
    ) : null;
};

export default Backdrop;
