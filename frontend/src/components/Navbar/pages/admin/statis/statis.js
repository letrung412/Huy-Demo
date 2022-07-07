import React from 'react'
import reportservice from './shared/report.service'
import { useEffect, useState } from "react";
import { Row, Input, Label, Col } from "reactstrap";
import { LinearProgress } from "@mui/material";
import { BarChart } from './component/barchart';
import './static.scss'
function Statis() {
  const [isLoading,setIsLoading] =useState(true)
  const [option,setOption] = useState("amount")
  const [report,setReport] = useState(null)

  useEffect(() =>{
     reportservice.reportOrder().then(res=>{
       setReport(res.data)
       setIsLoading(false)
     })
  },[])
  const handleReportOption = (ev) => {
    setOption(ev.target.value);
}
  return (
    <div className="static_container">
       <>
            {isLoading ? <>
                <Row>
                    <LinearProgress color="secondary" />
                </Row>
                <Row>
                    <LinearProgress color="success" />
                </Row>
                <Row>
                    <LinearProgress color="inherit" />
                </Row>
                <Row>
                    <LinearProgress color="warning" />
                </Row>
            </> :
                <div>
                    <Row className="label">
                        <Col xs={{size : "2", offset : "2"}}>
                            <Label><b>Thống kê theo:  </b></Label>
                        </Col>
                    </Row>
                    <Row>
                    <Col style={{marginLeft:210}} xs={{size : "2", offset : "2"}}>
                            <Input
                                name="chart_id"
                                onChange={(el) => handleReportOption(el)} 
                                type='select'>
                                <option value='amount'>Số lượng đơn hàng</option>
                                <option value='total'>Doanh thu</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <BarChart data={report} type={option}/> 
                    </Row>
                </div>}
        </>
    </div>
  )
}

export default Statis