"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express = require("express");
const cors = require("cors");
require("./lib/express");
require("./ext/log");
const express_1 = require("./lib/express");
const http_errror_handler_1 = require("./common/http_errror_handler");
const mongodb_1 = require("./lib/mongodb");
// import { ContextBLLBase } from "./ext/ctx.bll";
const product_api_1 = require("./product/product.api");
const product_bll_1 = require("./product/product.bll");
const product_dal_1 = require("./product/product.dal");
const order_api_1 = require("./order/order.api");
const order_bll_1 = require("./order/order.bll");
const order_dal_1 = require("./order/order.dal");
const customer_api_1 = require("./customer/customer.api");
const customer_bll_1 = require("./customer/customer.bll");
const customer_dal_1 = require("./customer/customer.dal");
const auth_api_1 = require("./auth/auth.api");
const auth_bll_base_1 = require("./auth/auth.bll.base");
const auth_dal_mongo_1 = require("./auth/auth.dal.mongo");
const mail_api_1 = require("./mail/mail.api");
async function main() {
    const config = await (0, config_1.ReadConfig)();
    console.log(config);
    const client = await mongodb_1.MongoCommon.Connect(config.database.db_url);
    console.log("Connect to database");
    const db = client.db(config.database.db_name);
    /********************************************************/
    const productDAL = new product_dal_1.ProductMongoDAL(db);
    productDAL.init();
    const orderDAL = new order_dal_1.OrderMongoDAL(db);
    orderDAL.init();
    const productBLL = new product_bll_1.NewProductBLLBase(productDAL, orderDAL);
    productBLL.init();
    const orderBLL = new order_bll_1.NewOrderBLLBase(orderDAL, productBLL);
    orderBLL.init();
    /*******************************************************/
    /*******************************************************/
    const customerDAL = new customer_dal_1.CustomerMongoDAL(db);
    customerDAL.init();
    const customerBLL = new customer_bll_1.NewCustomerBLLBase(customerDAL);
    customerBLL.init();
    /*******************************************************/
    const authDAL = new auth_dal_mongo_1.CustomerAuthDALMongo(db);
    authDAL.init();
    const authBLL = new auth_bll_base_1.CustomerAuthBLLBase(authDAL, customerBLL);
    authBLL.init();
    /*******************************************************/
    const app = express();
    app.use(express.json());
    app.disable("x-powered-by");
    app.use(cors());
    /*******************************************************/
    app.use("/api/customer", (0, customer_api_1.NewCustomerAPI)(customerBLL, authBLL));
    app.use("/api/product", (0, product_api_1.NewProductAPI)(productBLL));
    app.use("/api/order", (0, order_api_1.NewOrderAPI)(orderBLL));
    app.use("/api/auth", (0, auth_api_1.NewAuthAPI)(authBLL));
    app.use("/api/mail", (0, mail_api_1.NewMailAPI)());
    /*******************************************************/
    app.use("/", (0, express_1.ExpressStaticFallback)(config.app.dir));
    app.use(http_errror_handler_1.HttpErrorHandler);
    console.log(`listen on ${config.server.port}`);
    app.listen(config.server.port, "0.0.0.0", () => {
        const err = arguments[0];
        if (err) {
            console.log(err);
        }
    });
}
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map