"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterData = void 0;
exports.FilterData = {
    One(obj) {
        return "dtime" in obj ? null : obj;
    },
    Many(array) {
        const data = array.filter(el => !el.hasOwnProperty("dtime"));
        return data;
    }
};
//# sourceMappingURL=filter_data_handlers.js.map