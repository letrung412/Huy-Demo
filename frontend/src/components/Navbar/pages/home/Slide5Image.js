import styles from "./home.module.scss";
import { Button} from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";
import Service from '../../../api/shopService'
import { Spinner } from "reactstrap";

import { converseStr, FORMAT_PRICE } from '../../../../global/const';
// 4 image
function SlideImage(props) {
  const [arrSlideImage, setArrSlideImage] = useState([]);
  const {parentCallBack}=props
  useEffect(() => {
    Service.getListProduct().then((res)=>{
      setArrSlideImage(res.data.slice(res.data.length-10))
    })
  }, []);

  const slideImage = [
    {
      url1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].image[0]
          : ""
        : "",
      price1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].price + "đ"
          : ""
        : "",
      title1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].name
          : ""
        : "",
      id1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[0].id
          : ""
        : "",
      url2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].image[0]
          : ""
        : "",
      price2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].price + "đ"
          : ""
        : "",
      title2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].name
          : ""
        : "",
      id2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[1].id
          : ""
        : "",
      url3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].image[0]
          : ""
        : "",
      price3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].price + "đ"
          : ""
        : "",
      title3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].name
          : ""
        : "",
      id3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[2].id
          : ""
        : "",
      url4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].image[0]
          : ""
        : "",
      price4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].price + "đ"
          : ""
        : "",
      title4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].name
          : ""
        : "",
      id4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[3].id
          : ""
        : "",
        url5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].image[0]
          : ""
        : "",
      price5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].price + "đ"
          : ""
        : "",
      title5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].name
          : ""
        : "",
      id5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[8].id
          : ""
        : ""
    },
    {
      url1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].image[0]
          : ""
        : "",
      price1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].price + "đ"
          : ""
        : "",
      title1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].name
          : ""
        : "",
      id1: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[4].id
          : ""
        : "",
      url2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].image[0]
          : ""
        : "",
      price2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].price + "đ"
          : ""
        : "",
      title2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].name
          : ""
        : "",
      id2: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[5].id
          : ""
        : "",
      url3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].image[0]
          : ""
        : "",
      price3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].price + "đ"
          : ""
        : "",
      title3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].name
          : ""
        : "",
      id3: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[6].id
          : ""
        : "",
      url4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].image[0]
          : ""
        : "",
      price4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].price + "đ"
          : ""
        : "",
      title4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].name
          : ""
        : "",
      id4: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[7].id
          : ""
        : "",
        url5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].image[0]
          : ""
        : "",
      price5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].price + "đ"
          : ""
        : "",
      title5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].name
          : ""
        : "",
      id5: arrSlideImage
        ? arrSlideImage.length > 0
          ? arrSlideImage[9].id
          : ""
        : ""
    },
  ];
  const OnAddProduct=(id)=>{
    window.localStorage.setItem("idProduct", JSON.stringify(id));
    parentCallBack(id)
  }
  return (
    <div className={styles.slide1}>
      <div className="slide-container">
        <Slide>
          {slideImage.map((slideImage, index) => (
            <div className="each-slide" style={{ width: 1200 }} key={index}>
              {slideImage.url1&&<div style={{ marginLeft: 72, display: "flex" }}>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url1} alt="slide1" />
                  <p>{converseStr(slideImage.title1)}</p>
                  <span>{FORMAT_PRICE(parseInt(slideImage.price1))}đ</span>
                  <div>
                    {slideImage.id1 && (
                      <Button
                        as={Link}
                        to={`/Cart/${slideImage.id1}`}
                        className={styles.slideimage1Hover}
                        onClick={()=>OnAddProduct(slideImage.id1)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url2} alt="slide1" />
                  <p>{converseStr(slideImage.title2)}</p>
                  <span>{FORMAT_PRICE(parseInt(slideImage.price2))}đ</span>
                  <div>
                    {slideImage.id2 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id2}`}
                        onClick={()=>OnAddProduct(slideImage.id2)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url3} alt="slide1" />
                  <p>{converseStr(slideImage.title3)}</p>
                  <span>{FORMAT_PRICE(parseInt(slideImage.price3))}đ</span>
                  <div>
                    {slideImage.id3 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id3}`}
                        onClick={()=>OnAddProduct(slideImage.id3)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url4} alt="slide1" />
                  <p>{converseStr(slideImage.title4)}</p>
                  <span>{FORMAT_PRICE(parseInt(slideImage.price4))}đ</span>
                  <div>
                    {slideImage.id4 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id4}`}
                        onClick={()=>OnAddProduct(slideImage.id4)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.slideimage1}>
                  <img src={slideImage.url5} alt="slide1" />
                  <p>{converseStr(slideImage.title5)}</p>
                  <span>{FORMAT_PRICE(parseInt(slideImage.price5))}đ</span>
                  <div>
                    {slideImage.id5 && (
                      <Button
                        className={styles.slideimage1Hover}
                        as={Link}
                        to={`/Cart/${slideImage.id5}`}
                        onClick={()=>OnAddProduct(slideImage.id5)}
                      >
                        XEM SẢN PHẨM
                      </Button>
                    )}
                  </div>
                </div>
              </div>}
              {!slideImage.url1&&<Spinner>Đang load ...</Spinner>}
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default SlideImage;
