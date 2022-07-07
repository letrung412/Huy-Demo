import styles from "./Account.module.scss";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Service from "../../../api/shopService";
import { convertDate, FORMAT_PRICE ,STATUS} from "../../../../global/const";
import ModalConfirm from './../ModalConfirm/ModalConfirm';
import ModalNoti from './../ModalNoti/ModalNoti';
function Order(props) {
  const index = JSON.parse(window.localStorage.getItem("index"));
  const [idOrder,setIdOrder]=useState("")
  const [message, setMessage] = useState("");
  const [messageNoti, setMessageNoti] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);
  const handleSubmit = (index) => {
    window.localStorage.setItem("index", JSON.stringify(index));
  };
  const handleDelete = (id) => {
    setIdOrder(id)
    setMessage("Bạn có chắc chắn muốn hủy đơn này?")
  };
  const Answer=(choice)=>{
    if(choice){
      Service.updateOrder(idOrder,{
        status:"cancel"
      }).then(()=>{
        setMessage("")
        setMessageNoti("Bạn đã hủy đơn thành công.")
      })
    }else{
      setMessage("")
    }
  }
  const Done=()=>{
    window.location.reload()
  }
  return (
    <>
      <div className={styles.order}>
        {props.arrOrder.length > 0 && (
          <Table className={styles.orderTable} variant="light">
            <thead>
              <tr style={{ fontSize: "14px" }}>
                <th>MÃ ĐƠN</th>
                <th>NGÀY</th>
                <th>TÌNH TRẠNG</th>
                <th>TỔNG</th>
                <th>CÁC THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {props.arrOrder.map((el, index) => (
                <tr key={index} style={{ fontSize: "16px", color: "#444" }}>
                  <td>{el.code}</td>
                  <td>{convertDate(el.ctime)}</td>
                  {el.status===STATUS[1].value&&<td>Đang chờ xử lý</td>}
                  {el.status===STATUS[0].value&&<td>Giao hàng thành công</td>}
                  {el.status===STATUS[2].value&&<td>Đơn hàng đã hủy</td>}
                  <td>
                    {FORMAT_PRICE(el.total)}đ cho {el.items.length} mục
                  </td>
                  <td>
                    <Button
                      variant="success"
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        marginRight: 30,
                      }}
                      as={Link}
                      to="/account/detailOrder"
                      onClick={() => handleSubmit(el.id)}
                    >
                      XEM
                    </Button>
                   {props.button&& <Button
                      variant="danger"
                      style={{ fontSize: "13px", fontWeight: "700" }}
                      onClick={() => handleDelete(el.id)}
                    >
                      HỦY
                    </Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {props.arrOrder.length === 0 && (
          <div className={styles.orderButton}>
            <Link className={styles.buttonStore} to="/store" variant="danger">TỚI CỦA HÀNG </Link>
            <p>Chưa có đơn hàng được tạo ra</p>
          </div>
        )}
        <ModalConfirm message={message} answer={Answer}/>
        <ModalNoti message={messageNoti} done={()=>Done()}/>
      </div>
    </>
  );
}

export default Order;
