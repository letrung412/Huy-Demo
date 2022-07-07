"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewOrderAPI = void 0;
const express = require("express");
const http_1 = require("../lib/http");
const order_1 = require("./order");
const product_1 = require("../product/product");
function NewOrderAPI(bll) {
    const status_type = Object.values(order_1.OrderNS.OrderStatus);
    const gender = Object.values(product_1.ProductNS.Gender);
    const router = express.Router();
    const REPORT_QUERY = Object.values(order_1.OrderNS.QueryReport);
    router.get("/order/list", async (req, res) => {
        const query = {};
        if (req.query.status) {
            query.status = http_1.HttpParamValidators.MustBeOneOf(req.query, "status", status_type);
        }
        if (req.query.customer_id) {
            query.customer_id = http_1.HttpParamValidators.MustBeString(req.query, "customer_id", 8);
        }
        const orders = await bll.ListOrder(query);
        return res.json(orders);
    });
    router.get("/order/get", async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 12);
        const order = await bll.GetViewOrder(id);
        res.json(order);
    });
    router.get("/order/filter", async (req, res) => {
        const query = {
            status: http_1.HttpParamValidators.MustBeOneOf(req.query, "status", status_type)
        };
        if (req.query.gender) {
            query.gender = http_1.HttpParamValidators.MustBeOneOf(req.query, "gender", gender);
        }
        if (req.query.from) {
            query.from = +http_1.HttpParamValidators.MustBeString(req.query, "from");
        }
        if (req.query.to) {
            query.to = +http_1.HttpParamValidators.MustBeString(req.query, "to");
        }
        const orders = await bll.FilterOrder(query);
        res.json(orders);
    });
    router.post("/order/create", async (req, res) => {
        const params = {
            customer_id: http_1.HttpParamValidators.MustBeString(req.body, "customer_id", 8),
            itemParams: {
                product_id: http_1.HttpParamValidators.MustBeString(req.body.itemParams, "product_id", 8),
                amount: http_1.HttpParamValidators.MustBeNumber(req.body.itemParams, "amount"),
            },
        };
        const order = await bll.CreateOrder(params);
        res.json(order);
    });
    router.post("/order/update", async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const params = {
            status: http_1.HttpParamValidators.MustBeOneOf(req.body, "status", status_type),
        };
        if (req.body.info) {
            params.info = {
                name: http_1.HttpParamValidators.MustBeString(req.body.info, "name", 2),
                phone: http_1.HttpParamValidators.CheckPhone(req.body.info, 'phone', 10),
                address: http_1.HttpParamValidators.MustBeString(req.body.info, "address", 2)
            };
        }
        if (req.body.itemParams) {
            params.itemParams = {
                amount: http_1.HttpParamValidators.MustBeNumber(req.body.itemParams, "amount"),
            };
        }
        const order = await bll.UpdateOrder(id, params);
        res.json(order);
    });
    router.get('/order/report', async (req, res) => {
        const query = http_1.HttpParamValidators.MustBeOneOf(req.query, "interval", REPORT_QUERY);
        const orders = await bll.OrderByReport(query);
        res.json(orders);
    });
    return router;
}
exports.NewOrderAPI = NewOrderAPI;
//# sourceMappingURL=order.api.js.map