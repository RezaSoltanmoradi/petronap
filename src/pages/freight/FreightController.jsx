import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Layout from "src/layouts/Layout";
import Profile from "./profile/Profile";

const FreightController = () => {
    const { freightId } = useParams();
    const navigate = useNavigate();
    const freightIds = ["profile"];

    useEffect(() => {
        const findId = freightIds.indexOf(freightId);
        if (findId < 0) {
            navigate("/freight");
        }
    }, []);

    const freightName = {
        profile: <Profile />,
    };
    return <Layout isLogin={true}>{freightName[freightId]}</Layout>;
};

export default FreightController;
