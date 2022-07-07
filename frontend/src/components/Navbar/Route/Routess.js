import { Switch, Route } from "react-router-dom";
import Contact from "../pages/contact/Contact";
import LayoutGeneral from "../pages/accessory/LayoutGeneral";
import Home from "../pages/home/Home";
import Introduce from "../pages/introduce/Introduce";
import AccountInfor from "../pages/account/AccountInfor";
import DetailOrder from "../pages/account/DetailOrder";
import ViewCart from "../pages/cart/ViewCart";
import Payment from "../pages/cart/Payment";
import AddCart from "../pages/home/Addcart";
import TabOrder from "../pages/account/tabOrder";
function Routess() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/introduce">
          <Introduce />
        </Route>
        <Route path="/children">
          <LayoutGeneral title="TRẺ EM" />
        </Route>
        <Route path="/search">
          <LayoutGeneral title="TÌM KIẾM" />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/account/accountInfor">
          <AccountInfor />
        </Route>
        <Route path="/account/order">
          <TabOrder />
        </Route>
        <Route path="/account/detailOrder">
          <DetailOrder />
        </Route>
        <Route path="/viewcart">
          <ViewCart />
        </Route>
        <Route path="/Cart">
          <AddCart />
        </Route>
        <Route path="/men">
        <LayoutGeneral title="Nam"/>
        </Route>
        <Route path="/women">
        <LayoutGeneral title="Nữ"/>
        </Route>
        <Route path="/store">
        <LayoutGeneral title="Cửa Hàng"/>
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
      </Switch>
    </div>
  );
}

export default Routess;
