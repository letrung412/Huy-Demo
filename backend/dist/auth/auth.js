"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAuthNS = void 0;
var CustomerAuthNS;
(function (CustomerAuthNS) {
    CustomerAuthNS.Errors = {
        ErrCustomerHasNoLogin: new Error("customer has no login"),
        ErrWrongPassword: new Error("wrong password"),
        ErrAllowAccess: new Error("customer role not allow full access")
    };
})(CustomerAuthNS = exports.CustomerAuthNS || (exports.CustomerAuthNS = {}));
//# sourceMappingURL=auth.js.map