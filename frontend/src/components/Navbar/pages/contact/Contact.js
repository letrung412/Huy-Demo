import styles from "./contact.module.scss";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import banner from "../../../../assets/images/home/banner-11.jpg";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { MdOutlineRssFeed } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import Select from "react-select";
import clsx from "clsx";
import { strTrim,checkInterger } from "../../../../global/const";
import Service from "../../../api/shopService";
import ModalNoti from "../ModalNoti/ModalNoti";
const options = [
  { label: "Góp ý", value: "Góp ý" },
  { label: "Quảng cáo", value: "Quảng cáo" },
];
function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageNoti, setMessageNoti] = useState("");
  const OnSubmit = () => {
    if (
      strTrim(name) > 0 &&
      strTrim(message) > 0 &&
      strTrim(email) > 0 &&
      strTrim(phone) > 0 &&
      email.endsWith("@gmail.com")&&checkInterger(phone)&&strTrim(phone)===10
    ) {
      Service.sendEmail({
        name,
        to: email,
        title: selectedOption.value,
        content: message,
      }).then(() => {
        setMessageNoti(
          "Gửi nhận xét thành công.Chúng tôi sẽ phản hồi sớm nhất có thể"
        );
      });
    } else {
      setMessageNoti("Vui lòng nhập thông tin chính xác");
    }
  };
  const Done = () => {
    if (messageNoti === "Vui lòng nhập thông tin chính xác") {
      setMessageNoti("");
    } else {
      window.location.replace("/home");
    }
  };
  return (
    <div className={styles.contact}>
      <div className={styles.contactTitle}>
        <img src={banner} width="100%" alt="banner" />
        <div className={styles.contactTitleContent}>
          <h4>LIÊN HỆ</h4>
          <div>
            <Nav.Link as={Link} to="/home">
              {" "}
              <h6>TRANG CHỦ</h6>
            </Nav.Link>
            <span>/</span>
            <Nav.Link>
              {" "}
              <h6>LIÊN HỆ</h6>
            </Nav.Link>
          </div>
        </div>
      </div>
      <div className={styles.contactInfor}>
        <div className={styles.contactInforOne}>
          <h5>THÔNG TIN LIÊN HỆ</h5>
          <p>
            {" "}
            <strong>
              <MdLocationOn />
            </strong>
            128 Nguyễn Trãi,Thanh Xuân,Hà Nội
          </p>
          <p>
            {" "}
            <strong>
              <BsTelephoneFill />
            </strong>
            03391234567
          </p>
          <p>
            {" "}
            <strong>
              <MdEmail />
            </strong>
            trangdth16092000@gmail.com
          </p>
          <div style={{ display: "flex" }}>
            <div className={clsx(styles.hover, styles.facebook)}>
              <a href="https://www.facebook.com">
                <FaFacebookF />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.instagram)}>
              <a href="/home">
                <FaInstagram />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.twitter)}>
              <a href="/home">
                <FaTwitter />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.pinterest)}>
              <a href="/home">
                <FaPinterest />
              </a>
            </div>
            <div className={clsx(styles.hover, styles.feed)}>
              <a href="/home">
                <MdOutlineRssFeed />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.contactInforTwo}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Họ và tên"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div style={{ display: "flex" }}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
            />
            <Select
              className={styles.select}
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.Input}
            placeholder="Lời nhắn"
          />
          <button onClick={() => OnSubmit()}>GỬI</button>
        </div>
      </div>
      <ModalNoti message={messageNoti} done={Done} />
    </div>
  );
}

export default Contact;
