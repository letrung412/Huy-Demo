import styles from "../home/home.module.scss";
import "react-slideshow-image/dist/styles.css";
import * as React from "react";
import { useEffect,useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Order from "./Order";
import Service from "../../../api/shopService";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabOrder() {
  const [value, setValue] = React.useState(0);
 const [listOrderDone,setListOrderDone]=useState([])
 const [listOrderCancel,setListOrderCancel]=useState([])
 const [listOrderAwait,setListOrderAwait]=useState([])
 const id = JSON.parse(window.localStorage.getItem("id"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    Service.getOrderDone2(id).then(res=>{
      setListOrderDone(res.data)
    })
    Service.getOrderCancel(id).then(res=>{
      setListOrderCancel(res.data)
    })
    Service.getOrderAwait(id).then(res=>{
      setListOrderAwait(res.data)
    })
  }, [id]);
  return (
    <Box style={{marginTop:150}} className={styles.BasicTabs} sx={{ width: "100%" }}>
      <Box
        className={styles.box} style={{paddingLeft:0}}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab className={styles.tab} style={{padding:0}}label="SẢN PHẨM ĐÃ MUA" {...a11yProps(0)} />
          <Tab
            className={styles.tab}
            label="SẢN PHẨM ĐANG CHỜ XỬ LÝ"
            {...a11yProps(1)}
            style={{padding:0,margin:"0 50px"}}
          />
          <Tab
            label="SẢN PHẨM ĐÃ HỦY"
            className={styles.tab}
            {...a11yProps(2)}
            style={{padding:0}}
          />
        </Tabs>
      </Box>
      <TabPanel className={styles.tabPanel} value={value} index={0}>
      <Order arrOrder={listOrderDone}/>
      </TabPanel>
      <TabPanel className={styles.tabPanel} value={value} index={1}>
      <Order arrOrder={listOrderAwait}  button={"hủy"} />
      </TabPanel>
      <TabPanel className={styles.tabPanel} value={value} index={2}>
      <Order arrOrder={listOrderCancel}/>
      </TabPanel>
    </Box>
  );
}
