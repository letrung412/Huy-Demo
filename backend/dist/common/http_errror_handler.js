"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorHandler = void 0;
const http_1 = require("../lib/http");
const product_1 = require("../product/product");
const order_1 = require("../order/order");
const customer_1 = require("../customer/customer");
const commonErrors = new Set([
    ...Object.values(product_1.ProductNS.Errors),
    ...Object.values(order_1.OrderNS.Errors),
    ...Object.values(customer_1.CustomerNS.Errors)
]);
function HttpErrorHandler(err, req, res, next) {
    if (commonErrors.has(err)) {
        err = new http_1.HttpError(err.message, 400 /* BadRequest */);
    }
    if (err && typeof err.HttpStatusCode === "function") {
        const message = err.message;
        res.status(err.HttpStatusCode() || 500).json({
            error: message,
        });
        return;
    }
    res.status(500).send({
        error: "internal server error",
    });
}
exports.HttpErrorHandler = HttpErrorHandler;
//# sourceMappingURL=http_errror_handler.js.map