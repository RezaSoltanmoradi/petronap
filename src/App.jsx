import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/login/Login";
import Freight from "./pages/freight/Freight";
import Producer from "./pages/producer/Producer";
import Trader from "./pages/trader/Trader";
import TraderNewOrder from "./pages/trader/orders/new-order/NewOrder";
import ProducerNewOrder from "./pages/producer/orders/new-order/NewOrder";
import TraderOffers from "./pages/trader/orders/offers/Offers";
import ProducerOffers from "./pages/producer/orders/offers/Offers"; // this is extra
import FreightOffers from "./pages/freight/orders/offers/Offers"; // this is extra
import TraderDetail from "./pages/trader/orders/offers/detail/Detail";
import ProducerDetail from "./pages/producer/orders/offers/detail/Detail"; // this is extra
import FreightDetail from "./pages/freight/orders/offers/detail/Detail"; // this is extra
import TraderController from "./pages/trader/TraderController";
import FreightController from "./pages/freight/FreightController";
import ProducerController from "./pages/producer/ProducerController";
import LoginController from "./pages/login/loginController/LoginController";
import Landing from "./pages/landing/Landing";
import { useSelector } from "react-redux";
import SelectRoles from "./pages/select-roles/SelectRoles";

function App() {
    const { isLogin, role } = useSelector(state => state.user);

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route
                path="*"
                element={!isLogin && <Navigate replace to={`/`} />}
            />
            <Route path="login">
                <Route index element={<Login />} />
                <Route path=":loginId" element={<LoginController />} />
            </Route>

            {isLogin && (
                <Route path="roles">
                    <Route index element={<SelectRoles />} />
                </Route>
            )}
            {role.name === "trader" && isLogin && (
                <Route path="trader">
                    <Route index element={<Trader />} />
                    <Route path=":traderId">
                        <Route index element={<TraderController />} />
                        <Route path=":orderId">
                            <Route index element={<TraderNewOrder />} />
                            <Route path="offers">
                                <Route index element={<TraderOffers />} />
                                <Route
                                    path=":offerId"
                                    element={<TraderDetail />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            )}
            {role.name === "producer" && isLogin && (
                <Route path="producer">
                    <Route index element={<Producer />} />
                    <Route path=":producerId">
                        <Route index element={<ProducerController />} />
                        <Route path=":orderId">
                            <Route index element={<ProducerNewOrder />} />
                            <Route path="offers">
                                <Route index element={<ProducerOffers />} />
                                <Route
                                    path=":offerId"
                                    element={<ProducerDetail />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            )}
            {role.name === "freight" && isLogin && (
                <Route path="freight">
                    <Route index element={<Freight />} />
                    <Route path=":freightId">
                        <Route index element={<FreightController />} />
                        <Route path=":orderId">
                            <Route path="offers">
                                <Route index element={<FreightOffers />} />
                                <Route
                                    path=":offerId"
                                    element={<FreightDetail />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            )}
        </Routes>
    );
}

export default App;
