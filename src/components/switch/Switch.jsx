import classNames from "classnames";
import { useEffect, useState } from "react";
import classes from "./Switch.module.scss";

const Switch = ({ changeTitle, options, option, top, width, children }) => {
    const titleIsActive = isActive => {
        const btnClasses = classNames({
            [classes.title]: true,
            [classes.isNotActive]: !isActive,
            [classes.isActive]: isActive,
        });
        return btnClasses;
    };
    const [switchToggled, setSwitchToggled] = useState(false);
    const [startFromRight, setStartFromRight] = useState(false);
    const [startFromLeft, setStartFromLeft] = useState(false);

    useEffect(() => {
        if (option === options[0].title) {
            setStartFromRight(true);
        } else if (option === options[1].title) {
            setStartFromLeft(true);
        }
    }, []);

    const onChangeOptionHandler = title => {
        changeTitle(title);
        setSwitchToggled(true);
        if (option === options[0].title) {
            setStartFromLeft(false);
        } else if (option === options[1].title) {
            setStartFromRight(false);
        }
    };
    return (
        <div className={classes.Switch} style={{ top: top, width: width }}>
            <div
                className={classNames({
                    [classes.toggle]: true,
                    [classes.startFromRight]: startFromRight,
                    [classes.startFromLeft]: startFromLeft,
                    [classes.moveRight]:
                        option === options[0].title &&
                        switchToggled &&
                        !startFromRight,
                    [classes.moveLeft]:
                        option === options[1].title &&
                        switchToggled &&
                        !startFromLeft,
                })}
            />
            {options.map((opt, index) => (
                <div
                    key={index}
                    className={titleIsActive(option === opt.title)}
                    onClick={() => onChangeOptionHandler(opt.title)}
                >
                    {opt.title}
                    {children && (
                        <span className={children[index].props.className} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Switch;
