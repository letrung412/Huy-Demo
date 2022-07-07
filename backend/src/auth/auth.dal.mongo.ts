import { CustomerAuthNS } from "./auth";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes, MongoModel } from "../lib/mongodb";

export class CustomerAuthDALMongo implements CustomerAuthNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {}

    private col_customer_secret = this.db.collection<MongoModel<CustomerAuthNS.CustomerSecret>>("customer_secret");
    private col_customer_session = this.db.collection<MongoModel<CustomerAuthNS.CustomerSession>>("customer_session");

    async SaveCustomerSecret(obj: CustomerAuthNS.CustomerSecret) {
        await this.col_customer_secret.updateOne({
            customer_id: obj.customer_id,
            name: obj.name
        }, {
            $set: {
                customer_id: obj.customer_id,
                name: obj.name,
                value: obj.value,
            }
        }, { upsert: true });
    }

    async GetCustomerSecret(customer_id: string, name: string) {
        const doc = await this.col_customer_secret.findOne({ customer_id, name });
        return FromMongoData.One<CustomerAuthNS.CustomerSecret>(doc);
    }

    async CreateCustomerSession(session: CustomerAuthNS.CustomerSession) {
        const doc = ToMongoData.One(session);
        await this.col_customer_session.insertOne(doc);
    }

    async GetCustomerSession(id: string) {
        const doc = await this.col_customer_session.findOne({_id : id});
        return FromMongoData.One<CustomerAuthNS.CustomerSession>(doc);
    }

    async GetSessionByCustomer(user_id : string) {
        const docs = await this.col_customer_session.find({ user_id }).toArray();
        return FromMongoData.Many<CustomerAuthNS.CustomerSession>(docs);
    }

    async DisableSession(session : CustomerAuthNS.CustomerSession) {
        const doc = ToMongoData.One(session);
        await this.col_customer_session.updateOne({_id : session.id} , {$set : doc});
    }

    async RemovePassword(customer_id: string){
        const secret= await this.col_customer_secret.findOne({customer_id: customer_id});
        await this.col_customer_secret.deleteOne({_id:secret._id})
    }
}
