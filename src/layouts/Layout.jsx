import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import classes from "./Layout.module.scss";

const Layout = ({ children, isLogin }) => {
    return (
        <div className={classes.container}>
            {isLogin && <Header />}
            <main>{children}</main>
            {isLogin && <Footer />}
        </div>
    );
};

export default Layout;
