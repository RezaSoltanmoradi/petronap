import { Modal } from "react-bootstrap";
import Button from "../UI/button/Button";
import classes from "./Modal.module.scss";
const ModalCard = ({
    btnWidth,
    content,
    confirm,
    cancel,
    show,
    confirmText,
    cancelText,
    height,
}) => {
    return (
        <div className={classes.ModalContainer}>
            <Modal
                show={show}
                onHide={cancel}
                backdrop="static"
                keyboard={false}
                centered
                className={classes.Modal}
            >
                <Modal.Body style={{ height }}>{content}</Modal.Body>
                <Modal.Footer>
                    <Button
                        clicked={confirm}
                        btnStyle={{
                            width: btnWidth,
                            height: "40px",
                            fontSize: "16px",
                            padding: "2px 10px ",
                            margin: "0 10px",
                        }}
                    >
                        {confirmText}
                    </Button>
                    <Button
                        clicked={cancel}
                        btnStyle={{
                            width: btnWidth,
                            height: "40px",
                            fontSize: "16px",
                            padding: "2px 10px",
                            margin: "0 10px",
                        }}
                    >
                        {cancelText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalCard;
