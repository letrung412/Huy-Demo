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
          setMessage("Sửa thông tin thành công");
        });
      } else {
        setMessage("Vui lòng nhập đầy đủ thông tin");
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
                setMessage("Sửa thông tin thành công");
                setNewPassword("")
                setPassword("")
                setRetypePassword("")
              });
            })
          } else {
            setMessage("Vui lòng nhập đầy đủ thông tin")
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
        <h5>THÔNG TIN CÁ NHÂN</h5>
        {/* {success && <p className={styles.success}>Cập nhật thành công</p>}
        {err && <p className={styles.err}>Vui lòng nhập đầy đủ thông tin</p>} */}
        <div className={styles.accountInforName}>
          <div>
            <p>Tên đăng nhập *</p>
            <input
              value={userName}
              className={styles.Input}
              placeholder="Tên đăng nhập"
              type="text"
              disabled
            />
          </div>
          <div>
            <p>Ngày sinh *</p>
            <input
              className={styles.Input}
              value={birthday}
              onChange={(e) => OnChangeBirthday(e.target.value)}
              type="text"
              placeholder="Ngày sinh"
            />
            {showValidBirthday && (
              <span>Vui lòng nhập đúng định dạng dd-mm-yyyy</span>
            )}
          </div>
          <div>
            <p>Căn cước công dân *</p>
            <input
              value={cccd}
              onChange={(e) => OnChangeCccd(e.target.value)}
              className={styles.Input}
              placeholder="cccd"
              type="text"
            />
            {showValidCccd && (
              <span>Vui lòng căn cước công dân 9 hoặc 12 chữ số</span>
            )}
          </div>
          <div>
            <p>Số điện thoại *</p>
            <input
              className={styles.Input}
              value={phone}
              onChange={(e) => OnChangePhone(e.target.value)}
              type="text"
              placeholder="Số điện thoại"
            />
            {showValidPhone && <span>Vui lòng nhập đúng số điện thoại</span>}
          </div>
        </div>

        <h5>THAY ĐỔI MẬT KHẨU</h5>
        <div>
          <p>Mật khẩu hiện tại (bỏ trống nếu không đổi)</p>
          <input
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {toggle1 && <span>Mật khẩu không đúng</span>}
        </div>
        <div>
          <p>Mật khẩu mới</p>
          <input
            style={{ width: "100%" }}
            value={newPassword}
            onChange={(e) => OnChangeNewPassword(e.target.value)}
            type="password"
          />
          {toggle2 && <span>Mật khẩu ít nhất có 6 ký tự</span>}
        </div>
        <div>
          <p>Xác nhận mật khẩu mới</p>
          <input
            style={{ width: "100%" }}
            value={retypePassword}
            onChange={(e) => OnChangeRetypePassword(e.target.value)}
            type="password"
          />
          {toggle3 && <span>Mật khẩu không trùng khớp</span>}
        </div>
        <Button
          style={{ margin: "20px 0" }}
          onClick={handleSubmit}
          variant="danger"
        >
          LƯU THAY ĐỔI
        </Button>
      </div>
      <ModalNoti message={message} done={() => setMessage("")} />
    </>
  );
}

export default AccountInfor;
