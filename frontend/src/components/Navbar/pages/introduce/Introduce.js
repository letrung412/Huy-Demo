import styles from "./introduce.module.scss";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import banner from "../../../../assets/images/home/banner-11.jpg";
import {banner2} from '../../../../assets/images/introduce'
function Introduce() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.introduce}>
      <div className={styles.introduceTitle}>
        <img src={banner} width="100%" alt="banner" />
        <div className={styles.introduceTitleContent}>
          <h4>GIỚI THIỆU</h4>
          <div>
            <Nav.Link as={Link} to="/home">
              {" "}
              <h6>TRANG CHỦ</h6>
            </Nav.Link>
            <span>/</span>
            <Nav.Link>
              {" "}
              <h6>GIỚI THIỆU</h6>
            </Nav.Link>
          </div>
        </div>
      </div>
      <div className={styles.introduceGrid}>
        <img src="https://armystore.vn/upload/store/2019-11-05/ao-so-mi-nam-dai-tay-phong-cach-linh-army-arm-933-mau-cat-1.jpg" alt="" />
        <div className={styles.introduceGridOne}>
          <h4>GIỚI THIỆU</h4>
          <p>
            Chào mừng bạn đến với Shop Hà Trung! Tại đây, mỗi một dòng chữ,
            mỗi chi tiết và hình ảnh đều là những bằng chứng mang dấu ấn lịch sử
           shop Hà Trung 100 năm, và đang không ngừng phát triển lớn mạnh.
          </p>
          <h5>SẢN PHẨM SẢN PHẨM TỐT NHẤT</h5>
          <div>
            <p>
              Chào mừng bạn đến với Shop Hà Trung! Tại đây, mỗi một dòng
              chữ, mỗi chi tiết và hình ảnh đều là những bằng chứng mang dấu ấn
              lịch sử shop Hà Trung 100 năm, và đang không ngừng phát triển lớn mạnh.
            </p>
            <p>
              Chào mừng bạn đến với Shop Hà Trung! Tại đây, mỗi một dòng
              chữ, mỗi chi tiết và hình ảnh đều là những bằng chứng mang dấu ấn
              lịch sử shop Hà Trung 100 năm, và đang không ngừng phát triển lớn mạnh.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.introduceGrid2}>
        <div className={styles.introduceGrid2Item}>
          <h5>Miễn phí giao hàng</h5>
          <p>
            Tại đây, mỗi một dòng chữ,mỗi chi tiết và hình ảnh đều là những bằng
            chứng mang dấu ấn lịch sử shop Hà Trung 100 năm, và đang không ngừng phát
            triển lớn mạnh
          </p>
        </div>
        <div className={styles.introduceGrid2Item}>
          <h5>Đổi trả trong vòng 7 ngày</h5>
          <p>
            Tại đây, mỗi một dòng chữ,mỗi chi tiết và hình ảnh đều là những bằng
            chứng mang dấu ấn lịch sử shop Hà Trung 100 năm, và đang không ngừng phát
            triển lớn mạnh
          </p>
        </div>
        <div className={styles.introduceGrid2Item}>
          <h5>Sản phẩm mới 100%</h5>
          <p>
            Tại đây, mỗi một dòng chữ,mỗi chi tiết và hình ảnh đều là những bằng
            chứng mang dấu ấn lịch sử shop Hà Trung 100 năm, và đang không ngừng phát
            triển lớn mạnh
          </p>
        </div>
        <div className={styles.introduceGrid2Item}>
          <h5>Chăm sóc khách hàng</h5>
          <p>
            Tại đây, mỗi một dòng chữ,mỗi chi tiết và hình ảnh đều là những bằng
            chứng mang dấu ấn lịch sử shop Hà Trung 100 năm, và đang không ngừng phát
            triển lớn mạnh
          </p>
        </div>
        <div className={styles.introduceGrid2Item}>
          <h5>Hàng chính hãng </h5>
          <p>
            Tại đây, mỗi một dòng chữ,mỗi chi tiết và hình ảnh đều là những bằng
            chứng mang dấu ấn lịch sử shop Hà Trung 100 năm, và đang không ngừng phát
            triển lớn mạnh
          </p>
        </div>
        <div className={styles.introduceGrid2Item}>
          <h5>Thanh toán đa dạng</h5>
          <p>
            Tại đây, mỗi một dòng chữ,mỗi chi tiết và hình ảnh đều là những bằng
            chứng mang dấu ấn lịch sử shop Hà Trung 100 năm, và đang không ngừng phát
            triển lớn mạnh
          </p>
        </div>
      </div>
    </div>
  );
}
export default Introduce;
