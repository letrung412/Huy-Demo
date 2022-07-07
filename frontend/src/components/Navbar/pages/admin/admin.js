import React from "react";
import styles from '../../styles/Navbar.module.scss'
import Singup from "../account/singup";
import clsx from 'clsx'
import RoutessAdmin from "../../Route/RoutessAdmin";
import NavbarAdmin from '../../NavbarCompt/NavbarAdmin';
function Admin() {
  return (
   <>
    <div className={styles.navbar}>
      {" "}
      <div className={styles.header} style={{ width: "100%",paddingRight:600 }}>
        <div className={clsx(styles.headerLogSing)}>
          <Singup />
        </div>
        <h2 style={{marginLeft:420}}>HÀ TRUNG</h2>
        <p></p>
      </div>
      <div className={clsx(styles.headerNav)}>
            <NavbarAdmin />
          </div>
    </div>
    <div style={{height:200}}>
      <RoutessAdmin/>
    </div>
   </>
  );
}

export default Admin;
