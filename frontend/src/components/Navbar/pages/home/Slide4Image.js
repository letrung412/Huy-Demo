import styles from "./home.module.scss";
import { Button } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import "react-slideshow-image/dist/styles.css";
import { converseStr, FORMAT_PRICE } from "../../../../global/const";
function SlideImage(props) {
  const { slideImage } = props;
  const slideImageSelling = [
    {
      url1: slideImage
        ? slideImage.length > 0
          ? slideImage[0].image[0]
          : ""
        : "",
      price1: slideImage
        ? slideImage.length > 0
          ? slideImage[0].price + "đ"
          : ""
        : "",
      title1: slideImage
        ? slideImage.length > 0
          ? slideImage[0].name
          : ""
        : "",
      id1: slideImage ? (slideImage.length > 0 ? slideImage[0].id : "") : "",
      url2: slideImage
        ? slideImage.length > 0
          ? slideImage[1].image[0]
          : ""
        : "",
      price2: slideImage
        ? slideImage.length > 0
          ? slideImage[1].price + "đ"
          : ""
        : "",
      title2: slideImage
        ? slideImage.length > 0
          ? slideImage[1].name
          : ""
        : "",
      id2: slideImage ? (slideImage.length > 0 ? slideImage[1].id : "") : "",
      url3: slideImage
        ? slideImage.length > 0
          ? slideImage[2].image[0]
          : ""
        : "",
      price3: slideImage
        ? slideImage.length > 0
          ? slideImage[2].price + "đ"
          : ""
        : "",
      title3: slideImage
        ? slideImage.length > 0
          ? slideImage[2].name
          : ""
        : "",
      id3: slideImage ? (slideImage.length > 0 ? slideImage[2].id : "") : "",
      url4: slideImage
        ? slideImage.length > 0
          ? slideImage[3].image[0]
          : ""
        : "",
      price4: slideImage
        ? slideImage.length > 0
          ? slideImage[3].price + "đ"
          : ""
        : "",
      title4: slideImage
        ? slideImage.length > 0
          ? slideImage[3].name
          : ""
        : "",
      id4: slideImage ? (slideImage.length > 0 ? slideImage[3].id : "") : "",
    },
    {
      url1: slideImage
        ? slideImage.length > 0
          ? slideImage[4].image[0]
          : ""
        : "",
      price1: slideImage
        ? slideImage.length > 0
          ? slideImage[4].price + "đ"
          : ""
        : "",
      title1: slideImage
        ? slideImage.length > 0
          ? slideImage[4].name
          : ""
        : "",
      id1: slideImage ? (slideImage.length > 0 ? slideImage[4].id : "") : "",
      url2: slideImage
        ? slideImage.length > 0
          ? slideImage[5].image[0]
          : ""
        : "",
      price2: slideImage
        ? slideImage.length > 0
          ? slideImage[5].price + "đ"
          : ""
        : "",
      title2: slideImage
        ? slideImage.length > 0
          ? slideImage[5].name
          : ""
        : "",
      id2: slideImage ? (slideImage.length > 0 ? slideImage[5].id : "") : "",
      url3: slideImage
        ? slideImage.length > 0
          ? slideImage[6].image[0]
          : ""
        : "",
      price3: slideImage
        ? slideImage.length > 0
          ? slideImage[6].price + "đ"
          : ""
        : "",
      title3: slideImage
        ? slideImage.length > 0
          ? slideImage[6].name
          : ""
        : "",
      id3: slideImage ? (slideImage.length > 0 ? slideImage[6].id : "") : "",
      url4: slideImage
        ? slideImage.length > 0
          ? slideImage[7].image[0]
          : ""
        : "",
      price4: slideImage
        ? slideImage.length > 0
          ? slideImage[7].price + "đ"
          : ""
        : "",
      title4: slideImage
        ? slideImage.length > 0
          ? slideImage[7].name
          : ""
        : "",
      id4: slideImage ? (slideImage.length > 0 ? slideImage[7].id : "") : "",
    },
  ];
  const OnAddProduct = (id) => {
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  };
  return (
    <div className={styles.slide1}>
      <div className="slide-container">
        <Slide>
          {slideImageSelling.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div
                className={styles.slide1Image}
                style={{ marginLeft: 45, display: "flex" }}
              >
                {slideImage.url2 && (
                  <div className={styles.slideimage}>
                    <img src={slideImage.url2} alt="slide1" />
                    <p>{converseStr(slideImage.title2)}</p>
                    <span>{FORMAT_PRICE(parseInt(slideImage.price2))}đ</span>
                    <div>
                      <Button
                        className={styles.slideimageHover}
                        as={Link}
                        to={`/Cart/${slideImage.id2}`}
                        onClick={() => OnAddProduct(slideImage.id2)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    </div>
                  </div>
                )}
                {!slideImage.url2 && <Spinner>Loading...</Spinner>}
                {slideImage.url1 && (
                  <div className={styles.slideimage}>
                    <img src={slideImage.url1} alt="slide1" />
                    <p>{converseStr(slideImage.title1)}</p>
                    <span>{FORMAT_PRICE(parseInt(slideImage.price1))}đ</span>
                    <div>
                      <Button
                        className={styles.slideimageHover}
                        as={Link}
                        to={`/Cart/${slideImage.id1}`}
                        onClick={() => OnAddProduct(slideImage.id1)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    </div>
                  </div>
                )}
                {!slideImage.url1 && <Spinner>Loading...</Spinner>}
                {slideImage.url3 && (
                  <div className={styles.slideimage}>
                    <img src={slideImage.url3} alt="slide1" />
                    <p>{converseStr(slideImage.title3)}</p>
                    <span>{FORMAT_PRICE(parseInt(slideImage.price3))}đ</span>
                    <div>
                      <Button
                        className={styles.slideimageHover}
                        as={Link}
                        to={`/Cart/${slideImage.id3}`}
                        onClick={() => OnAddProduct(slideImage.id3)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    </div>
                  </div>
                )}
                {!slideImage.url3 && <Spinner>Loading...</Spinner>}
                {slideImage.url4 && (
                  <div className={styles.slideimage}>
                    <img src={slideImage.url4} alt="slide1" />
                    <p>{converseStr(slideImage.title4)}</p>
                    <span>{FORMAT_PRICE(parseInt(slideImage.price4))}đ</span>
                    <div>
                      <Button
                        className={styles.slideimageHover}
                        as={Link}
                        to={`/Cart/${slideImage.id4}`}
                        onClick={() => OnAddProduct(slideImage.id4)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    </div>
                  </div>
                )}
                {!slideImage.url4 && <Spinner>Loading...</Spinner>}
                
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default SlideImage;
