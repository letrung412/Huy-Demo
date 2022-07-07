import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import Service from '../../../api/shopService';
import {FORMAT_PRICE} from '../../../../global/const'
function SaleOff() {  
  const [arrImageSale, setArrImageSale] = useState([]);
  useEffect(()=>{
    Service.getListSale().then((res)=>{
      setArrImageSale(res.data.slice(0,8))
    })
  },[])
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  }
  return (
    <section className={styles.accessoryHome}>
      <h5>SẢN PHẨM GIẢM GIÁ</h5>
      <div className={styles.accessoryHomeContent}>
        {arrImageSale.map((el, index) => (
          <div key={index}>
            <img src={el.image[0]} width="238px" height="238px" alt="" />
            <p>{el.name}</p>
          <div style={{display:"flex",justifyContent:"space-around",padding:"0 40px"}}>
          <span style={{textDecorationLine:"line-through"}}>{FORMAT_PRICE(el.origin_price)}đ</span>
            <strong>{FORMAT_PRICE(el.price)}đ</strong>
          </div>
            <Nav.Link
              className={styles.button}
              as={Link}
              to={`/Cart/${el.id}`}
              onClick={()=>OnAddProduct(el.id)}
            >
              XEM SẢN PHẨM
            </Nav.Link>
            <div className={styles.sale}>
              <p>{100-Math.round((el.price/el.origin_price)*100)}%</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SaleOff;
