import { Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "../styles/Navbar.module.scss";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
// import useLocalStorage from "../../hooks/useLocalStorage";
function NavbarMobile() {
  const [show, setShow] = useState(false);
  const id = JSON.parse(window.localStorage.getItem("id"));
  const [idUser, setIdUser] = useState(id);
  const handleLogout = () => {
    const choice = window.confirm("Bạn có chắc chắn muốn đăng xuất ?");
    if (choice) {
      window.localStorage.setItem("id", JSON.stringify(0));
      setIdUser(0);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={styles.headerMobile}>
      <div style={{ margin: 20 }}>
        <AiOutlineMenu
          className={styles.headerMoblieList}
          style={{ color: "#fff", fontSize: 30 }}
          variant="primary"
          onClick={handleShow}
        />

        <Offcanvas
          show={show}
          style={{
            width: 260,
            backgroundColor: "rgb(255,255,255,0.95",
          }}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ padding: 0 }}>
            <div className={styles.body}>
              <div className={styles.bodyInput}>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  style={{ marginLeft: 20 }}
                />
                <button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    color: "white",
                    padding: "0px 7px 2px 7px",
                    fontSize: 21,
                    marginLeft: 5,
                  }}
                >
                  <IoSearchSharp />
                </button>
              </div>
              <ul
                className={styles.bodyNav}
                style={{ paddingLeft: "0", marginTop: "20px" }}
              >
                <Nav.Link
                  style={{
                    borderTop: "0.5px solid #ccc",
                  }}
                  as={Link}
                  to="/home"
                  className={styles.navlink}
                  onClick={handleClose}
                >
                  TRANG CHỦ
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/introduce"
                  onClick={handleClose}
                  className={styles.navlink}
                >
                  GIỚI THIỆU
                </Nav.Link>
                <Nav.Link className={clsx(styles.navlink)}>
                  NỮ <RiArrowDropDownLine style={{ fontSize: "30px" }} />
                  <div className={styles.focus1}>
                    <ul
                      style={{
                        paddingLeft: 0,
                      }}
                    >
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/women/classic'>Classic</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/women/sunbaked'>Sunbaked</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/women/chuck07s'>Chuck 07s</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/women/onestar'>One Star</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/women/psykicks'>PSY-Kicks</Nav.Link>
                    </ul>
                  </div>
                </Nav.Link>
                <Nav.Link className={styles.navlink}>
                  NAM
                  <RiArrowDropDownLine style={{ fontSize: "30px" }} />
                  <div className={styles.focus1}>
                    <ul
                      style={{
                        paddingLeft: 0,
                      }}
                    >
                       <Nav.Link className={styles.NavLink1} as={Link} to ='/men/classic'>Classic</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/men/sunbaked'>Sunbaked</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/men/chuck07s'>Chuck 07s</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/men/onestar'>One Star</Nav.Link>
                      <Nav.Link className={styles.NavLink1} as={Link} to ='/men/psykicks'>PSY-Kicks</Nav.Link>
                    </ul>
                  </div>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/children"
                  onClick={handleClose}
                  className={styles.navlink}
                >
                  TRẺ EM
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/accessory"
                  onClick={handleClose}
                  className={styles.navlink}
                >
                  PHỤ KIỆN KHÁC
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/news"
                  onClick={handleClose}
                  className={styles.navlink}
                >
                  TIN TỨC
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  onClick={handleClose}
                  className={styles.navlink}
                >
                  LIÊN HỆ
                </Nav.Link>
                {idUser === 0 && (
                  <div>
                    <Nav.Link
                      as={Link}
                      to="/account/singupmobile"
                      onClick={handleClose}
                      className={styles.navlink}
                    >
                      Đăng nhập
                    </Nav.Link>
                  </div>
                )}
                {idUser > 0 && (
                  <Nav.Link className={styles.navlink}>
                    TÀI KHOẢN
                    <RiArrowDropDownLine style={{ fontSize: "30px" }} />
                    <div className={styles.focus1}>
                      <ul
                        style={{
                          paddingLeft: 0,
                        }}
                      >
                        <Nav.Link
                          as={Link}
                          to="/account/dashboard"
                          className={styles.NavLink1}
                          onClick={handleClose}
                        >
                          Bảng điều khiển
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/account/order"
                          onClick={handleClose}
                          className={styles.NavLink1}
                        >
                          Đơn hàng
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/account/dowload"
                          onClick={handleClose}
                          className={styles.NavLink1}
                        >
                          Tải xuống
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/account/address"
                          onClick={handleClose}
                          className={styles.NavLink1}
                        >
                          Địa chỉ
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/account/accountinfor"
                          onClick={handleClose}
                          className={styles.NavLink1}
                        >
                          Thông tin tài khoản
                        </Nav.Link>
                        <Nav.Link
                          onClick={handleLogout}
                          className={styles.NavLink1}
                        >
                          Đăng xuất
                        </Nav.Link>
                      </ul>
                    </div>
                  </Nav.Link>
                )}
              </ul>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      {/* <div style={{ marginLeft: 180, paddingRight: 15, marginTop: 10 }}>
        <img src={image} alt="logo" height="50px" width="110px" />
      </div> */}
    </div>
  );
}

export default NavbarMobile;
