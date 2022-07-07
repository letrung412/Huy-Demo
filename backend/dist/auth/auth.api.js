"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAuthAPI = void 0;
const express = require("express");
const http_1 = require("../lib/http");
const auth_1 = require("./auth");
const auth_api_middleware_1 = require("./auth.api.middleware");
const customer_1 = require("../customer/customer");
function NewAuthAPI(custmerAuthBLL) {
    const router = express.Router();
    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        try {
            const session = await custmerAuthBLL.Login(username, password);
            res.json(session);
        }
        catch (e) {
            switch (e) {
                case customer_1.CustomerNS.Errors.CustomerNotFound:
                case auth_1.CustomerAuthNS.Errors.ErrWrongPassword:
                case auth_1.CustomerAuthNS.Errors.ErrCustomerHasNoLogin:
                    throw new http_1.HttpError(e.message, 401 /* Unauthorized */);
                default:
                    throw e;
            }
        }
    });
    router.post("/customer/set_password", async (req, res) => {
        const customer_id = http_1.HttpParamValidators.MustBeString(req.body, 'customer_id', 4);
        const password = http_1.HttpParamValidators.MustBeString(req.body, 'password', 6);
        await custmerAuthBLL.SetPassword(customer_id, password);
        res.json(1);
    });
    router.use((0, auth_api_middleware_1.NewAuthMiddleware)(custmerAuthBLL));
    router.get("/me", async (req, res) => {
        const session = (0, auth_api_middleware_1.GetAuthData)(req);
        try {
            const customer = await custmerAuthBLL.GetCustomer(session.customer_id);
            res.json({ session, customer });
        }
        catch (e) {
            if (e === customer_1.CustomerNS.Errors.CustomerNotFound) {
                throw new http_1.HttpError(e.message, 401 /* Unauthorized */);
            }
            else {
                throw e;
            }
        }
    });
    router.get("/me/set_password", async (req, res) => {
        const session = (0, auth_api_middleware_1.GetAuthData)(req);
        const password = http_1.HttpParamValidators.MustBeString(req.body, 'password', 6);
        await custmerAuthBLL.SetPassword(session.customer_id, password);
        res.json(1);
    });
    return router;
}
exports.NewAuthAPI = NewAuthAPI;
//# sourceMappingURL=auth.api.js.map