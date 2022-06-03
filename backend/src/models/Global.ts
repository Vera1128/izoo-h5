import { Collection, Db, MongoClient } from "mongodb";
import { Logger } from "tsrpc";
import { BackConfig } from "../configs/BackConfig";
import { CollectionType } from "../dbItem/CollectionType";
import Redis from 'ioredis'

export class Global {

  static realIp: string;

  static db: Db;
  static redis: Redis.Redis

  static async init(logger?: Logger) {
    /** 
     * 初始化
     * 例如数据库
     */
    this.db = await this._initMongoDb(BackConfig.MongoURI, logger)
    /**
     * 初始化
     * redis
     */
    this._initRedis(logger)
  }

  /**
   * mongodb init
   * @param 数据库地址
   * @returns 
   */
  private static _initMongoDb(uri: string, logger?: Logger): Promise<Db> {

    // logger?.debug(`mongoURI 连接地址:${uri}`)

    let promise = new Promise<Db>((resolve, reject) => {

      MongoClient.connect(uri, (err, client) => {

        if (err) {

          logger?.error(`x Mongodb 连接失败， 错误信息：${err}`)

          reject(err)

        } else {

          logger?.log(`√ 数据库连接成功~`)

          resolve(client!.db())

        }

      })
    })
    return promise
  }


  /**
   * redis init
   * @param redis 地址 
   * @returns 
   */
  private static _initRedis(logger?: Logger) {
    try {
      this.redis = new Redis({
        host: BackConfig.Redis.host,
        port: BackConfig.Redis.port,
        password: BackConfig.Redis.password,
        db: BackConfig.Redis.db
      })
      logger?.log(`√ Redis连接成功~`)
    } catch (error) {
      logger?.error(`x Redis连接异常~`)

    }

  }

  /**
   * MongoDB Collection
   */
  static collection<T extends keyof CollectionType>(col: T): Collection<CollectionType[T]> {
    return this.db.collection(col)
  }
}