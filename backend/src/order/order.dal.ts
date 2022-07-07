import { OrderNS } from "./order";
import { Db } from "mongodb";
import {
  FromMongoData,
  MongoErrorCodes,
  MongoModel,
  ToMongoData,
} from "../lib/mongodb";
import { FilterData } from "../common/filter_data_handlers";
import {startOfWeek,endOfWeek,startOfDay,endOfDay} from "date-fns"

export class OrderMongoDAL implements OrderNS.DAL {
  constructor(private db: Db) {}
  private col_order = this.db.collection<MongoModel<OrderNS.Order>>("order");
  private col_item = this.db.collection<MongoModel<OrderNS.Item>>("item");

  async init() {}

  async ListItem(product_id: string) {
    const items = await this.col_item
      .find({ product_id: product_id })
      .toArray();
    return FilterData.Many(FromMongoData.Many<OrderNS.Item>(items));
  }
  async GetItem(order_id: string) {
    const item = await this.col_item.findOne({ order_id: order_id });
    return FromMongoData.One<OrderNS.Item>(item);
  }

  async CreateItem(item: OrderNS.Item) {
    const doc = ToMongoData.One<OrderNS.Item>(item);
    try {
      await this.col_item.insertOne(doc);
    } catch (error) {
      if (error.code === MongoErrorCodes.Duplicate) {
        throw OrderNS.Errors.ItemExists;
      }
      throw error;
    }
  }

  async UpdateItem(item: OrderNS.Item) {
    const doc = ToMongoData.One<OrderNS.Item>(item);
    try {
      await this.col_item.updateOne({ _id: item.id }, { $set: doc });
    } catch (error) {
      throw error;
    }
  }

  async ListOrder(query:OrderNS.QueryOrderParams) {
    const filter={} as any
    if(query.status){
      filter.status = query.status
    }

    if(query.customer_id){
      filter.customer_id = query.customer_id
    }

    const orders = await this.col_order
        .find(filter)
        .toArray();
      return FromMongoData.Many<OrderNS.Order>(orders);
    
  }



  async GetOrder(id: string) {
    const order = await this.col_order.findOne({ _id: id });
    return FromMongoData.One<OrderNS.Order>(order);
  }

  async CreateOrder(order: OrderNS.Order) {
    const doc = ToMongoData.One<OrderNS.Order>(order);
    try {
      await this.col_order.insertOne(doc);
    } catch (error) {
      if (error.code === MongoErrorCodes.Duplicate) {
        throw OrderNS.Errors.OrderExist;
      }
      throw error;
    }
  }

  async UpdateOrder(order: OrderNS.Order) {
    const doc = ToMongoData.One<OrderNS.Order>(order);
    try {
      await this.col_order.updateOne({ _id: order.id }, { $set: doc });
    } catch (error) {
      throw error;
    }
  }

  async ListOrderByReport(query:OrderNS.QueryReport){
    if(query===OrderNS.QueryReport.WEEK){
        const start=startOfWeek(Date.now()).getTime()
        const end=endOfWeek(Date.now()).getTime()
        const orders=await this.col_order.find({status:OrderNS.OrderStatus.DONE,mtime:{$gte:start,$lte:end}}).toArray()
        return FromMongoData.Many<OrderNS.Order>(orders)
    }
    if(query===OrderNS.QueryReport.DAY){
        const start=startOfDay(Date.now()).getTime()
        const end=endOfDay(Date.now()).getTime()
        const orders=await this.col_order.find({status:OrderNS.OrderStatus.DONE,mtime:{$gte:start,$lte:end}}).toArray()
        return FromMongoData.Many<OrderNS.Order>(orders)
    }
}

}
