import styles from "./home.module.scss";
import { useEffect } from "react";
import CarouselSlide from "./CarouselSlide";
import BasicTabs from "./Tabs";
import AccessoryHome from "./AccessoryHome";
import SaleOff from "./SaleOff";
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.home}>
      <CarouselSlide />
      <BasicTabs />
      <AccessoryHome />
      <SaleOff />
    </div>
  );
}
export default Home;
