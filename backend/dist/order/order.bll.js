"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewOrderBLLBase = void 0;
const filter_data_handlers_1 = require("../common/filter_data_handlers");
const order_1 = require("./order");
const product_1 = require("../product/product");
class NewOrderBLLBase {
    constructor(dal, product_bll) {
        this.dal = dal;
        this.product_bll = product_bll;
    }
    async init() { }
    async GetItem(order_id) {
        const item = await this.dal.GetItem(order_id);
        if (!item || !filter_data_handlers_1.FilterData.One(item)) {
            throw order_1.OrderNS.Errors.ItemNotFound;
        }
        const product = await this.product_bll.GetProductByOrder(item.product_id);
        const doc = {
            ...item,
            product: product,
        };
        return doc;
    }
    async GetViewOrder(id) {
        const order = await this.dal.GetOrder(id);
        if (!order || !filter_data_handlers_1.FilterData.One(order)) {
            throw order_1.OrderNS.Errors.OrderNotFound;
        }
        const item = await this.GetItem(order.id);
        const viewOrder = {
            ...order,
            items: [item],
        };
        return viewOrder;
    }
    async ListOrder(query) {
        let viewOrderArr = [];
        const orders = await this.dal.ListOrder(query);
        for (let o of filter_data_handlers_1.FilterData.Many(orders)) {
            const viewOrder = await this.GetViewOrder(o.id);
            viewOrderArr.push(viewOrder);
        }
        return viewOrderArr;
    }
    async FilterOrder(query) {
        const orders = await this.dal.ListOrder({ status: query.status });
        let viewOrderArr = [];
        for (let o of filter_data_handlers_1.FilterData.Many(orders)) {
            const viewOrder = await this.GetViewOrder(o.id);
            viewOrderArr.push(viewOrder);
        }
        if (query.gender) {
            const result = viewOrderArr.filter(v => v.items[0].product.gender == query.gender);
            return result;
        }
        else if (query.from && query.to) {
            const result = viewOrderArr.filter(v => v.total >= query.from && v.total <= query.to);
            return result;
        }
        return viewOrderArr;
    }
    async CreateOrder(params) {
        const time = Date.now();
        const { product_id, amount } = params.itemParams;
        const product = await this.product_bll.GetProduct(product_id);
        const order = {
            id: order_1.OrderNS.Generator.NewOrderID(),
            code: order_1.OrderNS.Generator.NewOrderCode(),
            status: order_1.OrderNS.OrderStatus.NEW,
            customer_id: params.customer_id,
            total: product.price * amount,
            ctime: time,
            mtime: time,
        };
        const item = {
            id: order_1.OrderNS.Generator.NewItemID(),
            product_id: product.id,
            order_id: order.id,
            amount: amount,
            ctime: time,
            mtime: time,
        };
        await this.dal.CreateOrder(order);
        await this.dal.CreateItem(item);
        return {
            ...order,
            items: [
                {
                    ...item,
                    product: product,
                },
            ],
        };
    }
    async UpdateItem(id, params) {
        const item = await this.dal.GetItem(id);
        const product = await this.product_bll.GetProduct(item.product_id);
        if (!item || !filter_data_handlers_1.FilterData.One(item)) {
            throw order_1.OrderNS.Errors.ItemNotFound;
        }
        const doc = {
            ...item,
            amount: params.amount,
            mtime: Date.now(),
        };
        await this.dal.UpdateItem(doc);
        return {
            ...doc,
            product: product,
        };
    }
    async UpdateOrder(id, params) {
        const order = await this.dal.GetOrder(id);
        if (!order || !filter_data_handlers_1.FilterData.One(order)) {
            throw order_1.OrderNS.Errors.OrderNotFound;
        }
        let item = await this.dal.GetItem(order.id);
        if (!item || !filter_data_handlers_1.FilterData.One(item)) {
            throw order_1.OrderNS.Errors.ItemNotFound;
        }
        const product = await this.product_bll.GetProduct(item.product_id);
        if (params.status === order_1.OrderNS.OrderStatus.NEW) {
            //status=new
            let updateItem;
            if (params.itemParams) {
                order.total = params.itemParams.amount * product.price;
                const doc = await this.UpdateItem(order.id, params.itemParams);
                updateItem = {
                    ...order,
                    items: [doc],
                };
                await this.dal.UpdateOrder(order);
            }
            return updateItem;
        }
        else if (params.status === order_1.OrderNS.OrderStatus.DELETE) {
            //status=cancle
            const time = Date.now();
            const doc = {
                ...order,
                status: params.status,
                dtime: time,
            };
            const updateItem = {
                ...item,
                dtime: time,
            };
            await this.dal.UpdateItem(updateItem);
            await this.dal.UpdateOrder(doc);
            return {
                ...doc,
                items: [
                    {
                        ...updateItem,
                        product: product,
                    },
                ],
            };
        }
        else if (params.status === order_1.OrderNS.OrderStatus.WAIT) {
            // status="done"
            const time = Date.now();
            const doc = {
                ...order,
                status: params.status,
                mtime: time,
            };
            if (params.info) {
                doc.info = params.info;
            }
            const updateProduct = {
                ...product,
                consume: product.consume + item.amount,
                amount: product.amount - item.amount,
                mtime: time,
            };
            await this.dal.UpdateOrder(doc);
            await this.product_bll.UpdateProduct(item.product_id, updateProduct);
            return {
                ...doc,
                items: [
                    {
                        ...item,
                        product: updateProduct,
                    },
                ],
            };
        }
        else if (params.status === order_1.OrderNS.OrderStatus.CANCLE) {
            const time = Date.now();
            const doc = {
                ...order,
                status: params.status,
                mtime: time,
            };
            if (params.info) {
                doc.info = params.info;
            }
            const updateProduct = {
                ...product,
                consume: product.consume - item.amount,
                amount: product.amount + item.amount,
                mtime: time,
            };
            await this.dal.UpdateOrder(doc);
            await this.product_bll.UpdateProduct(item.product_id, updateProduct);
            return {
                ...doc,
                items: [
                    {
                        ...item,
                        product: updateProduct,
                    },
                ],
            };
        }
        else {
            const time = Date.now();
            if (order.status === order_1.OrderNS.OrderStatus.NEW) {
                const time = Date.now();
                const doc = {
                    ...order,
                    status: params.status,
                    mtime: time,
                };
                if (params.info) {
                    doc.info = params.info;
                }
                const updateProduct = {
                    ...product,
                    consume: product.consume + item.amount,
                    amount: product.amount - item.amount,
                    mtime: time,
                };
                await this.dal.UpdateOrder(doc);
                await this.product_bll.UpdateProduct(item.product_id, updateProduct);
                return {
                    ...doc,
                    items: [
                        {
                            ...item,
                            product: updateProduct,
                        },
                    ],
                };
            }
            else {
                const doc = {
                    ...order,
                    status: params.status,
                    mtime: time,
                };
                await this.dal.UpdateOrder(doc);
                return {
                    ...doc,
                    items: [
                        {
                            ...item,
                            product: product,
                        },
                    ],
                };
            }
        }
    }
    async OrderByReport(query) {
        const orders = await this.dal.ListOrderByReport(query);
        let viewOrderArr = [];
        for (const o of orders) {
            const viewOrder = await this.GetViewOrder(o.id);
            viewOrderArr.push(viewOrder);
        }
        if (query === order_1.OrderNS.QueryReport.WEEK) {
            const menOrders = viewOrderArr.filter(el => el.items[0].product.gender === product_1.ProductNS.Gender.MEN);
            const womenOrders = viewOrderArr.filter(el => el.items[0].product.gender === product_1.ProductNS.Gender.WOMEN);
            const childOrders = viewOrderArr.filter(el => el.items[0].product.gender === product_1.ProductNS.Gender.CHILD);
            const mapMenOrders = order_1.OrderNS.Utils.FilterOrder(menOrders);
            const mapWomenOrders = order_1.OrderNS.Utils.FilterOrder(womenOrders);
            const mapChildOrders = order_1.OrderNS.Utils.FilterOrder(childOrders);
            return {
                men: order_1.OrderNS.Utils.FilterReport(mapMenOrders),
                women: order_1.OrderNS.Utils.FilterReport(mapWomenOrders),
                child: order_1.OrderNS.Utils.FilterReport(mapChildOrders)
            };
        }
        else {
            const menOrders = viewOrderArr.filter(o => o.items[0].product.gender == product_1.ProductNS.Gender.MEN);
            const womenOrders = viewOrderArr.filter(o => o.items[0].product.gender == product_1.ProductNS.Gender.WOMEN);
            const childOrders = viewOrderArr.filter(o => o.items[0].product.gender == product_1.ProductNS.Gender.CHILD);
            return {
                men: {
                    amount: menOrders.length,
                    total: order_1.OrderNS.Utils.TotalMoneyByDay(menOrders)
                },
                women: {
                    amount: womenOrders.length,
                    total: order_1.OrderNS.Utils.TotalMoneyByDay(womenOrders)
                },
                child: {
                    amount: childOrders.length,
                    total: order_1.OrderNS.Utils.TotalMoneyByDay(childOrders)
                }
            };
        }
    }
}
exports.NewOrderBLLBase = NewOrderBLLBase;
//# sourceMappingURL=order.bll.js.map