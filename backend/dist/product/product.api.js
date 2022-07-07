"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProductAPI = void 0;
const http_1 = require("../lib/http");
const product_1 = require("./product");
const express = require("express");
function NewProductAPI(bll) {
    const gender = Object.values(product_1.ProductNS.Gender);
    const router = express.Router();
    router.get("/product/list", async (req, res) => {
        if (req.query.gender) {
            const gender_query = http_1.HttpParamValidators.MustBeOneOf(req.query, "gender", gender);
            const product = await bll.ListProduct(gender_query);
            return res.json(product);
        }
        const product = await bll.ListProduct();
        return res.json(product);
    });
    router.get('/product/sale', async (req, res) => {
        const product = await bll.ListProductSales();
        return res.json(product);
    });
    router.get("/product/get", async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const product = await bll.GetProduct(id);
        res.json(product);
    });
    router.get("/product/get_by_name", async (req, res) => {
        const name = http_1.HttpParamValidators.MustBeString(req.query, "name");
        const products = await bll.GetProductByName(name);
        res.json(products);
    });
    router.post("/product/create", async (req, res) => {
        const params = {
            name: http_1.HttpParamValidators.MustBeString(req.body, "name", 2),
            material: http_1.HttpParamValidators.MustBeString(req.body, "material"),
            image: http_1.HttpParamValidators.MustBeArrayString(req.body, "image"),
            color: http_1.HttpParamValidators.MustBeString(req.body, "color"),
            amount: http_1.HttpParamValidators.MustBeNumber(req.body, "amount"),
            origin_price: http_1.HttpParamValidators.MustBeNumber(req.body, "origin_price"),
            price: http_1.HttpParamValidators.MustBeNumber(req.body, "price"),
            gender: http_1.HttpParamValidators.MustBeOneOf(req.body, "gender", gender),
        };
        const product = await bll.CreateProduct(params);
        res.json(product);
    });
    router.post('/product/update', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const params = {};
        if (req.body.name) {
            params.name = http_1.HttpParamValidators.MustBeString(req.body, "name", 2);
        }
        if (req.body.material) {
            params.material = http_1.HttpParamValidators.MustBeString(req.body, "material");
        }
        if (req.body.color) {
            params.color = http_1.HttpParamValidators.MustBeString(req.body, "color");
        }
        if (req.body.amount) {
            params.amount = http_1.HttpParamValidators.MustBeNumber(req.body, "amount");
        }
        if (req.body.origin_price) {
            params.origin_price = http_1.HttpParamValidators.MustBeNumber(req.body, "origin_price");
        }
        if (req.body.price) {
            params.price = http_1.HttpParamValidators.MustBeNumber(req.body, "price");
        }
        if (req.body.gender) {
            params.gender = http_1.HttpParamValidators.MustBeOneOf(req.body, "gender", gender);
        }
        if (req.body.image) {
            params.image = http_1.HttpParamValidators.MustBeArrayString(req.body, "image");
        }
        const product = await bll.UpdateProduct(id, params);
        res.json(product);
    });
    router.post('/product/delete', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const product = await bll.DeleteProduct(id);
        res.json(product);
    });
    router.get('/comment/list', async (req, res) => {
        const product_id = http_1.HttpParamValidators.MustBeString(req.query, "product_id", 8);
        const comments = await bll.ListComment(product_id);
        res.json(comments);
    });
    router.get('/comment/get', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, "id", 8);
        const comment = await bll.GetComment(id);
        res.json(comment);
    });
    router.post('/comment/create', async (req, res) => {
        const params = {
            product_id: http_1.HttpParamValidators.MustBeString(req.body, "product_id", 8),
            customer_id: http_1.HttpParamValidators.MustBeString(req.body, "customer_id", 8),
            username: http_1.HttpParamValidators.MustBeString(req.body, "username", 2),
            comment: http_1.HttpParamValidators.MustBeString(req.body, "comment"),
            rate: http_1.HttpParamValidators.MustBeNumber(req.body, "rate")
        };
        const comment = await bll.CreateComment(params);
        res.json(comment);
    });
    return router;
}
exports.NewProductAPI = NewProductAPI;
//# sourceMappingURL=product.api.js.map