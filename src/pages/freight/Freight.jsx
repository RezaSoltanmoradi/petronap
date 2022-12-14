import { useNavigate } from "react-router";
import Layout from "./../../layouts/Layout";
import { DUMMY_HOME_ICONS } from "src/helper/types";
import Button from "src/components/UI/button/Button";
import classes from "./Freight.module.scss";
import Card from "src/components/UI/cards/icon-card/IconCard";
const Freight = () => {
    const navigate = useNavigate();
    return (
        <Layout isLogin={true}>
            <div className={classes.container}>
                <h5 className={classes.title}>به پترو نپ خوش آمدید</h5>
                <p className={classes.description}>
                    لطفا جهت دسترسی به بخش بارهای موجود ابتدا اطلاعات خود را در
                    بخش پروفایل کامل کنید.
                </p>
                <Button
                    btnStyle={{
                        padding: "5px 64px",
                        height: "45px",
                        fontWeight: "400",
                        fontSize: "20px",
                        margin: "2rem auto 1rem",
                    }}
                    clicked={() => navigate({ pathname: `/freight/profile` })}
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

export default Freight;
