"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAuthBLLBase = void 0;
const rand_1 = require("../lib/rand");
const auth_1 = require("./auth");
class CustomerAuthBLLBase {
    constructor(dal, customerBLL) {
        this.dal = dal;
        this.customerBLL = customerBLL;
    }
    async init() { }
    async GetCustomer(id) {
        return this.customerBLL.GetCustomer(id);
    }
    async SetPassword(customer_id, password) {
        await this.customerBLL.GetCustomer(customer_id);
        const secret = {
            customer_id,
            name: "password",
            value: password
        };
        await this.dal.SaveCustomerSecret(secret);
    }
    async Login(username, password) {
        const customer = await this.customerBLL.GetCustomerByUsername(username);
        // comapre password
        const secret = await this.dal.GetCustomerSecret(customer.id, "password");
        if (!secret) {
            throw auth_1.CustomerAuthNS.Errors.ErrCustomerHasNoLogin;
        }
        if (secret.value !== password) {
            throw auth_1.CustomerAuthNS.Errors.ErrWrongPassword;
        }
        else {
            const session = {
                id: rand_1.default.alphabet(16),
                customer_id: customer.id,
            };
            await this.dal.CreateCustomerSession(session);
            return session;
        }
    }
    async GetCustomerSession(id) {
        return this.dal.GetCustomerSession(id);
    }
    async RemovePassword(customer_id) {
        await this.dal.RemovePassword(customer_id);
    }
}
exports.CustomerAuthBLLBase = CustomerAuthBLLBase;
//# sourceMappingURL=auth.bll.base.js.map