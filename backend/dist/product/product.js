"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNS = void 0;
const rand_1 = require("../lib/rand");
var ProductNS;
(function (ProductNS) {
    // export enum SizeType{
    //     S="S",
    //     M="M",
    //     L="L",
    // }
    // export interface Size{
    //     id:string;
    //     product_id:string;
    //     size:SizeType;
    //     amount:number;
    //     ctime:number;
    //     mtime:number;
    // }
    let Gender;
    (function (Gender) {
        Gender["MEN"] = "men";
        Gender["WOMEN"] = "women";
        Gender["CHILD"] = "children";
    })(Gender = ProductNS.Gender || (ProductNS.Gender = {}));
    ProductNS.Errors = {
        ProductNotFound: new Error("product not found"),
        ProductExist: new Error("product already exist"),
        CommentNotFound: new Error("comment not found"),
    };
    ProductNS.Generator = {
        NewProductID: () => rand_1.default.alphabet(8),
        NewProductCode: () => {
            return `Product${rand_1.default.number(4)}`;
        },
        NewCommentID: () => rand_1.default.alphabet(4)
    };
})(ProductNS = exports.ProductNS || (exports.ProductNS = {}));
//# sourceMappingURL=product.js.map