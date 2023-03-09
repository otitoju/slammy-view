import { Tracer } from "../utils/Logger";
import Model from "../model/Product";

export default class ProductService {
    static async getProducts() {
        try {
           return await Model.find({}).sort({" _id": -1 });
        } catch (error) {
            Tracer("Get Products", error.message, error);
        }
    }

    static async getProduct(productId) {
        try {
            return await Model.findOne({ _id: productId });
        } catch (error) {
            Tracer("Get Product", error.message, error);
        }
    }

    static async deleteProduct(productId) {
        try {
            return await Model.findOneAndRemove({ _id: productId });
        } catch (error) {
            Tracer("Delete Product", error.message, error);
        }
    }

    static async createProduct(payload) {
        try {
            return await Model.create(payload);
        } catch (error) {
            Tracer("Delete Product", error.message, error);
        }
    }
}