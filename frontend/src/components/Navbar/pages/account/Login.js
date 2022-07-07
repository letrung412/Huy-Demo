import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Account.module.scss";
import { strTrim, checkInterger, CheckDate, reverseBirthday } from "../../../../global/const";
// import {re} from './checkEmail'
import { Row, Col, Label } from "reactstrap";
import Service from "../../../api/shopService";
import ModalNoti from "../ModalNoti/ModalNoti";
function Login() {
  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const [showCccd, setShowCccd] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [cccd, setCccd] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [success,setSuccess]=useState(null)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const OnchangeName = (value) => {
    setName(value);
    setShowName(strTrim(value) < 3);
  };
  const OnchangeUserName = (value) => {
    setUserName(value);
    setShowUserName(strTrim(value) < 3);
  };
  const OnchangeCccd = (value) => {
    setCccd(value);
    setShowCccd(
      (strTrim(value) !== 9 && strTrim(value) !== 12) || !checkInterger(value)
    );
  };
  const OnchangeBirthday = (value) => {
    setBirthday(value);
    setShowBirthday(!CheckDate(value.split("-")));
  };
  const OnchangePhone = (value) => {
    setPhone(value);
    setShowPhone(strTrim(value) !== 10 || !checkInterger(value));
  };
  const OnchangePassword = (value) => {
    setPassword(value);
    setShowPassword(strTrim(value) < 6);
  };
  const OnchangePasswordRepeat = (value) => {
    setPasswordRepeat(value);
    setShowPasswordRepeat(value !== password);
  };

  const updateUsers = () => {
    const check =
      strTrim(name) > 0 &&
      strTrim(cccd) > 0 &&
      strTrim(phone) > 0 &&
      strTrim(birthday) > 0 &&
      strTrim(userName) > 0 &&
      strTrim(password) > 0 &&
      strTrim(passwordRepeat) > 0 &&
      !showBirthday &&
      !showCccd &&
      !showName &&
      !showPassword &&
      !showPasswordRepeat &&
      !showPhone &&
      !showUserName;
      if(check){
        Service.createCustomer({
          name,username:userName,birthday:reverseBirthday(birthday),cccd,phone,role:"customer"
        }).then((res)=>{
          Service.setPassword({
            customer_id:res.data.id,
            password,
          }).then(()=>{
            setSuccess(true)
            setInterval(() => {
              setShow(false)
            }, 2000);
          })
        })
      }else{
        setSuccess(false)
      }
  };
  return (
    <>
      <span
        variant="primary"
        onClick={handleShow}
        className={clsx(styles.loginButton, styles.loginBtn)}
      >
        ĐĂNG KÝ
      </span>
      <Modal size='lg' className={styles.modal2} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ĐĂNG KÝ</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.login}>
          {success===true&&<p className={styles.success}>Đăng ký tài khoản thành công.Quay lại để đăng nhập.</p>}
          {success===false&&<p className={styles.danger}>Vui lòng nhập đầy đủ thông tin</p>}
          <Row>
            <Col>
              <Label>Nhập họ tên</Label>
              <input
                value={name}
                onChange={(e) => OnchangeName(e.target.value)}
                placeholder="Nhập họ tên"
              />
              {showName && <span>Vui lòng nhập họ tên</span>}
            </Col>
            <Col>
              <Label>Nhập tên đăng nhập</Label>
              <input
                value={userName}
                onChange={(e) => OnchangeUserName(e.target.value)}
                placeholder="Nhập tên đăng nhập"
              />
              {showUserName && <span>Vui lòng nhập tên đăng nhập</span>}
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nhập số điện thoại</Label>
              <input
                value={phone}
                onChange={(e) => OnchangePhone(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
              {showPhone && <span>Vui lòng nhập số điện thoại</span>}
            </Col>
            <Col>
              <Label>Nhập căn cước công dân</Label>
              <input
                value={cccd}
                onChange={(e) => OnchangeCccd(e.target.value)}
                placeholder="Nhập cccd"
              />
              {showCccd && <span>Vui lòng nhập căn cước công dân</span>}
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nhập ngày sinh</Label>
              <input
                value={birthday}
                onChange={(e) => OnchangeBirthday(e.target.value)}
                placeholder="Nhập ngày sinh định dạng dd-mm-yyyy"
              />
              {showBirthday && (
                <span>Vui lòng nhập đúng định dạng dd-mm-yyyy</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nhập mật khẩu</Label>
              <input
                type="password"
                value={password}
                onChange={(e) => OnchangePassword(e.target.value)}
                placeholder="Nhập mật khẩu"
              />
              {showPassword && <span>Vui lòng nhập ít nhất 6 kí tự</span>}
            </Col>
            <Col>
              <Label>Nhập lại mật khẩu</Label>
              <input
                type="password"
                value={passwordRepeat}
                onChange={(e) => OnchangePasswordRepeat(e.target.value)}
                placeholder="Nhập lại mật khẩu"
              />
              {showPasswordRepeat && <span>Vui lòng nhập khớp mật khẩu</span>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={updateUsers}>
            ĐĂNG KÝ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Login;
