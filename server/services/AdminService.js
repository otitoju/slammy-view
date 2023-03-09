import { Tracer } from "../utils/Logger";
import Model from "../model/Admin";

export default class AdminService {
    static async getAdmins() {
        try {
           return await Model.find({}).sort({" _id": -1 });
        } catch (error) {
            Tracer("Get Admins", error.message, error);
        }
    }

    static async getAdmin(adminId) {
        try {
            return await Model.findOne({ _id: adminId });
        } catch (error) {
            Tracer("Get Admin", error.message, error);
        }
    }

    static async getAdminEmail(email) {
        try {
            return await Model.findOne({ email: email });
        } catch (error) {
            Tracer("Get Admin Email", error.message, error);
        }
    }

    static async deleteAdmin(adminId) {
        try {
            return await Model.findByIdAndRemove({ _id: adminId });
        } catch (error) {
            Tracer("Delete Admin", error.message, error);
        }
    }

    static async createAdmin(payload) {
        try {
            return await Model.create(payload);
        } catch (error) {
            Tracer("Create Admin", error.message, error);
        }
    }
}