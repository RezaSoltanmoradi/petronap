import Button from "../../../components/UI/button/Button";
import classes from "./Landing.module.scss";
import logoImage from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layouts/Layout";

const Landing = () => {
    const navigate = useNavigate();
    const userLogin = false;

    const startBtnHandler = () => {
        if (!userLogin) {
            navigate({ pathname: "login" });
        } else {
            navigate({ pathname: "profile" });
        }
    };
    return (
        <Layout>
            <div className={classes.Container}>
                {/* logo */}
                <img className={classes.logo} src={logoImage} alt="logo" />
                {/* content */}
                <h2 className={classes.content}>PETRO-NAPP</h2>
                <h6>کالاهای خود را بی دردسر جابه جا کنید</h6>
                {/* submit button */}
                <Button
                    clicked={startBtnHandler}
                    btnStyle={{
                        padding: "5px 64px",
                        width: " 211px",
                        height: "50px",
                        fontWeight: "700",
                        fontSize: "20px",
                    }}
                >
                    شروع
                </Button>
            </div>
        </Layout>
    );
};

export default Landing;
