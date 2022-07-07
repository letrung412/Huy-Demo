import styles from "./home.module.scss";
import { useState, useEffect, createContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slideshow from "./SlideShow";
import SlideImage from "./Slide5Image";
import TabsEvaluate from "./TabsEvaluate";
import {
  delivery6,
  delivery5,
  delivery4,
  delivery3,
  delivery2,
  delivery1,
} from "../../../../assets/images/home/Delivery/imageDelivery";
import {
  bank6,
  bank5,
  bank4,
  bank3,
  bank2,
  bank1,
} from "../../../../assets/images/home/Bank/imageBank";
import { converseStr, FORMAT_PRICE } from "../../../../global/const";
import Service from "../../../api/shopService";
import ModalNoti from "../ModalNoti/ModalNoti";
export const Images = createContext();
function AddCart(props) {
  const [num, setNum] = useState(1);
  const [message, setMessage] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [evaluate, setEvaluate] = useState({});
  const id = JSON.parse(window.localStorage.getItem("id"));
  const index = JSON.parse(window.localStorage.getItem("idProduct"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index, idProduct]);
  const handleApart = () => {
    setNum((prev) => {
      if (prev === 1) {
        return prev;
      }
      return prev - 1;
    });
  };

  const handleAdd = () => {
    setNum(num + 1);
  };

  const handleAddCart = (idOrderProduct) => {
    if (id === 0) {
      setMessage("Qúy khách vui lòng đăng nhập");
    } else {
      Service.getOrder(id).then((res) => {
        const arrOrder = res.data.map((el) => {
          return {
            idOrder: el.id,
            checkOrder: el.items[0].product.id === idOrderProduct,
          };
        });
        const check = arrOrder.filter((el) => el.checkOrder === true);
        if (check.length === 0) {
          Service.createOrder({
            customer_id: id,
            itemParams: {
              product_id: idOrderProduct,
              amount: num,
            },
          }).then(() => {
            setMessage("Thêm vào giỏ hàng thành công");
          });
        } else {
          Service.updateOrder(check[0].idOrder, {
            status: "new",
            itemParams: {
              amount: num,
            },
          }).then(() => {
            setMessage("Thêm vào giỏ hàng thành công");
          });
        }
      });
    }
  };
  const Done = () => {
    if (message === "Qúy khách vui lòng đăng nhập") {
      setMessage("");
    } else {
      window.location.replace("/viewcart");
    }
  };
  useEffect(() => {
    Service.getProduct(index).then((res) => {
      setEvaluate(res.data);
    });
  }, [index]);
  const addCart = (id) => {
    setIdProduct(id);
  };
  const handlePayment = (idOrderProduct) => {
    if (id === 0) {
      setMessage("Qúy khách vui lòng đăng nhập");
    } else {
      Service.getOrder(id).then((res) => {
        const arrOrder = res.data.map((el) => {
          return {
            idOrder: el.id,
            checkOrder: el.items[0].product.id === idOrderProduct,
          };
        });
        const check = arrOrder.filter((el) => el.checkOrder === true);
        if (check.length === 0) {
          Service.createOrder({
            customer_id: id,
            itemParams: {
              product_id: idOrderProduct,
              amount: num,
            },
          }).then((res) => {
            window.localStorage.setItem(
              "idPayment",
              JSON.stringify(res.data.id)
            );
            window.location.replace("/payment");
          });
        } else {
          Service.updateOrder(check[0].idOrder, {
            status: "new",
            itemParams: {
              amount: num,
            },
          }).then((res) => {
            window.localStorage.setItem(
              "idPayment",
              JSON.stringify(res.data.id)
            );
            window.location.replace("/payment");
          });
        }
      });
    }
  };
  return (
    <Images.Provider value={props}>
      <div className={styles.addcart}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* slideshow */}
          <div>
            {" "}
            <Slideshow evaluate={evaluate} />
          </div>
          {/* ------------- */}
          {evaluate && (
            <div className={styles.addcartContent}>
              <div className={styles.addcartContentTitle}>
                <Nav.Link className={styles.nav} as={Link} to="/home">
                  TRANG CHỦ
                </Nav.Link>
                <span>/</span>
                <Nav.Link
                  className={styles.nav}
                  as={Link}
                  to={`/${evaluate.gender}`}
                >
                  {evaluate.gender ? evaluate.gender.toUpperCase() : ""}
                </Nav.Link>
              </div>
              <h3>{evaluate.name?converseStr(evaluate.name):""}</h3>
              <strong>{evaluate.price?FORMAT_PRICE(evaluate.price)+"đ":""}</strong>
              <div className={styles.addcartContentPrice}>
                <div style={{ display: "flex" }}>
                  {" "}
                  <p onClick={handleApart}>-</p> <p>{num}</p>{" "}
                  <p onClick={handleAdd}>+</p>
                </div>
                <button
                  style={{ marginLeft: 17 }}
                  className={styles.Button}
                  onClick={() => handleAddCart(evaluate.id)}
                >
                  THÊM VÀO GIỎ
                </button>
                <button
                  className={styles.Button}
                  onClick={() => handlePayment(evaluate.id)}
                >
                  MUA SẢN PHẨM
                </button>
              </div>

              <div style={{ marginLeft: 17, display: "flex" }}>
                <div className={styles.delivery}>
                  <span>Tính phí ship tự động</span>
                  <img alt="" src={delivery1} />
                  <img alt="" src={delivery2} />
                  <img alt="" src={delivery3} />
                  <img alt="" src={delivery4} />
                  <img alt="" src={delivery5} />
                  <img alt="" src={delivery6} />
                </div>
                <div className={styles.bank}>
                  <span>Thanh toán</span>
                  <img alt="" src={bank1} />
                  <img alt="" src={bank2} />
                  <img alt="" src={bank3} />
                  <img alt="" src={bank4} />
                  <img alt="" src={bank5} />
                  <img alt="" src={bank6} />
                </div>
              </div>
              <p className={styles.p}>
                "Hãy trở thành Affilicate của chúng tôi để tìm thêm thu nhập thụ
                động, kiếm tiền online"
              </p>
            </div>
          )}
          {!evaluate && <h4>Đang load</h4>}
        </div>
        <TabsEvaluate inforProduct={evaluate} />
        <div className={styles.slide5Image}>
          <h4>SẢN PHẨM TƯƠNG TỰ</h4>
          <SlideImage parentCallBack={addCart} />
        </div>
      </div>
      <ModalNoti message={message} done={Done} />
    </Images.Provider>
  );
}

export default AddCart;
