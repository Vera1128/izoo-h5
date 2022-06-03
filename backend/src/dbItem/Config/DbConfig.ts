/**
 * 存放全局配置
 */
export interface DbConfig {
  /** 配置名 */
  _id: 'AccessToken' | 'Ticket',
  /** 数据 */
  data: Partial<AccessTokenItem & TicketItem>,
  /** 更新时间 */
  updateTime: Date
}

/**
 * 全局token 数据
 * 根据expires_in 进行到期处理
 */
interface AccessTokenItem {
  access_token: string,
  expires_in: number,
}

/**
 * 全局ticket 数据
 * 根据expires_in 进行到期处理
 */
interface TicketItem {
  ticket: string,
  expires_in: number,
}