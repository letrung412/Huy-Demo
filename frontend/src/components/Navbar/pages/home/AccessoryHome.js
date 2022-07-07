import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import banner from "../../../../assets/images/home/banner-1.jpg";
import { useEffect, useState } from "react";
import Service from "../../../api/shopService";
import { FORMAT_PRICE } from "../../../../global/const";
function AccessoryHome() {
  const [arrImageLastest, setArrImageLastest] = useState([]);
  useEffect(() => {
    Service.getListProduct().then((res) => {
      setArrImageLastest(res.data.slice(res.data.length-8));
    });
  }, []);
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  }
  return (
    <section className={styles.accessoryHome}>
      <h5>SẢN PHẨM MỚI NHẤT</h5>
      <div className={styles.accessoryHomeContent}>
        {arrImageLastest.map((el, index) => (
          <div key={index}>
            <img
              src={el.image[0]}
              width="238px"
              height="238px"
              alt=""
            />
            <p>{el.name}</p>
            <strong>{FORMAT_PRICE(el.price)}đ</strong>
            <Nav.Link className={styles.button} as={Link} to={`Cart/${el.id}`} onClick={()=>OnAddProduct(el.id)}>
              XEM SẢN PHẨM
            </Nav.Link>
          </div>
        ))}
      </div>
      <Nav.Link className={styles.viewAll} as={Link} to="/men">
        XEM TẤT CẢ
      </Nav.Link>
      <div className={styles.banner}>
        <img src={banner} alt="banner" />
        <div>
          <h1>
           SHOP QUẦN ÁO HÀ TRUNG
          </h1>
          <Nav.Link className={styles.bannerAll} as={Link} to="/store">
            XEM TẤT CẢ
          </Nav.Link>
        </div>
      </div>
    </section>
  );
}

export default AccessoryHome;
