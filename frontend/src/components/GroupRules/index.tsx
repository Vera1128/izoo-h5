/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2022-07-28 14:04:11
 * @LastEditTime: 2022-07-28 14:07:54
 */
import React from 'react'
import './index.scss'

function GroupRules() {
  return (
    <div className="groupRules">
      <p className="ruleTitle">购买需知</p>
      <ul>
        <li>关于成团：拼团时间为24小时，24小时内未凑够2人成团，已支付的费用将自动按原路退回。</li>
        <li>关于退费：本产品为虚拟内容服务，一经购买成功无法退款，敬请谅解。</li>
        <li>关于有效期：本产品购买成功后可以不限次数长期使用。</li>
        <li>关于解释权：爱走星球对本产品拥有最终法律解释。</li>
      </ul>
    </div>
  )
}

export default GroupRules
