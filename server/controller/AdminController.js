import AdminService from "../services/AdminService";
import { Tracer } from "../utils/Logger";
import STATUS from "../utils/HttpResponse";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../utils/config";


export default class AdminController {
    static async NewAdmin(req, res) {
        try {
            const { username, password, email } = req.body;
            console.log(req.body);
            if(!username || !password || !email) {
                return res.status(400).json({
                    STATUS: STATUS.STATUS_BAD_REQUEST.code,
                    MESSAGE: STATUS.STATUS_BAD_REQUEST.response
                });
            }
            else {
                const hashed = bcrypt.hashSync(password, 10);
                const data = await AdminService.createAdmin(req.body);
                data.password = hashed;
                await data.save();
                return res.status(201).json({
                    STATUS: STATUS.STATUS_CREATED.code,
                    MESSAGE: STATUS.STATUS_CREATED.response
                });
            }
        } catch (error) {
            Tracer("CREATE ADMIN", error.message, error);
            return res.status(500).json({
                STATUS: STATUS.STATUS_SERVER_ERROR.code,
                MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
            });
        }
    }


    static async LoginAdmin(req, res) {
        try {
            const { email, password } = req.body;
            if(!email || !password) {
                return res.status(400).json({
                    STATUS: STATUS.STATUS_BAD_REQUEST.code,
                    MESSAGE: STATUS.STATUS_BAD_REQUEST.response
                });
            }
            else {
                let Admin = await AdminService.getAdminEmail(email);
                if(!Admin) {
                    return res.status(404).json({
                        STATUS: STATUS.STATUS_NOTFOUND.code,
                        MESSAGE: STATUS.STATUS_NOTFOUND.response
                    });
                }
                else {
                    const passwordIsValid = bcrypt.compareSync(password, Admin.password);
                    if(!passwordIsValid) {
                        return res.status(404).json({
                            STATUS: STATUS.STATUS_NOTFOUND.code,
                            MESSAGE: STATUS.STATUS_NOTFOUND.response
                        });
                    }
                    else {
                        const token = await jwt.sign({ id: Admin._id, email: Admin.email, username: Admin.username }, config.LOGIN_SECRET, {expiresIn: 8600});
                        return res.status(200).json({
                            STATUS: STATUS.STATUS_OK.code,
                            MESSAGE: STATUS.STATUS_OK.response,
                            Token: token
                        });
                    }
                }
            }
        } catch (error) {
            Tracer("LOGIN ADMIN", error.message, error);
            return res.status(500).json({
                STATUS: STATUS.STATUS_SERVER_ERROR.code,
                MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
            });
        }
    }

    static async GetAdmins(req, res) {
        try {
            const data = await AdminService.getAdmins();
            if(data.length > 0) {
                return res.status(200).json({
                    info: data
                });
            }
            else {
                return res.status(404).json({
                    STATUS: STATUS.STATUS_NOTFOUND.code,
                    MESSAGE: STATUS.STATUS_NOTFOUND.response
                });
            }
        } catch (error) {
            Tracer("RETURN ADMIN", error.message, error);
            return res.status(500).json({
                STATUS: STATUS.STATUS_SERVER_ERROR.code,
                MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
            });
        }
    }

    static async GetAdmin(req, res) {
        try {
            const { adminId } = req.params;
            const data = await AdminService.getAdmin(adminId);
            if(data) {
                return res.status(200).json({
                    info: data
                });
            }
            else {
                return res.status(404).json({
                    STATUS: STATUS.STATUS_NOTFOUND.code,
                    MESSAGE: STATUS.STATUS_NOTFOUND.response
                });
            }
        } catch (error) {
            Tracer("RETURN ADMIN", error.message, error);
            return res.status(500).json({
                STATUS: STATUS.STATUS_SERVER_ERROR.code,
                MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
            });
        }
    }

    static async DeleteAdmin(req, res) {
        try {
            const { adminId } = req.params;
            const data = await AdminService.deleteAdmin(adminId);
            if(data) {
                return res.status(200).json({
                    info: data
                });
            }
            else {
                return res.status(404).json({
                    STATUS: STATUS.STATUS_NOTFOUND.code,
                    MESSAGE: STATUS.STATUS_NOTFOUND.response
                });
            }
        } catch (error) {
            Tracer("DELETE ADMIN", error.message, error);
            return res.status(500).json({
                STATUS: STATUS.STATUS_SERVER_ERROR.code,
                MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
            }); 
        }
    }
}
