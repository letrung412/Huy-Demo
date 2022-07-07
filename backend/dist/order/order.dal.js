"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMongoDAL = void 0;
const order_1 = require("./order");
const mongodb_1 = require("../lib/mongodb");
const filter_data_handlers_1 = require("../common/filter_data_handlers");
const date_fns_1 = require("date-fns");
class OrderMongoDAL {
    constructor(db) {
        this.db = db;
        this.col_order = this.db.collection("order");
        this.col_item = this.db.collection("item");
    }
    async init() { }
    async ListItem(product_id) {
        const items = await this.col_item
            .find({ product_id: product_id })
            .toArray();
        return filter_data_handlers_1.FilterData.Many(mongodb_1.FromMongoData.Many(items));
    }
    async GetItem(order_id) {
        const item = await this.col_item.findOne({ order_id: order_id });
        return mongodb_1.FromMongoData.One(item);
    }
    async CreateItem(item) {
        const doc = mongodb_1.ToMongoData.One(item);
        try {
            await this.col_item.insertOne(doc);
        }
        catch (error) {
            if (error.code === 11000 /* Duplicate */) {
                throw order_1.OrderNS.Errors.ItemExists;
            }
            throw error;
        }
    }
    async UpdateItem(item) {
        const doc = mongodb_1.ToMongoData.One(item);
        try {
            await this.col_item.updateOne({ _id: item.id }, { $set: doc });
        }
        catch (error) {
            throw error;
        }
    }
    async ListOrder(query) {
        const filter = {};
        if (query.status) {
            filter.status = query.status;
        }
        if (query.customer_id) {
            filter.customer_id = query.customer_id;
        }
        const orders = await this.col_order
            .find(filter)
            .toArray();
        return mongodb_1.FromMongoData.Many(orders);
    }
    async GetOrder(id) {
        const order = await this.col_order.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(order);
    }
    async CreateOrder(order) {
        const doc = mongodb_1.ToMongoData.One(order);
        try {
            await this.col_order.insertOne(doc);
        }
        catch (error) {
            if (error.code === 11000 /* Duplicate */) {
                throw order_1.OrderNS.Errors.OrderExist;
            }
            throw error;
        }
    }
    async UpdateOrder(order) {
        const doc = mongodb_1.ToMongoData.One(order);
        try {
            await this.col_order.updateOne({ _id: order.id }, { $set: doc });
        }
        catch (error) {
            throw error;
        }
    }
    async ListOrderByReport(query) {
        if (query === order_1.OrderNS.QueryReport.WEEK) {
            const start = (0, date_fns_1.startOfWeek)(Date.now()).getTime();
            const end = (0, date_fns_1.endOfWeek)(Date.now()).getTime();
            const orders = await this.col_order.find({ status: order_1.OrderNS.OrderStatus.DONE, mtime: { $gte: start, $lte: end } }).toArray();
            return mongodb_1.FromMongoData.Many(orders);
        }
        if (query === order_1.OrderNS.QueryReport.DAY) {
            const start = (0, date_fns_1.startOfDay)(Date.now()).getTime();
            const end = (0, date_fns_1.endOfDay)(Date.now()).getTime();
            const orders = await this.col_order.find({ status: order_1.OrderNS.OrderStatus.DONE, mtime: { $gte: start, $lte: end } }).toArray();
            return mongodb_1.FromMongoData.Many(orders);
        }
    }
}
exports.OrderMongoDAL = OrderMongoDAL;
//# sourceMappingURL=order.dal.js.map