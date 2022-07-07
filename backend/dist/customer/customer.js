"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerNS = void 0;
const rand_1 = require("../lib/rand");
var CustomerNS;
(function (CustomerNS) {
    let Role;
    (function (Role) {
        Role["ADMIN"] = "admin";
        Role["CUSTOMER"] = "customer";
        Role["STAFF"] = "staff";
    })(Role = CustomerNS.Role || (CustomerNS.Role = {}));
    CustomerNS.Errors = {
        CustomerNotFound: new Error("Customer not found"),
        CustomerExists: new Error("Customer already exists")
    };
    CustomerNS.Generator = {
        NewCustomerID: () => rand_1.default.alphabet(8)
    };
})(CustomerNS = exports.CustomerNS || (exports.CustomerNS = {}));
//# sourceMappingURL=customer.js.map