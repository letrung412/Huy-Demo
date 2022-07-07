import React from "react";
import { useState,useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import clsx from "clsx";
import Axios from 'axios';
function ModalUpdate(props) {
  const { isOpen, data, parentCallBack, cancelUpdate,files } = props;
  const [dataUpdate, setDataUpdate] = useState([]);
  const [file, setFile] = useState([]);
  const OnChange = (value, index) => {
    setDataUpdate([...data, (data[index].value = value)]);
  };
  useEffect(()=>{
    if(files){
      setFile(files)
    }
  },[files])
  const OnChangeFile =(event,index)=>{
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "ml_default");
    Axios.post("https://api.cloudinary.com/v1_1/dcjhqx2lq/image/upload", formData)
      .then((res) =>{
        setFile([...file,res.data.url])
        setDataUpdate([...data,data[index].value=[...file,res.data.url]])
      })
      .catch((err) => console.error(err));
  }
  const OnUpdateData = async () => {
    parentCallBack(dataUpdate);
    await setDataUpdate([]);
  };
    
  const handleDeleteFile=(index)=>{
  setFile(file.filter((el,index2)=>index2!==index))
  setDataUpdate([...data,data[data.length-1].value=file.filter((el,index2)=>index2!==index)])
  }
  return (
    <div>
      <Modal size='lg' isOpen={!!isOpen} className="modalUpdate" style={{marginTop:140}}>
        <ModalHeader>Chỉnh sửa thông tin</ModalHeader>
        <ModalBody className="modalBody display-flex">
          <span className="noti display mb-10 fontsz-14">
            Nhập dữ liệu ít nhất 3 ký tự
          </span>
          {data.map((el, index) => {
            return (
              <div key={index} className="internUpdate">
                <strong className="display">
                  {el.placeHolder} <span>*</span>
                </strong>
                {!el.option && !el.file && (
                  <input
                    disabled={el.disabled}
                    className={el.class}
                    type="text"
                    value={el.value}
                    onChange={(e) => OnChange(e.target.value, index)}
                    placeholder={el.placeHolder}
                  />
                )}
                {el.option && (
                  <Select
                    value={el.value}
                    name="skill"
                    options={el.option}
                    placeholder="Chọn giới tính"
                    onChange={(e) => OnChange(e, index)}
                    className={clsx(
                      "basic-multi-select select-multi",
                      el.class
                    )}
                    classNamePrefix="select"
                  />
                )}
                {el.file && (
                  <div className="upload">
                    <label className="custom-file-upload">
                    <input
                      type="file"
                      className={el.class}
                      onChange={(e) => OnChangeFile(e, index)}
                      multiple
                    ></input>
                   <span>Đính kèm</span>
                  </label>
                  {file.length>0&& <div className="allFile">
                    {file.map((el,index)=>{
                    return(
                     <div key={index} className="file">
                        <span className="fileName" >{el.split("dcjhqx2lq/")[1]||el}</span>
                        <span className="click" onClick={()=>handleDeleteFile(index)}>x</span>
                     </div>
                    )
                    })}
                  </div>}
                  </div>
                )}
                <p className="fontsz-12">{el.valid}</p>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button style={{backgroundColor:"rgb(0, 30, 60)"}} onClick={() => OnUpdateData()}>{isOpen}</Button>
          <Button color="danger" onClick={() => cancelUpdate()}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalUpdate;
