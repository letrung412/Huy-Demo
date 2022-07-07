"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAuthDALMongo = void 0;
const mongodb_1 = require("../lib/mongodb");
class CustomerAuthDALMongo {
    constructor(db) {
        this.db = db;
        this.col_customer_secret = this.db.collection("customer_secret");
        this.col_customer_session = this.db.collection("customer_session");
    }
    async init() { }
    async SaveCustomerSecret(obj) {
        await this.col_customer_secret.updateOne({
            customer_id: obj.customer_id,
            name: obj.name
        }, {
            $set: {
                customer_id: obj.customer_id,
                name: obj.name,
                value: obj.value,
            }
        }, { upsert: true });
    }
    async GetCustomerSecret(customer_id, name) {
        const doc = await this.col_customer_secret.findOne({ customer_id, name });
        return mongodb_1.FromMongoData.One(doc);
    }
    async CreateCustomerSession(session) {
        const doc = mongodb_1.ToMongoData.One(session);
        await this.col_customer_session.insertOne(doc);
    }
    async GetCustomerSession(id) {
        const doc = await this.col_customer_session.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(doc);
    }
    async GetSessionByCustomer(user_id) {
        const docs = await this.col_customer_session.find({ user_id }).toArray();
        return mongodb_1.FromMongoData.Many(docs);
    }
    async DisableSession(session) {
        const doc = mongodb_1.ToMongoData.One(session);
        await this.col_customer_session.updateOne({ _id: session.id }, { $set: doc });
    }
    async RemovePassword(customer_id) {
        const secret = await this.col_customer_secret.findOne({ customer_id: customer_id });
        await this.col_customer_secret.deleteOne({ _id: secret._id });
    }
}
exports.CustomerAuthDALMongo = CustomerAuthDALMongo;
//# sourceMappingURL=auth.dal.mongo.js.map