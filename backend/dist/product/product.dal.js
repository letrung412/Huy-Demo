"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMongoDAL = void 0;
const mongodb_1 = require("../lib/mongodb");
class ProductMongoDAL {
    constructor(db) {
        this.db = db;
        this.col_comment = this.db.collection("comment");
        this.col_product = this.db.collection("product");
    }
    async init() { }
    async ListComment(product_id) {
        const comments = await this.col_comment.find({ product_id: product_id }).toArray();
        return mongodb_1.FromMongoData.Many(comments);
    }
    async GetComment(id) {
        const comment = await this.col_comment.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(comment);
    }
    async CreateComment(comment) {
        const doc = mongodb_1.ToMongoData.One(comment);
        try {
            await this.col_comment.insertOne(doc);
        }
        catch (error) {
            throw error;
        }
    }
    async ListProduct(gender) {
        if (gender) {
            const products = await this.col_product.find({ gender: gender }).toArray();
            return mongodb_1.FromMongoData.Many(products);
        }
        const products = await this.col_product.find().toArray();
        return mongodb_1.FromMongoData.Many(products);
    }
    async GetProduct(id) {
        const product = await this.col_product.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(product);
    }
    async GetProductByName(name) {
        const products = await this.col_product.find({ "name": { $regex: name } }).toArray();
        return mongodb_1.FromMongoData.Many(products);
    }
    async CreateProduct(product) {
        const doc = mongodb_1.ToMongoData.One(product);
        try {
            await this.col_product.insertOne(doc);
        }
        catch (error) {
            throw error;
        }
    }
    async UpdateProduct(product) {
        const doc = mongodb_1.ToMongoData.One(product);
        try {
            await this.col_product.updateOne({ _id: product.id }, { $set: doc });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductMongoDAL = ProductMongoDAL;
//# sourceMappingURL=product.dal.js.map