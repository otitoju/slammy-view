'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProductModel = require('../models/Product');

var GetSearchQuery = function GetSearchQuery(body) {
    var orAnd = body.orAnd.toLowerCase();
    var params = [];
    var query = {};
    body.params.forEach(function (item) {
        var k = dynmObj(item.columnName.toString(), item.columnValue);
        params.push(k);
    });

    if (orAnd === 'or') {
        query = { $or: params };
    } else {
        query = { $and: params };
    }
    return query;
};

var dynmObj = function dynmObj(a, b) {
    var json = _defineProperty({}, a, { '$regex': b, '$options': 'i' });

    return json;
};

var search = async function search(body, pageNo, pageSize) {
    try {
        var skip = pageNo * pageSize;
        var query = GetSearchQuery(body);
        var searchResult = await ProductModel.find(query).skip(skip).limit(pageSize);
        return searchResult;
    } catch (error) {
        throw new Error(error.message);
    }
};

var countSearch = async function countSearch(body) {
    try {
        var query = GetSearchQuery(body);
        return await ProductModel.countDocuments(query);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    dynmObj: dynmObj,
    GetSearchQuery: GetSearchQuery,
    search: search,
    countSearch: countSearch
};
//# sourceMappingURL=SearchHelper.js.map