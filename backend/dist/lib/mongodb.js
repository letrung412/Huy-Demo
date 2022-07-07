"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCommon = exports.FromMongoData = exports.ToMongoData = exports.MongoError = exports.MongoDB = void 0;
const mongodb_1 = require("mongodb");
var mongodb_2 = require("mongodb");
Object.defineProperty(exports, "MongoDB", { enumerable: true, get: function () { return mongodb_2.Db; } });
Object.defineProperty(exports, "MongoError", { enumerable: true, get: function () { return mongodb_2.MongoError; } });
function RenameOne(doc, from, to) {
    if (!doc) {
        return null;
    }
    const obj = {};
    for (const [k, v] of Object.entries(doc)) {
        if (k === from) {
            obj[to] = v;
        }
        else {
            obj[k] = v;
        }
    }
    return obj;
}
function RenameArray(docs, from, to) {
    if (!docs) {
        return [];
    }
    const res = [];
    for (const d of docs) {
        res.push(RenameOne(d, from, to));
    }
    return res;
}
exports.ToMongoData = {
    Many(docs) {
        return RenameArray(docs, 'id', '_id');
    },
    One(doc) {
        return RenameOne(doc, 'id', '_id');
    }
};
exports.FromMongoData = {
    Many(docs) {
        return RenameArray(docs, '_id', 'id');
    },
    One(doc) {
        return RenameOne(doc, '_id', 'id');
    }
};
async function Connect(url) {
    const client = new mongodb_1.MongoClient(url);
    await client.connect();
    return client;
}
const sessionSymbol = Symbol('session');
exports.MongoCommon = {
    Connect,
    WithSession(ctx, session) {
        ctx[sessionSymbol] = session;
        return ctx;
    },
    Session(ctx) {
        return ctx[sessionSymbol];
    }
};
//# sourceMappingURL=mongodb.js.map