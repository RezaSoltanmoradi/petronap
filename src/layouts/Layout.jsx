import FileUpload from "src/components/file-upload/FileUpload";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import classes from "./Layout.module.scss";
import { memo } from "react";

const Layout = ({ children, isLogin }) => {
    return (
        <div className={classes.container}>
            {isLogin && <Header />}
            <main>
                {children}
                <FileUpload />
            </main>

            {isLogin && <Footer />}
        </div>
    );
};

export default memo(Layout);
