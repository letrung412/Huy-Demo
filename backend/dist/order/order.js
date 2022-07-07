"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderNS = void 0;
const rand_1 = require("../lib/rand");
const date_fns_1 = require("date-fns");
var OrderNS;
(function (OrderNS) {
    let OrderStatus;
    (function (OrderStatus) {
        OrderStatus["NEW"] = "new";
        OrderStatus["DELETE"] = "delete";
        OrderStatus["WAIT"] = "await";
        OrderStatus["DONE"] = "done";
        OrderStatus["CANCLE"] = "cancel";
    })(OrderStatus = OrderNS.OrderStatus || (OrderNS.OrderStatus = {}));
    let QueryReport;
    (function (QueryReport) {
        QueryReport["DAY"] = "day";
        QueryReport["WEEK"] = "week";
    })(QueryReport = OrderNS.QueryReport || (OrderNS.QueryReport = {}));
    OrderNS.Errors = {
        OrderNotFound: new Error("Order not found"),
        OrderExist: new Error("Order does exist"),
        ItemNotFound: new Error("Item not found"),
        ItemExists: new Error("Item does exist")
    };
    OrderNS.Generator = {
        NewOrderID: () => rand_1.default.alphabet(12),
        NewOrderCode: () => (0, date_fns_1.format)(Date.now(), "yyMMddhhmmss"),
        NewItemID: () => rand_1.default.alphabet(12),
    };
    OrderNS.Utils = {
        TotalMoneyByDay: (viewOrder) => {
            const sum = viewOrder.reduce((init, curr) => {
                return init + curr.total;
            }, 0);
            return sum;
        },
        FilterOrder: (viewOrder) => {
            const newArr = viewOrder.map(el => {
                return {
                    ...el,
                    day: new Date(el.mtime).toDateString().split(' ')[0]
                };
            });
            return newArr;
        },
        FilterReport: (viewArr) => {
            const MonArr = viewArr.filter(el => el.day === "Mon");
            const TueArr = viewArr.filter(el => el.day === "Tue");
            const WedArr = viewArr.filter(el => el.day === "Wed");
            const ThuArr = viewArr.filter(el => el.day === "Thu");
            const FriArr = viewArr.filter(el => el.day === "Fri");
            const SatArr = viewArr.filter(el => el.day === "Sat");
            const SunArr = viewArr.filter(el => el.day === "Sun");
            return [
                { amount: MonArr.length, total: OrderNS.Utils.TotalMoneyByDay(MonArr), day: "Mon" },
                { amount: TueArr.length, total: OrderNS.Utils.TotalMoneyByDay(TueArr), day: "Tue" },
                { amount: WedArr.length, total: OrderNS.Utils.TotalMoneyByDay(WedArr), day: "Wed" },
                { amount: ThuArr.length, total: OrderNS.Utils.TotalMoneyByDay(ThuArr), day: "Thur" },
                { amount: FriArr.length, total: OrderNS.Utils.TotalMoneyByDay(FriArr), day: "Fri" },
                { amount: SatArr.length, total: OrderNS.Utils.TotalMoneyByDay(SatArr), day: "Sat" },
                { amount: SunArr.length, total: OrderNS.Utils.TotalMoneyByDay(SunArr), day: "Sun" }
            ];
        }
    };
})(OrderNS = exports.OrderNS || (exports.OrderNS = {}));
//# sourceMappingURL=order.js.map