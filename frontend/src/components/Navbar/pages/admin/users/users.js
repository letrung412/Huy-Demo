import React from "react";
import { DataTable } from "../../table/Table";
import styles from "../products/products.module.scss";
import { useState, useEffect } from "react";
import Service from "../../../../api/shopService";
import { converseStr, reverseBirthday, ROLE,headerUser} from "../../../../../global/const";
function Users() {
  const [body, setBody] = useState([]);
  useEffect(() => {
    Service.getListCustomer().then((res) => {
      const arrCustomer = res.data.filter((el)=>el.role===ROLE[1].value)
      const arrBody = arrCustomer.map((el, index) => {
        return {
          id: el.id,
          stt: index + 1,
          user: converseStr(el.name),
          cccd: el.cccd,
          phone: el.phone,
          birthday: reverseBirthday(el.birthday),
        };
      });
      setBody(arrBody);
    });
  }, []);
 
  return (
    <div className={styles.products}>
      <div className={styles.title}>
        <h4>DANH SÁCH NGƯỜI DÙNG</h4>
      </div>
      <DataTable noFunctionTable={"không có chức năng"} headers={headerUser} body={body}/>
    </div>
  );
}

export default Users;
