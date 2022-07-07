import { Button, Modal, Nav, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Account.module.scss";
import Login from "./Login";
import { FaUserAlt } from "react-icons/fa";
import Service from "../../../api/shopService";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
function Singup() {
  const role =JSON.parse(window.localStorage.getItem("role"))
  const [valueNameUser, setValueNameUser] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const id = JSON.parse(window.localStorage.getItem("id"));
  const [idUser, setIdUser] = useState(id);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const [message, setMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggel = () => {
    Service.getLogin({
      username:valueNameUser,
      password:valuePassword
    }).then((res)=>{
      Service.getCustomer(res.data.customer_id).then((res)=>{
        window.localStorage.setItem("role", JSON.stringify(res.data.role));
      })
        window.localStorage.setItem("id", JSON.stringify(res.data.customer_id));
        setToggle(false);
        handleClose();
        setShow2(false);
        window.location.href = "/home";
    }).catch(()=>{
      setToggle(true);
    })
  };
  const answer =(choice)=>{
     if (choice) {
      window.localStorage.setItem("id", JSON.stringify(0));
      window.localStorage.setItem("role", JSON.stringify("customer"));
      setIdUser(0);
      setShow2(true);
      window.location.href = "/home";
    }else{
      setMessage("")
    }
  }
 
  useEffect(() => {
    if (idUser !== 0) {
      setShow2(false);
    } else {
      setShow2(true);
    }
  }, [idUser]);
  return (
    <>
      {show2 && (
        <>
          <span
            variant="primary"
            onClick={handleShow}
            className={styles.loginButton}
          >
            ĐĂNG NHẬP
          </span>

          <Modal size="lg" className={styles.modal} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>ĐĂNG NHẬP </Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <div className={styles.modalContent}>
                <p>Tên đăng nhập *</p>
                <input
                  type="text"
                  value={valueNameUser}
                  onChange={(e) => setValueNameUser(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                />
                <p>Mật khẩu *</p>
                <input
                  type="password"
                  value={valuePassword}
                  onChange={(e) => setValuePassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
                {toggle && (
                  <p className={styles.modalContentErr}>Tài khoản không đúng</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Login />
              <Button variant="danger" onClick={handleToggel}>
                ĐĂNG NHẬP
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {!show2 && (
        <div className={styles.account}>
          <NavDropdown
            title="TÀI KHOẢN "
            id="basic-nav-dropdown"
            className={styles.accountDropdown}
          >
          {role!=="admin"&&  <NavDropdown.Item as={Link} to="/account/order">
              Đơn hàng
            </NavDropdown.Item>}
            {/* {role!=="admin"&&<NavDropdown.Item as={Link} to="/account/address">
              Địa chỉ
            </NavDropdown.Item>} */}
            <NavDropdown.Item as={Link} to="/account/accountInfor">
              Thông tin tài khoản
            </NavDropdown.Item>
            <NavDropdown.Item onClick={ ()=>setMessage("Bạn có chắc chắn muốn đăng xuất?")}>
              Đăng xuất
            </NavDropdown.Item>
          </NavDropdown>
          <FaUserAlt className={styles.accountFaUserAlt} />
        </div>
      )}
      <ModalConfirm message={message} answer={answer}/>
    </>
  );
}
export default Singup;
