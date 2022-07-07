import styles from "./cart.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../../api/shopService";
import { FORMAT_PRICE } from "./../../../../global/const";
import ModalNoti from "../ModalNoti/ModalNoti";
import ModalConfirm from './../ModalConfirm/ModalConfirm';

function ViewCart() {
  const [cart, setCart] = useState([]);
  const [message,setMessage]=useState("")
  const [messageConfirm,setMessageConfirm]=useState("")
  const [idOrder,setIdOrder]=useState("")
  const id = JSON.parse(window.localStorage.getItem("id"));
  const [value,setValue]=useState([])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Service.getListOrderCustomer(id).then((res) => {
      setCart(res.data);
     const arrAmount= res.data.map((el)=>el.items[0].amount)
     setValue(arrAmount)
    });
  }, [id,message]);
  const handleAdd=(index)=>{
    value[index]=value[index]+1
    setValue([...value])
  }
  const handleApart=(id,index)=>{
    if(value[index]===1){
      setIdOrder(id)
      setMessageConfirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")
    }else{
     value[index]=value[index]-1
     setValue([...value])
    }
  }
  const Answer=(choice)=>{
    if(choice){
      Service.updateOrder(idOrder,{
        status:"delete"
      }).then(()=>{
        setMessage("Xóa sản phẩm thành công")
        setMessageConfirm("")
        window.location.replace("/home")
      })
    }else{
      setMessageConfirm("")
    }
  }
  const HandleSuccess=()=>{
    window.location.reload()
  }
  const OnUpdate =(id,index)=>{
     Service.updateOrder(id,{
      status:"new",
      itemParams:{
        amount:value[index]
      }
    }).then(()=>{
      setMessage("Thêm số lượng sản phẩm thành công")
    })
  }
  const OnDelete =(id)=>{
    setIdOrder(id)
    setMessageConfirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")
  }

  return (
    <div className={styles.viewcart}>
      <div className={styles.viewcartTable}>
        <div className={styles.title}>
          <strong className={styles.titleName}>SẢN PHẨM</strong>
          <strong>ĐƠN GIÁ</strong>
          <strong>SỐ LƯỢNG</strong>
          <strong style={{paddingRight:60}}>SỐ TIỀN</strong>
          <strong className={styles.titleButton}>THAO TÁC</strong>
        </div>
        {cart.length>0&&cart.map((el,index)=>{
          return <div key={index} className={styles.content}>
          <div className={styles.contentImage}>
            <img
              src={ el.items[0].product.image[0] }
              alt=""
            />
            <div className={styles.contentImageInfo}>
              <p>{ el.items[0].product.name }</p>
              <p>{ el.items[0].product.material}</p>
              <p>{ el.items[0].product.color }</p>
            </div>
          </div>
          <div className={styles.contentPrice}>
            <p className={styles.price1}>
              {FORMAT_PRICE(el.items[0].product.origin_price) + "đ"
                }
            </p>
            <p className={styles.price2}>
              {FORMAT_PRICE(el.items[0].product.price) + "đ"
                }
            </p>
          </div>
          <div className={styles.contentAmount}>
            <p onClick={()=>handleApart(el.id,index)}>-</p> <p>{value[index]}</p>{" "}
            <p onClick={()=>handleAdd(index)}>+</p>
          </div>
          <p className={styles.price}>
            {FORMAT_PRICE(el.items[0].product.price * value[index]) + "đ"
             }
          </p>
         <div className={styles.contentButton}>
         <button onClick={()=>OnDelete(el.id)} >Xóa</button>
         <button onClick={()=>OnUpdate(el.id,index)} >Cập nhật</button>
          <Link to="/payment" onClick={()=> window.localStorage.setItem("idPayment", JSON.stringify(el.id))} className={styles.button102}>Thanh toán</Link>
          <ModalNoti message={message} done={HandleSuccess}/>
          <ModalConfirm message={messageConfirm} answer={Answer}/>
         </div>
        </div>
        })}
      </div>
    </div>
  );
}
export default ViewCart;
