import React from "react";
import Box from "@mui/material/Box";
import Fuse from "fuse.js";
import Select from "react-select";
import styles from "./products.module.scss";
import { Label } from "reactstrap";
import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import { DataTable } from "../../table/Table";
import {
  checkInterger,
  FORMAT_PRICE,
  strTrim,
  minDistance,
  headerProduct,
  options,
  updateProduct,
  dataProduct,
  removeVietnameseTones,
} from "../../../../../global/const";
import ModalConfirm from "./../../ModalConfirm/ModalConfirm";
import ModalNoti from "./../../ModalNoti/ModalNoti";
import ModalUpdate from "./../../ModalUpdate/ModalUpdate";
import Service from "../../../../api/shopService";
function Products() {
  const [body, setBody] = useState([]);
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [messageAdd, setMessageAdd] = useState("");
  const [messageNoti, setMessageNoti] = useState("");
  const [messageConfirm, setMessageConfirm] = useState("");
  const [idProduct, setIdProduct] = useState(0);
  const [file, setFile] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [idDelete, setIdDelete] = useState(0);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [pattern, setPattern] = useState("");
  const [value, setValue] = useState([0, 50]);
  const [listSearch, setListSearch] = useState([]);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (selectedOption.value.length === 0) {
      const arrList = (listSearch.length === 0 ? list : listSearch).filter(
        (el) => {
          return (
            el.price >= newValue[0] * 20000 && el.price <= newValue[1] * 20000
          );
        }
      );
      setBody(
        arrList.reverse().map((el, index) => {
          return dataProduct(el, index);
        })
      );
    } else {
      const arrList = (listSearch.length === 0 ? list : listSearch).filter(
        (el) => {
          return (
            el.gender === selectedOption.value &&
            el.price >= newValue[0] * 20000 &&
            el.price <= newValue[1] * 20000
          );
        }
      );
      setBody(
        arrList.reverse().map((el, index) => {
          return dataProduct(el, index);
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
    Service.getListProduct().then((res) => {
      setList(res.data);
      setBody(
        res.data.reverse().map((el, index) => {
          return dataProduct(el, index);
        })
      );
    });
  }, [messageNoti]);

  const OnChangeValue = (e) => {
    setPattern(e);
    if (strTrim(selectedOption.value) === 0) {
      const result = list.filter((item) => {
        return (
          removeVietnameseTones(item.name)
            .toUpperCase()
            .includes(removeVietnameseTones(e).toUpperCase()) &&
          item.price >= value[0] * 20000 &&
          item.price <= value[1] * 20000
        );
      });
      setListSearch(result);
      setBody(
        result.reverse().map((el, index) => {
          return dataProduct(el, index);
        })
      );
    } else {
      const result = list.filter((item) => {
        return (
          removeVietnameseTones(item.name)
            .toUpperCase()
            .includes(removeVietnameseTones(e).toUpperCase()) &&
          item.price >= value[0] * 20000 &&
          item.price <= value[1] * 20000 &&
          item.gender === selectedOption.value
        );
      });
      setListSearch(result);
      setBody(
        result.reverse().map((el, index) => {
          return dataProduct(el, index);
        })
      );
    }
  };

  useEffect(() => {
    const arr = (listSearch.length === 0 ? list : listSearch).filter((el) => {
      if (strTrim(selectedOption.value) > 0) {
        return (
          el.gender === selectedOption.value &&
          el.price >= value[0] * 20000 &&
          el.price <= value[1] * 20000
        );
      }
      return el.price >= value[0] * 20000 && el.price <= value[1] * 20000;
    });
    setBody(
      arr.reverse().map((el, index) => {
        return dataProduct(el, index);
      })
    );
  }, [selectedOption]);

  const Update = (id) => {
    setMessage("S???a");
    setIdProduct(id);
    Service.getProduct(id).then((res) => {
      setFile(res.data.image);
      setDataUpdate(updateProduct(res.data));
    });
  };

  const HandleNoti = () => {
    if (messageNoti === "S???a th??ng tin th??nh c??ng") {
      setMessageNoti("");
      setMessage("");
      window.location.reload()
    } else if (messageNoti === "X??a th??ng tin th??nh c??ng") {
      setMessageNoti("");
      setMessageConfirm("");
      window.location.reload()
    } else if (messageNoti === "Th??m s???n ph???m th??nh c??ng") {
      setMessageNoti("");
      setMessageAdd("");
      window.location.reload()
    } else {
      setMessageNoti("");
    }
  };
  const UpdateData = (data) => {
    if (data.length !== 0) {
      const [
        name,
        origin_price,
        price,
        amount,
        material,
        color,
        gender,
        image,
      ] = data.map((d) => d.value);
      if (
        name
          ? name.trim().length > 2
          : "" &&
            material.trim().length > 2 &&
            color.value.trim().length > 2 &&
            checkInterger(`${origin_price}`) &&
            checkInterger(`${price}`) &&
            checkInterger(`${amount}`)
      ) {
        Service.updateProduct(idProduct, {
          name,
          origin_price: parseInt(origin_price),
          gender: gender.value,
          image,
          price: parseInt(price),
          material,
          color,
          amount: parseInt(amount),
        }).then(() => {
          setMessageNoti("S???a th??ng tin th??nh c??ng");
         
        });
      } else {
        setMessageNoti("Vui l??ng nh???p ????ng th??ng tin");
      }
    } else {
      setMessageNoti("S???a th??ng tin th??nh c??ng");
    }
  };
  const Delete = (id) => {
    setMessageConfirm("B???n c?? ch???c mu???n x??a s???n ph???m?");
    setIdDelete(id);
  };
  const answerConfirm = (confirm) => {
    if (confirm) {
      Service.deleteProduct(idDelete).then((res) => {
        setMessageNoti("X??a th??ng tin th??nh c??ng");
      });
    } else {
      setMessageConfirm("");
    }
  };

  const AddProduct = () => {
    setMessageAdd("Th??m");
    setDataUpdate(updateProduct([]));
  };
  const CreateData = (data) => {
    if (data.length > 0) {
      const [
        name,
        origin_price,
        price,
        amount,
        material,
        color,
        gender,
        image,
      ] = data.map((d) => d.value);

      const check =
        strTrim(name) > 2 &&
        strTrim(material) > 2 &&
        strTrim(color) > 1 &&
        checkInterger(origin_price) &&
        checkInterger(price) &&
        checkInterger(amount) &&
        strTrim(origin_price) > 3 &&
        strTrim(price) > 3 &&
        strTrim(amount) > 0 &&
        image.length > 0;
      if (check) {
        const product = {
          name: name,
          material: material,
          image: image,
          color: color,
          amount: parseInt(amount),
          origin_price: parseInt(origin_price),
          price: parseInt(price),
          gender: gender.value,
        };
        Service.createProduct(product).then(() => {
          setMessageNoti("Th??m s???n ph???m th??nh c??ng");
        });
      } else {
        setMessageNoti("Vui l??ng nh???p ?????y ????? th??ng tin");
      }
    } else {
      setMessageNoti("Vui l??ng nh???p ?????y ????? th??ng tin");
    }
  };

  return (
    <div className={styles.products}>
      <h4>DANH S??CH S???N PH???M</h4>
      <div className={styles.internForm}>
        <div>
          <Label>T??m ki???m theo t??n</Label>
          <input
            className="mb-20 mr-30"
            value={pattern}
            onChange={(e) => OnChangeValue(e.target.value)}
            type="text"
            placeholder="Nh???p t??n s???n ph???m"
          />
        </div>
        <div className=" mb-10 flex">
          <Label className={styles.labelSelect}>T??m theo gi???i t??nh</Label>
          <Select
            className={styles.select}
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className={styles.searchPrice}>
          <p>L???c theo gi??</p>
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
        <button className="btn" onClick={() => AddProduct()}>
          <i className="fa fa-plus" aria-hidden="true"></i>
          Th??m
        </button>
      </div>
      <DataTable
        headers={headerProduct}
        body={body}
        buttonDelete={"X??a"}
        buttonUpdate={"S???a"}
        parentCallBackUpdate={Update}
        parentCallBack={Delete}
      />
      <ModalUpdate
        isOpen={message}
        data={dataUpdate}
        cancelUpdate={() => setMessage("")}
        parentCallBack={UpdateData}
        files={file}
      />
      <ModalUpdate
        isOpen={messageAdd}
        data={dataUpdate}
        cancelUpdate={() => setMessageAdd("")}
        parentCallBack={CreateData}
      />
      <ModalNoti message={messageNoti} done={HandleNoti} />
      <ModalNoti message={messageNoti} done={HandleNoti} />
      <ModalConfirm message={messageConfirm} answer={answerConfirm} />
    </div>
  );
}

export default Products;
