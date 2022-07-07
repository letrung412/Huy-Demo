import React from "react";
import Select from "react-select";
import { DataTable } from "../../table/Table";
import styles from "../products/products.module.scss";
import Slider from "@mui/material/Slider";
import { Label } from "reactstrap";
import "react-slideshow-image/dist/styles.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Service from "../../../../api/shopService";
import {
  converseStr,
  FORMAT_PRICE,
  TabPanel,
  a11yProps,
  minDistance,
  options,headerOrder,dataBodyOrder, strTrim
} from "./../../../../../global/const";
import ModalView from "../../ModalView/ModalView";
import ModalConfirm from "./../../ModalConfirm/ModalConfirm";
function Orders() {
  const [body, setBody] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [bodyAwait, setBodyAwait] = useState([]);
  const [listOrderAwait, setListOrderAwait] = useState([]);
  const [message, setMessage] = useState("");
  const [messageConfirm, setMessageConfirm] = useState("");
  const [dataUpdate, setDataUpdate] = useState({});
  const [value, setValue] = useState([0, 80]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [id, setId] = useState(0);
  const [valueTab, setValueTab] = useState(0);
  const [pattern,setPattern]=useState("")
  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (selectedOption.value.length === 0) {
      const arrList = listOrder.filter((el) => {
        return (
          el.total >= newValue[0] * 20000 && el.total <= newValue[1] * 20000
        );
      });
      setBody(
        arrList.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
      const arrListAwait = listOrderAwait.filter((el) => {
        return (
          el.total >= newValue[0] * 20000 && el.total <= newValue[1] * 20000
        );
      });
      setBodyAwait(
        arrListAwait.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
    } else {
      const arrList = listOrder.filter((el) => {
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= newValue[0] * 20000 &&
          el.total <= newValue[1] * 20000
        );
      });
      setBody(
        arrList.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
      const arrListAwait = listOrderAwait.filter((el) => {
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= newValue[0] * 20000 &&
          el.total <= newValue[1] * 20000
        );
      });
      setBody(
        arrListAwait.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  useEffect(() => {
    const arr = listOrder.filter((el) => {
      if (selectedOption.value.trim().length > 0) {
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= value[0] * 20000 &&
          el.total <= value[1] * 20000
        );
      }
      return el.total >= value[0] * 20000 && el.total <= value[1] * 20000;
    });
    setBody(
      arr.reverse().map((el, index) => {
        return dataBodyOrder(el, index);
      })
    );
    const arrAwait = listOrderAwait.filter((el) => {
      if (selectedOption.value.trim().length > 0) {
        return (
          el.items[0].product.gender === selectedOption.value &&
          el.total >= value[0] * 20000 &&
          el.total <= value[1] * 20000
        );
      }
      return el.total >= value[0] * 20000 && el.total <= value[1] * 20000;
    });
    setBodyAwait(
      arrAwait.reverse().map((el, index) => {
        return dataBodyOrder(el, index);
      })
    );
  }, [selectedOption]);

  useEffect(() => {
    Service.getOrderDone().then((res) => {
      setListOrder(res.data);
      setBody(
        res.data.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
    });
    Service.getListOrderAwait().then((res) => {
      setListOrderAwait(res.data);
      setBodyAwait(
        res.data.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
    });
  }, []);
  const View = (id) => {
    setMessage("View");
    Service.getOrderView(id).then((res) => {
      setDataUpdate(res.data);
    });
  };
  const Complete = (id) => {
    setMessageConfirm("Đơn hàng này đã thanh toán thành công?");
    setId(id);
  };
  const Answer = (choice) => {
    if (choice) {
      Service.updateOrder(id, { status: "done" }).then(() => {
        window.location.reload();
      });
    } else {
      setMessageConfirm("");
    }
  };
  const OnChangePattern=(e)=>{
    setPattern(e)
    if(strTrim(e)!==0){
      const result = listOrder.find((el)=>el.code===e)
      const resultAwait = listOrderAwait.find((el)=>el.code===e)
      if(result){
        setBody(
          [result].map((el, index) => {
            return dataBodyOrder(el, index);
          })
        );
      }else if(resultAwait){
        setBodyAwait(
          [resultAwait].map((el, index) => {
            return dataBodyOrder(el, index);
          })
        );
      }else{
        setBody([])
        setBodyAwait([])
      }
      
    }else{
      setBodyAwait(
        listOrderAwait.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
      setBody(
        listOrder.reverse().map((el, index) => {
          return dataBodyOrder(el, index);
        })
      );
    }
  }
  return (
    <div className={styles.products}>
      <div className={styles.title}>
        <h4>DANH SÁCH ĐƠN HÀNG</h4>
        <div className={styles.orderList}>
          <div className={styles.searchPrice}>
            <p>Lọc theo giá</p>
            <Box sx={{ width: 200 }}>
              <div className={styles.valuePrice}>
                <strong>{FORMAT_PRICE(value[0] * 20000)}</strong>
                <strong>{FORMAT_PRICE(value[1] * 20000)}</strong>
              </div>
              <Slider
                getAriaLabel={() => "Minimum distance shift"}
                value={value}
                onChange={handleChange}
                disableSwap
              />
            </Box>
          </div>
          <div>
          <Label>Tìm kiếm theo mã đơn hàng</Label>
          <input
            className="mt-10 ml-30"
            type="text"
            value={pattern}
            onChange={(e)=>OnChangePattern(e.target.value)}
            placeholder="Tìm mã đơn hàng"
          />
        </div>
          <div className=" mb-10 flex">
            <Label className={styles.labelSelect}>Chọn theo sản phẩm</Label>
            <Select
              className={styles.select}
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%" }} style={{ paddingLeft: 0 }}>
        <Box
          style={{ paddingLeft: 0 }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={valueTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab
              style={{ padding: 0, fontWeight: 700 }}
              label="ĐƠN HÀNG ĐÃ MUA"
              {...a11yProps(0)}
            />
            <Tab
              label="ĐƠN HÀNG ĐANG CHỜ XỬ LÝ"
              {...a11yProps(1)}
              style={{ padding: 0, margin: "0 50px", fontWeight: 700 }}
            />
          </Tabs>
        </Box>
        <TabPanel style={{ paddingLeft: 0 }} value={valueTab} index={0}>
          <DataTable
            buttonView={"Xem"}
            headers={headerOrder}
            body={body}
            parentCallBackUpdate={View}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <DataTable
            buttonView={"Xem"}
            buttonDelete={"Hoàn thành"}
            headers={headerOrder}
            body={bodyAwait}
            parentCallBackUpdate={View}
            parentCallBack={Complete}
          />
        </TabPanel>
      </Box>
      <ModalView
        isOpen={message}
        data={dataUpdate}
        parentCallBack={() => setMessage("")}
      />
      <ModalConfirm message={messageConfirm} answer={Answer} />
    </div>
  );
}

export default Orders;
