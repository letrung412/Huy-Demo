import styles from "./home.module.scss";
import { useEffect, useState, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Spinner } from "react-bootstrap";
import imageUser from "../../../../assets/images/home/user.png";
import GetRating from "./GetRating";
import Service from "../../../api/shopService";
import ModalNoti from './../ModalNoti/ModalNoti';
import { GENDER } from './../../../../global/const';
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
        <Box sx={{ p: 2 }}>
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

export default function TabsEvaluate(props) {
  const {inforProduct}=props
  const [value, setValue] = useState(0);
  const [valueRate, setValueRate] = useState(0);
  const [valueInput, setValueInput] = useState("");
  const id = window.location.href.split("Cart/")[1];
  const [comments,setComment]=useState([])
  const idUser = JSON.parse(window.localStorage.getItem("id"));
  const [message,setMessage]=useState("")
  const inputRef = useRef();
  const handleSend = () => {
if(idUser!==0){
  if (valueInput.trim().length !== 0) {
    Service.getCustomer(idUser).then((res)=>{
      Service.createComment({
        product_id:inforProduct.id,
        customer_id:idUser,
        comment:valueInput,
        rate:valueRate,
        username:res.data.username
      }).then(()=>{
        Service.getComment(inforProduct.id).then((res)=>{
          setComment(res.data)
        })
      })
      
    })
    inputRef.current.focus();
    setValueInput("");
    setValueRate(0);
  }
}else{
  setMessage("Xin vui lòng đăng nhập")
}  };
  useEffect(() => {
    Service.getComment(id).then((res)=>{
      setComment(res.data)
    })
  }, [id]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <Box className={styles.box2} sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            className={styles.tab2}
            label="Thông tin bổ sung"
            {...a11yProps(0)}
          />
          <Tab
            className={styles.tab2}
            label="ĐÁNH GIÁ SẢN PHẨM"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel className={styles.tabPanel2} value={value} index={0}>
        <div>
          <strong>CHẤT LIỆU</strong>
          <span>{inforProduct.material}</span>
        </div>
        <div>
          <strong>GIỚI TÍNH</strong>
          <span style={{ paddingLeft: 520 }}>{inforProduct.gender===GENDER[0].value?"Nam":inforProduct.gender===GENDER[1].value?"Nữ":"Trẻ em"}</span>
        </div>
        <div>
          <strong>MÀU SẮC</strong>
          <span style={{ paddingLeft: 520 }}>{inforProduct.color}</span>
        </div>
      </TabPanel>
      <TabPanel className={styles.tabPanel3} value={value} index={1}>
        <strong>NHẬP ĐÁNH GIÁ</strong>
        <div className={styles.Input}>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={valueRate}
              onChange={(event, newValue) => {
                setValueRate(newValue);
              }}
            />
          </Box>
          <div>
            <img src={imageUser} alt="" />
            <input
              placeholder="Nhập đánh giá"
              value={valueInput}
              ref={inputRef}
              onChange={(e) => setValueInput(e.target.value)}
            />
            <Button variant="contained" onClick={handleSend}>
              GỬI
            </Button>
          </div>
        </div>

        {!comments && (
          <div>
            <Spinner animation="border" />
          </div>
        )}
        {comments && (
          <div>
            <strong>ĐÁNH GIÁ ({comments.length})</strong>
            {comments.length === 0 && (
              <div> Chưa có đánh giá nào.</div>
            )}
            {comments.length !== 0 && (
              <div className={styles.comments}>
                {comments.map((el, index) => (
                  <div className={styles.evaluate} key={index}>
                    {" "}
                    <img src={imageUser} alt="" />
                    <div>
                      <strong>{el.username}</strong>
                      <GetRating value={el.rate} />
                      <p>{el.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </TabPanel>
    </Box>
    <ModalNoti message={message} done={()=>setMessage("")}/>
    </>
  );
}
