import { Tracer } from "../utils/Logger";
import Model from "../model/Service";

export default class RenderService {
    static async getServices() {
        try {
           return await Model.find({}).sort({" _id": -1 });
        } catch (error) {
            Tracer("Get Service", error.message, error);
        }
    }

    static async getService(serviceId) {
        try {
            return await Model.findOne({ _id: serviceId });
        } catch (error) {
            Tracer("Get Service", error.message, error);
        }
    }

    static async deleteService(serviceId) {
        try {
            return await Model.findOneAndRemove({ _id: serviceId });
        } catch (error) {
            Tracer("Delete Service", error.message, error);
        }
    }

    static async createService(payload) {
        try {
            return await Model.create(payload);
        } catch (error) {
            Tracer("Delete Service", error.message, error);
        }
    }
}