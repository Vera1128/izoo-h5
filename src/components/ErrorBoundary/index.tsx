import React, { Component } from 'react'
import Error from 'components/Error'
import sentry from 'utils/sentry'

interface IProps {
  children: any
}

type IState = Partial<{
  msg: string
  hasError: boolean
}>

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      msg: '',
      hasError: false,
    }
  }

  componentDidCatch(error: Error) {
    this.setState({
      msg: error.message,
      hasError: true,
    })
    this.uploadErrorInfo(error)
  }

  // 上报错误信息
  uploadErrorInfo(error: Error) {
    // 上报操作
    sentry?.SentryRepost?.(error)
  }

  render() {
    const { msg, hasError } = this.state
    if (hasError) {
      // 组件加载出错
      return <Error errMsg={msg} />
    }
    // 正常页面，渲染子组件
    return this.props.children
  }
}
export default ErrorBoundary
