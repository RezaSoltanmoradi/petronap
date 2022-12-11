import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../../components/UI/button/Button";
import Card from "../../../components/UI/cards/icon-card/IconCard";
import Layout from "../../../layouts/Layout";
import classes from "./Profile.module.scss";

const categories = [
    { icon: "icon2", path: "order", title: "ثبت سفارش انلاین", id: "i2" },
    { icon: "icon1", path: "info", title: "دسته بندی اطلاعات", id: "i1" },
    {
        icon: "icon4",
        path: "online",
        title: "برگزاری انلاین مناقصه",
        id: "i4",
    },
    {
        icon: "icon3",
        path: "different",
        title: "تنوع در انتخاب",
        id: "i3",
    },
    {
        icon: "icon6",
        path: "submit-info",
        title: "ثبت انلاین اطلاعات ",
        id: "i6",
    },
    {
        icon: "icon5",
        path: "Checkout",
        title: "تسویه حساب انلاین",
        id: "i5",
    },
];
const Profile = () => {
    const navigate = useNavigate();
    const { role } = useSelector(state => state.user);
    return (
        <Layout isLogin={true}>
            <div className={classes.container}>
                <h5 className={classes.title}>به پترو نپ خوش آمدید</h5>
                <p className={classes.description}>
                    لطفا جهت ثبت سفارش ابتدا اطللاعات کاربری خود را در بخش
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
                    clicked={() =>
                        navigate({ pathname: `${role.name}/profile` })
                    }
                    disabled={false}
                >
                    برو به پروفایل
                </Button>
                <div className={classes.card}>
                    {categories.map(category => (
                        <Card
                            icon={category.icon}
                            path={category.path}
                            title={category.title}
                            key={category.id}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
