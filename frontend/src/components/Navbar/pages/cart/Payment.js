import styles from "./cart.module.scss";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Service from './../../../api/shopService';
import { FORMAT_PRICE,strTrim,checkInterger } from './../../../../global/const';
import ModalNoti from './../ModalNoti/ModalNoti';
function Payment() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cart, setCart] = useState({});
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [value, setValue] = useState("Trả tiền khi nhận hàng");
  const id = JSON.parse(window.localStorage.getItem("idPayment"))
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
   Service.getOrderView(id).then((res)=>{
     setCart(res.data)
   })
  }, [id]);
 
  const handleOrder = () => {

    if(strTrim(name)!==0&&strTrim(phone)!==0&&strTrim(address)!==0&&!showAddress&&!showPhone&&!showName){
      if(value==="Trả tiền khi nhận hàng"){
        Service.updateOrder(id,{
          status:"await",
          info:{
            name:name,
            phone:phone,
            address:address
          }
        }).then(()=>{
        setMessage("Mua sản phẩm thành công.")
        })
       }else{
        Service.updateOrder(id,{
          status:"done",
          info:{
            name:name,
            phone:phone,
            address:address
          }
        }).then(()=>{
          setMessage("Mua sản phẩm thành công.")
        })
       }
    }else{
      setMessage("Vui lòng nhập đầy đủ thông tin.")
    }
  
  };
const OnChangeName=(value)=>{
setName(value)
setShowName(strTrim(value)<2)
}
const OnChangePhone=(value)=>{
setPhone(value)
setShowPhone(!checkInterger(value)||strTrim(value)!==10)
}
const OnChangeAddress=(value)=>{
setAddress(value)
setShowAddress(strTrim(value)<2)
}
const Done=()=>{
if(message==="Mua sản phẩm thành công."){
  window.location.replace("account/order")
}else{
  setMessage("")
}
}
  return (
    <div className={styles.payment}>
      <div className={styles.informationCart}>
        <strong>ĐƠN HÀNG CỦA BẠN</strong>
        <div className={styles.title}>
          <strong>SẢN PHẨM</strong>
          <strong>TỔNG</strong>
        </div>
             {cart.items&&  <div >
                <p>
                  {cart.items[0].product.name} x  {cart.items[0].amount}
                </p>
                <p>
                {FORMAT_PRICE(cart.total)+"đ"}
                </p>
              </div>}
        <div>
          <strong>Tổng phụ</strong>
          <strong>  {cart.total?FORMAT_PRICE(cart.total)+"đ":""}</strong>
        </div>
        <div>
          <strong>Giao hàng</strong>
          <span>Giao hàng miễn phí</span>
        </div>
        <div>
          <strong>Tổng</strong>
          <strong>  {cart.total?FORMAT_PRICE(cart.total)+"đ":""}</strong>
        </div>
        <div style={{ border: "none" }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Trả tiền khi nhận hàng"
                control={<Radio />}
                label="Trả tiền khi nhận hàng"
              />
              <FormControlLabel
                value="Thanh toán qua ngân hàng"
                control={<Radio />}
                label="Thanh toán qua ngân hàng"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <button
          className={styles.Button}
          onClick={handleOrder}
        >
          ĐẶT HÀNG
        </button>
      </div>
      <div className={styles.information}>
        <strong>THÔNG TIN TÀI KHOẢN</strong>
        <strong>Nhập tên người nhận hàng</strong>
       <input value={name} onChange={(e)=>OnChangeName(e.target.value)} placeholder="Nhập tên"></input>
      <span> {showName?"Vui lòng nhập tên hợp lệ":""}</span>
        <strong>Nhập số điện thoại</strong>
       <input value={phone} onChange={(e)=>OnChangePhone(e.target.value)} placeholder="Nhập số điện thoại"></input>
    <span>{showPhone?"Vui lòng nhập số điện thoại hợp lệ":""}</span>
        <strong>Nhập địa chỉ nhận hàng</strong>
       <input value={address} onChange={(e)=>OnChangeAddress(e.target.value)} placeholder="Nhập địa chỉ"></input>
       <span>{showAddress?"Vui lòng nhập địa chỉ hợp lệ":""}</span>
      </div>
      <ModalNoti message={message} done={()=>Done()}/>
    </div>
  );
}

export default Payment;
