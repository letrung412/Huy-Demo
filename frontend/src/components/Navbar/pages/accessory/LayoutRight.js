import styles from "./accessory.module.scss";
import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import Service from "../../../api/shopService";
import { converseStr, FORMAT_PRICE,SORT ,strTrim} from "../../../../global/const";

function LayoutRight() {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [arrImage, setArrImage] = useState([]);
  const [arrImageList, setArrImageList] = useState([]);
  const pathname = window.location.pathname;
  const search = JSON.parse(window.localStorage.getItem("search"))
  let arrPage = [];
  useEffect(() => {
    if (pathname.split("/")[1] === "search") {
      Service.searchProduct(search).then((res)=>{
        setArrImageList(res.data);
        setArrImage(res.data.slice((page - 1) * 15, page * 15));
      })
    }else{
      Service.getListProduct().then((res) => {
        const list = res.data.filter((el) => {
          if (pathname.split("/")[1] === "store") {
            return el;
          }
            return el.gender === pathname.split("/")[1];
        });
        setArrImageList(list);
        setArrImage(list.slice((page - 1) * 15, page * 15));
      });
    }
  }, [page, pathname,search]);
  useEffect(()=>{
setPage(1)
// window.localStorage.setItem("search", JSON.stringify(""))
  },[pathname])
  for (let i = 1; i <= numPage; i++) {
    arrPage.push({ id: i });
  }
  const handleApart = () => {
    setPage((page) => {
      if (page === 1) {
        return page;
      }
      return page - 1;
    });
  };
  const handleAdd = () => {
    setPage((page) => {
      if (page === numPage) {
        return page;
      }
      return page + 1;
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    setNumPage(Math.ceil(arrImageList.length / 15));
  }, [arrImageList]);
  const OnAddProduct = (id) => {
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  };

  const onChangeValue = (e) => {
    if(parseInt(e)===SORT[0].value){
      const a=[...arrImage].sort((a,b)=>a.ctime-b.ctime)
      setArrImage(a)
    }else if(parseInt(e)===SORT[1].value){
      const b=[...arrImage].sort((a,b)=>a.price-b.price)
      setArrImage(b)
    }else if(parseInt(e)===SORT[2].value){
      const c =[...arrImage].sort((a,b)=>b.price-a.price)
      setArrImage(c)
    }else{
      setArrImage([...arrImage])
    }
  };
  return (
    <div className={styles.accessoryRight}>
      <div className={styles.accessoryRightSelect}>
        {numPage === 1 && <p>Hiện thị một kết quả duy nhất</p>}
        {numPage > 1 && <p>Hiện thị kết quả trang số {page}</p>}
        <Form.Select
          className={styles.accessoryRightSelectButton}
          aria-label="Default select example"
          onChange={(e) => onChangeValue(e.target.value)}
        >
          <option value="0">Mới nhất</option>
          <option value="1">Thứ tự theo giá:thấp đến cao</option>
          <option value="2">Thứ tự theo giá:cao xuống thấp</option>
        </Form.Select>
      </div>
      <div className={styles.accessoryRightLayout}>
        {arrImage.length!==0&&arrImage.map((el, index) => (
          <div key={index}>
            <img src={el.image[0]} alt="" />
            <p>{converseStr(el.name)}</p>
            <strong>{FORMAT_PRICE(el.price)}đ</strong>
            <Nav.Link
              className={styles.Button}
              as={Link}
              to={`/Cart/${el.id}`}
              onClick={() => OnAddProduct(el.id)}
            >
              XEM SẢN PHẨM
            </Nav.Link>
          </div>
        ))}
        {arrImage.length===0&&<p style={{marginLeft:400}}>Không tìm thấy kết quả</p>}
      </div>
      {numPage > 1 && (
        <div className={styles.pagination}>
          <div onClick={() => handleApart()}>
            <AiOutlineLeft />
          </div>
          {arrPage.map((el, index) => (
            <p
              key={index}
              style={{
                backgroundColor: page === index + 1 ? "red" : "",
                color: page === index + 1 ? "white" : "",
                borderColor: page === index + 1 ? "red" : "",
              }}
              onClick={() => setPage(el.id)}
            >
              {el.id}
            </p>
          ))}
          <div onClick={() => handleAdd()}>
            <AiOutlineRight />
          </div>
        </div>
      )}
    </div>
  );
}

export default LayoutRight;
