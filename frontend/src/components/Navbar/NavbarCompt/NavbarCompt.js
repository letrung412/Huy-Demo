import { BrowserRouter as Router } from "react-router-dom";
import clsx from "clsx";
import styles from "../styles/Navbar.module.scss";
import Singup from "../pages/account/singup";
import Routess from "../Route/Routess";
import Cart from "../pages/account/Cart";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import Footer from "../pages/home/Footer";
function NavbarCompt() {
  return (
    <>
      <Router>
        <section className={styles.navbar}>
          <div className={styles.header} style={{ width: "100%" }}>
            <div className={clsx(styles.headerLogSing)}>
              <Singup />
            </div>
            <h2>HÀ TRUNG</h2>
            <Cart />
          </div>
          <div className={clsx(styles.headerNav)}>
            <NavbarMobile />
            <NavbarDesktop />
          </div>
        </section>
        <Routess />
        <div>
        <Footer />
        </div>
      </Router>
    </>
  );
}

export default NavbarCompt;
