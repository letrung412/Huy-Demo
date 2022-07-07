import React from "react";
import "./ModalView.scss";
import {Col,Row} from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FORMAT_PRICE,convertDate} from "../../../../global/const";
function ModalUpdate(props) {
  const { isOpen, data, parentCallBack } = props;
  const cancelView = () => {
    parentCallBack();
  };
  return (
    <div>
      <Modal size='lg' style={{width:1000,marginTop:35}}  isOpen={!!isOpen}>
        <ModalHeader>Thông tin đơn hàng</ModalHeader>
        <ModalBody className="modalView">
          <Row>
            <Col className="modalViewTitle">
              <h6>Người nhận</h6>
              <div className="modalViewTitleContent">
                <strong>Tên người nhận:</strong>
                <p>{data.info?data.info.name:""}</p>
              </div>
              <div className="modalViewTitleContent">
                <strong>Số điện thoại:</strong>
                <p>{data.info?data.info.phone:""}</p>
              </div>
              <div className="modalViewTitleContent">
                <strong>Địa chỉ:</strong>
                <p>{data.info?data.info.address:""}</p>
              </div>
              <div className="modalViewTitleContent">
                <strong>Ngày đặt:</strong>
                <p>{data?convertDate(data.mtime):""}</p>
              </div>
             
            </Col>
            <Col className="modalViewTitle2">
              <h6>Chi tiết sản phẩm</h6>
              <div className="modalViewTitleContent">
                <strong>Tên sản phẩm:</strong>
                <p>{data.items?data.items[0].product.name:""}</p>
              </div>
              <div className="modalViewTitleContent">
                <strong>Màu sắc:</strong>
                <p>{data.items?data.items[0].product.color:""}</p>
              </div>
              <div className="modalViewTitleContent">
                <strong>Đơn giá:</strong>
                <p>{data.items?FORMAT_PRICE(data.items[0].product.price):""}</p>
              </div>
              <div className="modalViewTitleContent">
                <strong>Số lượng:</strong>
                <p>{data.items?data.items[0].amount:""}</p>
              </div>
              <div className="modalViewTitleContent">
                <strong>Tổng tiền:</strong>
                <p>{data.total?FORMAT_PRICE(data.total):""}</p>
              </div>
              <div>
              <img height="200px" width="200px" src={data.items?data.items[0].product.image[0]:""} alt=""/>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => cancelView()}>
            Trở lại
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalUpdate;
