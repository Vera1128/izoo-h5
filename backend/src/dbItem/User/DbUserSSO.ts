import { ObjectId } from "mongodb";

export interface DbUserSSO {
    _id: ObjectId,
    /* 用户唯一 id */
    userId: string,
}