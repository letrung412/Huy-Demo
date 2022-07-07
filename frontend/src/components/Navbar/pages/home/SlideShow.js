import React from "react";
import { Zoom } from "react-slideshow-image";
import styles from "./home.module.scss";
function Slideshow(props) {
  const arrImage =props.evaluate.image
  let images = [];
  if(arrImage){
    if(arrImage[0]){
      images.push(arrImage[0]);
    }
    if(arrImage[1]){
      images.push(arrImage[1]);
    }
    if(arrImage[2]){
      images.push(arrImage[2]);
    }
    if(arrImage[3]){
      images.push(arrImage[3]);
    }
  }
  const zoomOutProperties = {
    scale: 0.4,
    indicators: (i) => (
      <div className={styles.indicator}>{<img src={images[i]} alt="" />}</div>
    ),
    transitionDuration: 1000,
  };
  return (
  <div>
    {images.length>1 &&(
      <div>
      <Zoom {...zoomOutProperties} className={styles.slideshow}>
        {images.map((each, index) => (
          <img
            key={index}
            className={styles.slideshowImage}
            alt=""
            src={each}
          />
        ))}
      </Zoom>
    </div>
    )}
    {images.length===1&&(
      <div>
      <img className={styles.slideshowImage} style={{marginTop:60}} alt="" src={images[0]} /> 
      </div>
    )}
  </div>
  );
}

export default Slideshow;
