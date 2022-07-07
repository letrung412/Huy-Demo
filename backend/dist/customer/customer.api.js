"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCustomerAPI = void 0;
const http_1 = require("../lib/http");
const express = require("express");
const customer_1 = require("./customer");
function NewCustomerAPI(bll, auth_bll) {
    const router = express.Router();
    const role_type = Object.values(customer_1.CustomerNS.Role);
    router.get('/customer/list', async (req, res) => {
        const customers = await bll.ListCustomer();
        res.json(customers);
    });
    router.get('/customer/get', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const customers = await bll.GetCustomer(id);
        res.json(customers);
    });
    router.post('/customer/create', async (req, res) => {
        const params = {
            name: http_1.HttpParamValidators.MustBeString(req.body, "name", 2),
            role: http_1.HttpParamValidators.MustBeOneOf(req.body, "role", role_type),
            username: http_1.HttpParamValidators.MustBeString(req.body, 'username', 2),
            birthday: http_1.HttpParamValidators.MustBeString(req.body, 'birthday', 10),
            cccd: http_1.HttpParamValidators.MustBeString(req.body, 'cccd', 8),
            phone: http_1.HttpParamValidators.CheckPhone(req.body, 'phone', 10)
        };
        const customer = await bll.CreateCustomer(params);
        res.json(customer);
    });
    router.post('/customer/update', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const params = {};
        if (req.body.name) {
            params.name = http_1.HttpParamValidators.MustBeString(req.body, "name", 2);
        }
        if (req.body.username) {
            params.username = http_1.HttpParamValidators.MustBeString(req.body, 'username', 2);
        }
        if (req.body.birthday) {
            params.birthday = http_1.HttpParamValidators.MustBeString(req.body, 'birthday', 10);
        }
        if (req.body.cccd) {
            params.cccd = http_1.HttpParamValidators.MustBeString(req.body, 'cccd', 8);
        }
        if (req.body.role) {
            params.role = http_1.HttpParamValidators.MustBeOneOf(req.body, "role", role_type);
        }
        if (req.body.phone) {
            params.phone = http_1.HttpParamValidators.CheckPhone(req.body, 'phone', 10);
        }
        const customer = await bll.UpdateCustomer(id, params);
        res.json(customer);
    });
    router.post('/customer/delete', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        await bll.DeleteCustomer(id);
        await auth_bll.RemovePassword(id);
        res.json(1);
    });
    return router;
}
exports.NewCustomerAPI = NewCustomerAPI;
//# sourceMappingURL=customer.api.js.map