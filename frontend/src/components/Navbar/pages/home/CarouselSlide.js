import styles from "./home.module.scss";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function CarouselSlide() {
  return (
    <>
      <Carousel className={styles.carousel}>
        <Carousel.Item>
          <img className="d-block" src="https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-cao-cap_113855694.jpg" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src="https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-the-thao-cho-nam_113858272.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src="https://img3.thuthuatphanmem.vn/uploads/2019/10/14/lookbook-thoi-trang-dep-nhat_113858913.jpg" alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <Container className={styles.container}>
        <Row className={styles.row}>
          <Col className={styles.col}>
            <img src="https://cf.shopee.vn/file/63072c90d0ed6f1acdbc301f4e35f890" alt="image6" className={styles.img1} />
            <img src="https://cf.shopee.vn/file/027ea7e9cdfdb9b16ea07a21f2a21f61_tn" alt="image1" className={styles.img2} />
            <div className={styles.overlay}>
              <Button as={Link} to="/men" variant="success">
                Xem sản phẩm
              </Button>
            </div>
          </Col>
          <Col className={styles.col}>
            <img src="https://cf.shopee.vn/file/a00bda1b44abb2c30d4e68e9dcc45512" alt="image2" className={styles.img1} />
            <img src="https://cf.shopee.vn/file/93459182bd187ee840cb91165850bb7c_tn" alt="image3" className={styles.img2} />
            <div className={styles.overlay}>
              <Button as={Link} to="/women" variant="success">
                Xem sản phẩm
              </Button>
            </div>
          </Col>
          <Col className={styles.col}>
            <img src="https://cf.shopee.vn/file/32ae72d44d119da449e9cca315f33e18" alt="image4" className={styles.img1} />
            <img src="https://cf.shopee.vn/file/a9d56cb8036ee813ba0fa70b1fadba81_tn" alt="image5" className={styles.img2} />
            <div className={styles.overlay}>
              <Button as={Link} to="/children" variant="success">
                Xem sản phẩm
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarouselSlide;
