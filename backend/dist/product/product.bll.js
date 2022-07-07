"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProductBLLBase = void 0;
const filter_data_handlers_1 = require("../common/filter_data_handlers");
const product_1 = require("./product");
class NewProductBLLBase {
    constructor(dal, orderDAL) {
        this.dal = dal;
        this.orderDAL = orderDAL;
    }
    async init() { }
    async ListComment(product_id) {
        const comments = await this.dal.ListComment(product_id);
        if (filter_data_handlers_1.FilterData.Many(comments).length == 0) {
            return [];
        }
        return comments;
    }
    async GetComment(id) {
        const comment = await this.dal.GetComment(id);
        if (!comment || !filter_data_handlers_1.FilterData.One(comment)) {
            throw product_1.ProductNS.Errors.CommentNotFound;
        }
        return comment;
    }
    async CreateComment(params) {
        const doc = {
            id: product_1.ProductNS.Generator.NewCommentID(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        };
        await this.dal.CreateComment(doc);
        return doc;
    }
    async GetProduct(id) {
        const product = await this.dal.GetProduct(id);
        if (!product || !filter_data_handlers_1.FilterData.One(product)) {
            throw product_1.ProductNS.Errors.ProductNotFound;
        }
        const comments = await this.ListComment(product.id);
        return {
            ...product,
            comments: comments
        };
    }
    async GetProductByName(name) {
        const products = await this.dal.GetProductByName(name);
        if (filter_data_handlers_1.FilterData.Many(products).length == 0) {
            throw product_1.ProductNS.Errors.ProductNotFound;
        }
        const viewProductArr = [];
        for (const p of filter_data_handlers_1.FilterData.Many(products)) {
            const comments = await this.ListComment(p.id);
            const product = {
                ...p,
                comments: comments
            };
            viewProductArr.push(product);
        }
        return viewProductArr;
    }
    async GetProductByOrder(id) {
        const product = await this.dal.GetProduct(id);
        const comments = await this.ListComment(product.id);
        return {
            ...product,
            comments: comments
        };
    }
    async ListProduct(gender) {
        if (gender) {
            let viewProduct = [];
            const products = await this.dal.ListProduct(gender);
            for (const p of filter_data_handlers_1.FilterData.Many(products)) {
                const product = await this.GetProduct(p.id);
                viewProduct.push(product);
            }
            return viewProduct;
        }
        let viewProduct = [];
        const products = await this.dal.ListProduct();
        for (const p of filter_data_handlers_1.FilterData.Many(products)) {
            const product = await this.GetProduct(p.id);
            viewProduct.push(product);
        }
        return viewProduct;
    }
    async ListProductSales() {
        let viewProduct = [];
        const products = await this.dal.ListProduct();
        const filterProducts = filter_data_handlers_1.FilterData.Many(products).filter(el => el.origin_price !== el.price);
        for (const p of filterProducts) {
            const product = await this.GetProduct(p.id);
            viewProduct.push(product);
        }
        return viewProduct;
    }
    async CreateProduct(params) {
        const doc = {
            id: product_1.ProductNS.Generator.NewProductID(),
            code: product_1.ProductNS.Generator.NewProductCode(),
            ...params,
            consume: 0,
            ctime: Date.now(),
            mtime: Date.now()
        };
        await this.dal.CreateProduct(doc);
        return doc;
    }
    async UpdateProduct(id, params) {
        const product = await this.dal.GetProduct(id);
        if (!product || !filter_data_handlers_1.FilterData.One(product)) {
            throw product_1.ProductNS.Errors.ProductNotFound;
        }
        const comments = await this.ListComment(product.id);
        const doc = {
            ...product,
            ...params,
            mtime: Date.now()
        };
        if (params.image) {
            doc.image = params.image;
        }
        if (params.price) {
            const items = await this.orderDAL.ListItem(product.id);
            for (let i of items) {
                const order = await this.orderDAL.GetOrder(i.order_id);
                const newOrder = {
                    ...order,
                    total: i.amount * params.price
                };
                await this.orderDAL.UpdateOrder(newOrder);
            }
        }
        await this.dal.UpdateProduct(doc);
        return {
            ...doc,
            comments: comments
        };
    }
    async DeleteProduct(id) {
        const product = await this.dal.GetProduct(id);
        if (!product || !filter_data_handlers_1.FilterData.One(product)) {
            throw product_1.ProductNS.Errors.ProductNotFound;
        }
        const comments = await this.ListComment(product.id);
        const doc = {
            ...product,
            dtime: Date.now()
        };
        await this.dal.UpdateProduct(doc);
        return {
            ...doc,
            comments: comments
        };
    }
}
exports.NewProductBLLBase = NewProductBLLBase;
//# sourceMappingURL=product.bll.js.map