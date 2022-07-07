import * as express from 'express';
import { HttpError, HttpStatusCodes, HttpParamValidators } from '../lib/http';
import { CustomerAuthNS } from './auth';
import { NewAuthMiddleware, GetAuthData } from './auth.api.middleware';
import { CustomerNS } from "../customer/customer";

export function NewAuthAPI(
    custmerAuthBLL: CustomerAuthNS.BLL,
) {
    const router = express.Router();

    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        try {
            const session = await custmerAuthBLL.Login(username, password);
            res.json(session);
        } catch (e) {
            switch (e) {
                case CustomerNS.Errors.CustomerNotFound:
                case CustomerAuthNS.Errors.ErrWrongPassword:
                case CustomerAuthNS.Errors.ErrCustomerHasNoLogin:
                    throw new HttpError(e.message, HttpStatusCodes.Unauthorized);
                default:
                    throw e;
            }
        }
    });

    router.post("/customer/set_password", async (req, res) => {
        const customer_id = HttpParamValidators.MustBeString(req.body, 'customer_id', 4);
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await custmerAuthBLL.SetPassword(customer_id, password);
        res.json(1);
    });
    router.use(NewAuthMiddleware(custmerAuthBLL));
    router.get("/me", async (req, res) => {
        const session = GetAuthData(req);
        try {
            const customer = await custmerAuthBLL.GetCustomer(session.customer_id);
            res.json({ session, customer });
        } catch (e) {
            if (e === CustomerNS.Errors.CustomerNotFound) {
                throw new HttpError(e.message, HttpStatusCodes.Unauthorized);
            } else {
                throw e;
            }
        }
    });
    router.get("/me/set_password", async (req, res) => {
        const session = GetAuthData(req);
        const password = HttpParamValidators.MustBeString(req.body, 'password', 6);
        await custmerAuthBLL.SetPassword(session.customer_id, password);
        res.json(1);
    });
    
    return router;
}