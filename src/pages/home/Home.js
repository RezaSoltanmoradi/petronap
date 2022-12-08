import { useSelector } from "react-redux";
import Layout from "../../layouts/Layout";
import Landing from "./landing/Landing";
import Profile from "./profile/Profile";

const Home = () => {
    const { isLogin } = useSelector(state => state.user);
    let home;
    if (isLogin) {
        home = <Profile />;
    } else {
        home = <Landing />;
    }
    return <Layout>{home}</Layout>;
};

export default Home;
