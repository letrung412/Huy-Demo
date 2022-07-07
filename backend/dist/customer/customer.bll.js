"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCustomerBLLBase = void 0;
const customer_1 = require("./customer");
const filter_data_handlers_1 = require("../common/filter_data_handlers");
class NewCustomerBLLBase {
    constructor(dal) {
        this.dal = dal;
    }
    async init() { }
    async ListCustomer() {
        const customer = await this.dal.ListCustomer();
        return filter_data_handlers_1.FilterData.Many(customer);
    }
    async GetCustomer(id) {
        const customer = await this.dal.GetCustomer(id);
        if (!customer || filter_data_handlers_1.FilterData.One(customer).length == 0) {
            throw customer_1.CustomerNS.Errors.CustomerNotFound;
        }
        return customer;
    }
    async GetCustomerByUsername(username) {
        const customer = await this.dal.GetCustomerByUsername(username);
        if (!customer || filter_data_handlers_1.FilterData.One(customer).length == 0) {
            throw customer_1.CustomerNS.Errors.CustomerNotFound;
        }
        return customer;
    }
    async CreateCustomer(params) {
        const doc = {
            id: customer_1.CustomerNS.Generator.NewCustomerID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        };
        await this.dal.CreateCustomer(doc);
        return doc;
    }
    async UpdateCustomer(id, params) {
        const customer = await this.GetCustomer(id);
        const doc = {
            ...customer,
            ...params,
            mtime: Date.now(),
        };
        await this.dal.UpdateCustomer(doc);
        return doc;
    }
    async DeleteCustomer(id) {
        const customer = await this.GetCustomer(id);
        const doc = {
            ...customer,
            dtime: Date.now()
        };
        await this.dal.UpdateCustomer(doc);
    }
}
exports.NewCustomerBLLBase = NewCustomerBLLBase;
//# sourceMappingURL=customer.bll.js.map