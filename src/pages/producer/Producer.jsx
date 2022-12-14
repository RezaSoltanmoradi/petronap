import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../components/UI/button/Button";
import Card from "../../components/UI/cards/icon-card/IconCard";
import Layout from "../../layouts/Layout";
import classes from "./Producer.module.scss";
import { DUMMY_HOME_ICONS } from "src/helper/types";

const Producer = () => {
    const navigate = useNavigate();
    const { role } = useSelector(state => state.user);
    return (
        <Layout isLogin={true}>
            <div className={classes.container}>
                <h5 className={classes.title}>به پترو نپ خوش آمدید</h5>
                <p className={classes.description}>
                    لطفا جهت ثبت سفارش ابتدا اطلاعات کاربری خود را در بخش
                    پروفایل کامل کنید.
                </p>
                <Button
                    btnStyle={{
                        padding: "5px 64px",
                        height: "45px",
                        fontWeight: "400",
                        fontSize: "20px",
                        margin: "2rem auto 1rem",
                    }}
                    clicked={() => navigate({ pathname: `/producer/profile` })}
                    disabled={false}
                >
                    برو به پروفایل
                </Button>
                <div className={classes.card}>
                    {DUMMY_HOME_ICONS.map(item => (
                        <Card
                            icon={item.icon}
                            path={item.path}
                            title={item.title}
                            key={item.id}
                            id={item.id}

                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Producer;
