import styles from "./accessory.module.scss";
import { useEffect } from "react";
import LayoutLeft from "./LayoutLeft";
import LayoutRight from "./LayoutRight";
import { Nav } from "react-bootstrap";
import {Link} from "react-router-dom";
function LayoutGeneral(props) {
  const index = window.location.href
  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [index]);
  return (
    <div className={styles.accessory}>
      <div>
        <div className={styles.accessoryLink}>
          <Nav.Link className={styles.accessoryLinkItem} as={Link} to ="/home">TRANG CHỦ</Nav.Link>
          <span>/</span>
          <h5>{props.title}</h5>
        </div>
        <div>
          <LayoutLeft />
        </div>
      </div>
      <div>
        <LayoutRight arrImage={props.arrImage} />
      </div>
    </div>
  );
}

export default LayoutGeneral;
