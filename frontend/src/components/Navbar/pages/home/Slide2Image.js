import styles from "./home.module.scss";
import { Button } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
function SlideImage(props) {
  return (
    <div className={styles.slide2}>
      <div className="slide-container">
        <Slide>
          {props.slide.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div style={{ marginLeft: "-3px", display: "flex" }}>
                <div className={styles.slideimage}>
                  <img src={slideImage.url1} alt="slide1" />
                  <p>{slideImage.title1}</p>
                  <span>{slideImage.price1}</span>
                  <div>
                    <Button className={styles.slideimageHover}>
                      XEM SẢN PHẨM
                    </Button>
                  </div>
                </div>
                <div className={styles.slideimage}>
                  <img src={slideImage.url2} alt="slide1" />
                  <p>{slideImage.title2}</p>
                  <span>{slideImage.price2}</span>
                  <div>
                    <Button className={styles.slideimageHover}>
                      XEM SẢN PHẨM
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default SlideImage;
