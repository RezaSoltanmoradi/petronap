import classes from "./Selectbar.module.scss";
import Select, { components } from "react-select";
import { useState } from "react";
import classNames from "classnames";

const Selectbar = ({ items, placeholder, select, error, required }) => {
    const [value, setValue] = useState();
    const options = items?.map(item => ({
        value: item.title,
        label: (
            <div
                className={classes.optionValue}
                onClick={() => select(item.id)}
            >
                <span>{item.title}</span>
            </div>
        ),
    }));

    const { Option } = components;

    const IconOption = props => (
        <Option {...props}>
            {props.data.icon}
            {props.data.label}
        </Option>
    );
    return (
        <>
            <Select
                className={classNames({
                    [classes.Selectbar]: true,
                    [classes.inValidSelect]: error && required,
                    [classes.validSelect]: !error || !required,
                })}
                options={options}
                components={{ Option: IconOption }}
                isSearchable={false}
                onChange={option => setValue(option)}
                // value={value ?? options2[0] }
                placeholder={<div>{placeholder}</div>}
            />
        </>
    );
};

export default Selectbar;
