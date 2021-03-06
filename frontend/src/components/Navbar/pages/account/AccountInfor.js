import styles from "./Account.module.scss";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Service from "./../../../api/shopService";
import {
  CheckDate,
  checkInterger,
  reverseBirthday,
  strTrim,
} from "./../../../../global/const";
import ModalNoti from "./../ModalNoti/ModalNoti";
function AccountInfor() {
  const id = JSON.parse(window.localStorage.getItem("id"));
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showValidBirthday, setShowValidBirthday] = useState(false);
  const [phone, setPhone] = useState("");
  const [showValidPhone, setShowValidPhone] = useState(false);
  const [cccd, setCccd] = useState("");
  const [showValidCccd, setShowValidCccd] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    Service.getCustomer(id).then((res) => {
      setUserName(res.data.username);
      setBirthday(reverseBirthday(res.data.birthday));
      setPhone(res.data.phone);
      setCccd(res.data.cccd);
    });
  }, [id]);

  const OnChangeBirthday = (e) => {
    setBirthday(e);
    const comp = e.split("-");
    setShowValidBirthday(!CheckDate(comp));
  };
  const OnChangeCccd = (e) => {
    setCccd(e);
    setShowValidCccd(
      !checkInterger(e) || (strTrim(e) !== 9 && strTrim(e) !== 12)
    );
  };
  const OnChangePhone = (e) => {
    setPhone(e);
    setShowValidPhone(!checkInterger(e) || strTrim(e) !== 10);
  };
  const OnChangeNewPassword = (e) => {
    setNewPassword(e);
    setToggle2(strTrim(e) < 6);
  };
  const OnChangeRetypePassword = (e) => {
    setRetypePassword(e);
    setToggle3(e !== newPassword);
  };
  const handleSubmit = () => {
    if (strTrim(password) === 0) {
      if (!showValidBirthday && !showValidCccd && !showValidPhone) {
        Service.updateCustomer(id, {
          cccd: cccd,
          phone: phone,
          birthday: reverseBirthday(birthday),
        }).then((res) => {
          setMessage("S???a th??ng tin th??nh c??ng");
        });
      } else {
        setMessage("Vui l??ng nh???p ?????y ????? th??ng tin");
      }
    } else {
      Service.getLogin({
        username: userName,
        password: password,
      })
        .then(() => {
          if (
            !toggle2 &&
            !toggle3 &&
            strTrim(newPassword) !== 0 &&
            strTrim(retypePassword) !== 0 &&
            !showValidBirthday &&
            !showValidCccd &&
            !showValidPhone
          ) {
            Service.setPassword({
              customer_id:id,
              password:newPassword
            }).then(()=>{
              Service.updateCustomer(id, {
                cccd: cccd,
                phone: phone,
                birthday: reverseBirthday(birthday),
              }).then(() => {
                setMessage("S???a th??ng tin th??nh c??ng");
                setNewPassword("")
                setPassword("")
                setRetypePassword("")
              });
            })
          } else {
            setMessage("Vui l??ng nh???p ?????y ????? th??ng tin")
          }
        })
        .catch(() => {
          setToggle1(true);
        });
    }
  };

  return (
    <>
      <div className={styles.accountInfor}>
        <h5>TH??NG TIN C?? NH??N</h5>
        {/* {success && <p className={styles.success}>C???p nh???t th??nh c??ng</p>}
        {err && <p className={styles.err}>Vui l??ng nh???p ?????y ????? th??ng tin</p>} */}
        <div className={styles.accountInforName}>
          <div>
            <p>T??n ????ng nh???p *</p>
            <input
              value={userName}
              className={styles.Input}
              placeholder="T??n ????ng nh???p"
              type="text"
              disabled
            />
          </div>
          <div>
            <p>Ng??y sinh *</p>
            <input
              className={styles.Input}
              value={birthday}
              onChange={(e) => OnChangeBirthday(e.target.value)}
              type="text"
              placeholder="Ng??y sinh"
            />
            {showValidBirthday && (
              <span>Vui l??ng nh???p ????ng ?????nh d???ng dd-mm-yyyy</span>
            )}
          </div>
          <div>
            <p>C??n c?????c c??ng d??n *</p>
            <input
              value={cccd}
              onChange={(e) => OnChangeCccd(e.target.value)}
              className={styles.Input}
              placeholder="cccd"
              type="text"
            />
            {showValidCccd && (
              <span>Vui l??ng c??n c?????c c??ng d??n 9 ho???c 12 ch??? s???</span>
            )}
          </div>
          <div>
            <p>S??? ??i???n tho???i *</p>
            <input
              className={styles.Input}
              value={phone}
              onChange={(e) => OnChangePhone(e.target.value)}
              type="text"
              placeholder="S??? ??i???n tho???i"
            />
            {showValidPhone && <span>Vui l??ng nh???p ????ng s??? ??i???n tho???i</span>}
          </div>
        </div>

        <h5>THAY ?????I M???T KH???U</h5>
        <div>
          <p>M???t kh???u hi???n t???i (b??? tr???ng n???u kh??ng ?????i)</p>
          <input
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {toggle1 && <span>M???t kh???u kh??ng ????ng</span>}
        </div>
        <div>
          <p>M???t kh???u m???i</p>
          <input
            style={{ width: "100%" }}
            value={newPassword}
            onChange={(e) => OnChangeNewPassword(e.target.value)}
            type="password"
          />
          {toggle2 && <span>M???t kh???u ??t nh???t c?? 6 k?? t???</span>}
        </div>
        <div>
          <p>X??c nh???n m???t kh???u m???i</p>
          <input
            style={{ width: "100%" }}
            value={retypePassword}
            onChange={(e) => OnChangeRetypePassword(e.target.value)}
            type="password"
          />
          {toggle3 && <span>M???t kh???u kh??ng tr??ng kh???p</span>}
        </div>
        <Button
          style={{ margin: "20px 0" }}
          onClick={handleSubmit}
          variant="danger"
        >
          L??U THAY ?????I
        </Button>
      </div>
      <ModalNoti message={message} done={() => setMessage("")} />
    </>
  );
}

export default AccountInfor;
