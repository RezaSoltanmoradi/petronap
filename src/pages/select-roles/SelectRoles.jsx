import classNames from "classnames";
import { useEffect, useState } from "react";
import Button from "../../components/UI/button/Button";
import classes from "./SelectRoles.module.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getRole, getType } from "../../store/user-slice";
import Switch from "../../components/switch/Switch";
import { ROLE_CHOICES, TYPE_CHOICES } from "src/helper/types";
import Layout from "src/layouts/Layout";

const SelectRoles = () => {
    const [isComplete, setIsComplete] = useState(false);
    const [isCompleteType, setIsCompleteType] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { type, role } = useSelector(state => state.user);

    const loginSelectClasses = (isActive, isActiveTrans) => {
        const btnClasses = classNames({
            [classes.LoginAs]: true,
            [classes.isActiveTrans]: isActiveTrans && !isActive,
            [classes.isActive]: isActive,
        });
        return btnClasses;
    };
    const disable = !isCompleteType && !isComplete;
    const confirmButtonHandler = () => {
        if (isCompleteType) {
            setIsComplete(true);
        }
        if (isComplete) {
            navigate({ pathname: `/${role.name}` });
        }
    };
    useEffect(() => {
        if (!type.name && !role.name) {
            setIsCompleteType(false);
        } else if (type.name && role.name) {
            setIsCompleteType(true);
        }
    }, [type, role]);

    const onChangeTitleHandler = value => {
        const findType = TYPE_CHOICES.find(t => t.title === value);
        dispatch(
            getType({
                id: findType.id,
                title: findType.title,
                name: findType.name,
            })
        );
    };
    return (
        <Layout>
            <div className={classes.Container}>
                <div className={classes.topSection}>
                    <p className="text-start">ورود به عنوان: </p>
                    <div
                        className={loginSelectClasses(
                            role.name === "producer",
                            false
                        )}
                    >
                        <p
                            className={classes.title}
                            onClick={() => {
                                if (!isComplete) {
                                    dispatch(getRole("3"));
                                    setIsCompleteType(true);
                                    setSelectedId(3);
                                }
                            }}
                        >
                            تولید کننده
                        </p>
                    </div>
                    {ROLE_CHOICES.map(userRole => (
                        <div
                            key={userRole.id}
                            className={loginSelectClasses(
                                role.name === userRole.name && isComplete,
                                role.name === userRole.name
                            )}
                        >
                            <div
                                className={classes.title}
                                onClick={() => {
                                    if (!isComplete) {
                                        dispatch(getRole(userRole.id));
                                        setSelectedId(userRole.id);
                                    }
                                }}
                            >
                                {userRole.title}
                                {type.title &&
                                    selectedId === userRole.id &&
                                    isComplete && (
                                        <p className={classes.selectedTitle}>
                                            {type.title}
                                        </p>
                                    )}
                            </div>

                            {role.title === userRole.title && !isComplete && (
                                <>
                                    <div className={classes.border}></div>
                                    <p className={classes.contentType}>
                                        نوع شرکت
                                    </p>
                                    <Switch
                                        options={TYPE_CHOICES}
                                        option={type.title}
                                        changeTitle={onChangeTitleHandler}
                                        switchStyles={{
                                            top: "65px",
                                            width: " 251.6px",
                                        }}
                                    >
                                        {type.title === "حقیقی" ? (
                                            <span className="icon icon-sm i-normal mx-2" />
                                        ) : (
                                            <span className="icon icon-sm i-normal-active mx-2" />
                                        )}
                                        {type.title === "حقوقی" ? (
                                            <span className="icon icon-sm i-legal mx-2" />
                                        ) : (
                                            <title className="icon icon-sm i-legal-active mx-2" />
                                        )}
                                    </Switch>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className={classes.Button}>
                    <Button
                        disabled={disable}
                        btnStyle={{
                            padding: "2px 50px",
                            height: "45px",
                            fontWeight: "400",
                            fontSize: "16px",
                        }}
                        clicked={confirmButtonHandler}
                    >
                        {!isComplete ? "تایید و ادامه" : "ورود به پترونپ"}
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SelectRoles;
