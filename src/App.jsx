import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Trader from "./pages/trader/Trader";
import Freight from "./pages/freight/Freight";
import { useSelector } from "react-redux";
import LoginController from "./pages/login/loginController/LoginController";
import Producer from "./pages/producer/Producer";
import Offers from "./pages/trader/orders/offers/Offers";
import NewOrder from "./pages/trader/orders/new-order/NewOrder";
import Detail from "./pages/trader/orders/offers/detail/Detail";

function App() {
    const { isLogin } = useSelector(state => state.user);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="*"
                element={
                    !isLogin ? (
                        <Navigate replace to="/login" />
                    ) : (
                        <Navigate replace to={`/`} />
                    )
                }
            />
            {!isLogin && (
                <Route path="login">
                    <Route index element={<Login />} />
                    <Route path=":loginId" element={<LoginController />} />
                </Route>
            )}
            {/* {userType === "trader" && isLogin && (
                    )} */}
            <Route path="trader">
                <Route path=":traderId">
                    <Route index element={<Trader />} />
                    <Route path=":orderId">
                        <Route index element={<NewOrder />} />
                        <Route path="offers">
                            <Route index element={<Offers />} />
                            <Route path=":offerId" element={<Detail />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
            {/* {userType === "freight" && isLogin && (
                    )} */}
            <Route path="freight">
                <Route path=":freightId" element={<Freight />} />
            </Route>
            {/* {userType === "producer" && isLogin && (
                    )} */}
            <Route path="producer">
                <Route path=":producerId" element={<Producer />} />
            </Route>
        </Routes>
    );
}

export default App;
