import styles from "./Account.module.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Service from "../../../api/shopService";
import { convertDate, FORMAT_PRICE,STATUS } from "../../../../global/const";
function DetailOrder() {
  const index = JSON.parse(window.localStorage.getItem("index"));
  const [orderUser, setOrderUser] = useState({});
  useEffect(() => {
    if (parseInt(index)!== 0) {
      Service.getOrderView(index).then((res)=>{
        setOrderUser(res.data)
      })
    
    } else {
      setOrderUser({});
    }
  }, [index]);
  return (
    <>
      {orderUser.items&& (
        <div className={styles.detailOrder}>
          <p className={styles.detailOrderTitle}>
            {" "}
            Mã đơn hàng <span>{orderUser.code}</span> đã được đặt vào ngày{" "}
            <span>{convertDate(orderUser.ctime)}</span> và tình trạng hiện tại là{" "}
            {orderUser.status===STATUS[1].value&&<span>Đang chờ xử lý</span>}
                  {orderUser.status===STATUS[0].value&&<span>Giao hàng thành công</span>}
                  {orderUser.status===STATUS[2].value&&<span>Đơn hàng đã hủy</span>}
          </p>
          <h4>Chi tiết đơn hàng</h4>
          <div style={{ borderBottom: "3px solid #eee" }}>
            <p>SẢN PHẨM</p>
            <p>TỔNG</p>
          </div>
            <div>
              <span>
                {orderUser.items[0].product.name} ({FORMAT_PRICE(orderUser.items[0].product.price)}đ x {orderUser.items[0].amount} x {orderUser.items[0].product.color})
              </span>
              <strong>
              {FORMAT_PRICE(orderUser.items[0].product.price)}đ
              </strong>
            </div>
          <div>
            <strong>Tổng tiền hàng:</strong>
            <strong>{FORMAT_PRICE(orderUser.total)}đ</strong>
          </div>
          <div>
            <strong>Tổng tiền phí vận chuyển:</strong>
            <span>0đ</span>
          </div>
          <div>
            <strong>Tổng phương thức thanh toán:</strong>
            {orderUser.status===STATUS[0].value&&<span>Thanh toán qua ngân hàng</span>}
            {orderUser.status===STATUS[1].value&&<span>Thanh toán tiền mặt</span>}
            {orderUser.status===STATUS[2].value&&<span>Thanh toán tiền mặt</span>}
          </div>
          <div>
            <strong>Tổng thanh toán:</strong>
            <strong>{FORMAT_PRICE(orderUser.total)}đ</strong>
          </div>

          <h4 style={{ marginTop: "20px" }}>Địa chỉ thanh toán</h4>
          <section>
            <strong>Tên người nhận :</strong>
            <p>{orderUser.info.name}</p>
          </section>
          <section>
            <strong>Số điện thoại:</strong>
            <p>{orderUser.info.phone}</p>
          </section>
          <section>
            <strong>Địa chỉ:</strong>
            <p>{orderUser.info.address}</p>
          </section>
          <Button
            variant="danger"
            style={{ marginBottom: "50px" }}
            as={Link}
            to="/account/order"
          >
            TRỞ LẠI
          </Button>
        </div>
      )}
      {!orderUser.items && <h1>xinchao</h1>}
    </>
  );
}
export default DetailOrder;
