"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerMongoDAL = void 0;
const customer_1 = require("./customer");
const mongodb_1 = require("../lib/mongodb");
class CustomerMongoDAL {
    constructor(db) {
        this.db = db;
        this.col_customer = this.db.collection("customer");
    }
    async init() {
        this.col_customer.createIndex("username", { unique: true, background: true });
    }
    async ListCustomer() {
        const customers = await this.col_customer.find().toArray();
        return mongodb_1.FromMongoData.Many(customers);
    }
    async GetCustomer(id) {
        const customers = await this.col_customer.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(customers);
    }
    async GetCustomerByUsername(username) {
        const customers = await this.col_customer.findOne({ username: username });
        return mongodb_1.FromMongoData.One(customers);
    }
    async CreateCustomer(customer) {
        const doc = mongodb_1.ToMongoData.One(customer);
        try {
            await this.col_customer.insertOne(doc);
        }
        catch (error) {
            if (error.code === 11000 /* Duplicate */) {
                throw customer_1.CustomerNS.Errors.CustomerExists;
            }
            throw error;
        }
    }
    async UpdateCustomer(customer) {
        const doc = mongodb_1.ToMongoData.One(customer);
        try {
            await this.col_customer.updateOne({ _id: customer.id }, { $set: doc });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CustomerMongoDAL = CustomerMongoDAL;
//# sourceMappingURL=customer.dal.js.map