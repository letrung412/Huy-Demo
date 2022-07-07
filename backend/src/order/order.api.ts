import * as express from "express";
import { HttpParamValidators } from "../lib/http";
import { OrderNS } from "./order";
import { ProductNS } from "../product/product";
export function NewOrderAPI(bll: OrderNS.BLL) {
  const status_type = Object.values(OrderNS.OrderStatus);
  const gender=Object.values(ProductNS.Gender)
  const router = express.Router();

  const REPORT_QUERY =Object.values(OrderNS.QueryReport)
  router.get("/order/list", async (req, res) => {
      const query: OrderNS.QueryOrderParams = {}
    if (req.query.status) {
      query.status= HttpParamValidators.MustBeOneOf(
        req.query,
        "status",
        status_type
      );
    }
    if (req.query.customer_id) {
      query.customer_id = HttpParamValidators.MustBeString(
        req.query,
        "customer_id",
        8
      );
    }
    const orders = await bll.ListOrder(query);
    return res.json(orders);
  });

  router.get("/order/get", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 12);
    const order = await bll.GetViewOrder(id);
    res.json(order);
  });

  router.get("/order/filter", async (req, res) => {
     const query: OrderNS.QueryFilterParams={
       status:HttpParamValidators.MustBeOneOf(req.query, "status",status_type)
     }
     if(req.query.gender){
       query.gender = HttpParamValidators.MustBeOneOf(req.query, "gender",gender)
     }
     if(req.query.from){
       query.from = +HttpParamValidators.MustBeString(req.query,"from")
     }
     if(req.query.to){
      query.to = +HttpParamValidators.MustBeString(req.query,"to")
    }
    const orders=await bll.FilterOrder(query);
    res.json(orders);
  })


  router.post("/order/create", async (req, res) => {
    const params: OrderNS.CreateOrderParmas = {
      customer_id: HttpParamValidators.MustBeString(req.body, "customer_id", 8),
      itemParams: {
        product_id: HttpParamValidators.MustBeString(
          req.body.itemParams,
          "product_id",
          8
        ),
        amount: HttpParamValidators.MustBeNumber(req.body.itemParams, "amount"),
      },
    };
    const order = await bll.CreateOrder(params);
    res.json(order);
  });

  router.post("/order/update", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 8);
    const params: OrderNS.UpdateOrderParams = {
      status: HttpParamValidators.MustBeOneOf(req.body, "status", status_type),
    };
    if(req.body.info){
      params.info={
        name:HttpParamValidators.MustBeString(req.body.info,"name",2),
        phone: HttpParamValidators.CheckPhone(req.body.info,'phone',10),
        address: HttpParamValidators.MustBeString(req.body.info, "address",2)
      }
    }
    if (req.body.itemParams) {
      params.itemParams = {
        amount: HttpParamValidators.MustBeNumber(req.body.itemParams, "amount"),
      };
    }
    const order = await bll.UpdateOrder(id, params);
    res.json(order);
  });

  router.get('/order/report',async(req, res) => {
    const query=HttpParamValidators.MustBeOneOf(req.query,"interval",REPORT_QUERY)
    const orders=await bll.OrderByReport(query);
    res.json(orders);
  })
  return router;
}
