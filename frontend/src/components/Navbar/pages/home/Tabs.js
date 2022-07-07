import styles from "./home.module.scss";
import "react-slideshow-image/dist/styles.css";
import * as React from "react";
import { useEffect,useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Slide4Image from "./Slide4Image";
import Service from '../../../api/shopService'
import {a11yProps,TabPanel} from '../../../../global/const'
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [arrProductSelling,setArrProductSelling]=useState([])
  const [arrProductNew,setArrProductNew]=useState([])
  const [arrProductPopular,setArrProductPopular]=useState([])
  useEffect(() => {
    Service.getListProduct().then((res)=>{
     setArrProductNew(res.data.slice(res.data.length-8))
     setArrProductSelling(res.data.sort((a,b)=>b.consume-a.consume).slice(0,8))
     setArrProductPopular(res.data.sort(() => Math.random() - 0.5).slice(0,8))
    })
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.BasicTabs} sx={{ width: "100%" }}>
      <Box
        className={styles.box}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab className={styles.tab} label="SẢN PHẨM MỚI" {...a11yProps(0)} />
          <Tab
            className={styles.tab}
            label="SẢN PHẨM BÁN CHẠY"
            {...a11yProps(1)}
          />
          <Tab
            label="SẢN PHẨM PHỔ BIẾN"
            className={styles.tab2}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel className={styles.tabPanel} value={value} index={0}>
        <Slide4Image  slideImage={arrProductNew} />
      </TabPanel>
      <TabPanel className={styles.tabPanel} value={value} index={1}>
        <Slide4Image slideImage={arrProductSelling} />
      </TabPanel>
      <TabPanel className={styles.tabPanel} value={value} index={2}>
        <Slide4Image slideImage={arrProductPopular} />
      </TabPanel>
    </Box>
  );
}
