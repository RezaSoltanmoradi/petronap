import classNames from "classnames";
import classes from "./Select.module.scss";

const Select = ({ top, options, setSelected, selected }) => {
    const notAllowdDisabled = (value, disabled) => {
        if (disabled) {
            return;
        } else {
            setSelected(value);
        }
    };
    return (
        <div className="w-100 d-flex justify-content-center">
            <div className={classes.Select} style={{ top: top }}>
                {options.map(opt => (
                    <div
                        value={opt.value}
                        key={opt.id}
                        id={opt.id}
                        onClick={() =>
                            notAllowdDisabled(opt.value, opt.disable)
                        }
                        className={classNames({
                            [classes.option]: true,
                            [classes.active]: !opt.disable,
                            [classes.disable]: opt.disable,
                            [classes.selected]:
                                selected && opt.value === selected,
                        })}
                    >
                        {opt.value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Select;
