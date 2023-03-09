const ProductModel = require('../models/Product');

const GetSearchQuery = (body) => {
    const orAnd = body.orAnd.toLowerCase();
    const params = [];
    let query = {}
    body.params.forEach((item) => {
        const k = dynmObj(item.columnName.toString(), item.columnValue);
        params.push(k);
    });

    if(orAnd === 'or') {
        query = { $or: params }
    }
    else {
        query = { $and: params }
    }
    return query;
}

const dynmObj = (a, b) => {
    var json = {
        [a]: { '$regex': b, '$options': 'i'}
    }

    return json;
}

const search = async (body, pageNo, pageSize) => {
    try {
        const skip = pageNo * pageSize;
        const query = GetSearchQuery(body);
        const searchResult = await ProductModel.find(query).skip(skip).limit(pageSize);
        return searchResult;
    } catch (error) {
        throw new Error(error.message);
    }
}

const countSearch = async (body) => {
    try {
        const query = GetSearchQuery(body);
        return await ProductModel.countDocuments(query);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    dynmObj,
    GetSearchQuery,
    search,
    countSearch
}
