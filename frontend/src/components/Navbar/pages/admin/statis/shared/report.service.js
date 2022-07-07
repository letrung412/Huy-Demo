import {Http} from '../../../../../api/http'

const API_ENDPOINT ={
    REPORT_API:"/order/order/report"
}

class ReportService {
    constructor() {
        if (ReportService._instance) {
            return ReportService._instance;
        }
        ReportService._instance = this;
    }

    reportOrder(interval="week"){
        return Http.get(API_ENDPOINT.REPORT_API+`?interval=${interval}`)
    }
}

 const reportservice=new ReportService()
 export default reportservice