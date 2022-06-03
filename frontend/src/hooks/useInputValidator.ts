import { useCallback, useEffect, useState } from 'react'

type Trigger = 'blur' | 'focus' | 'change' | 'submit'

type Validator = (value: number | string) => boolean

export interface UseInputValidatorResult {
  isValid: boolean
  input: number | string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onValid: (value: number | string) => boolean
  setVaildMsg?: (valid?: boolean, msg?: string) => void
  message?: string
}

/**
 * @description input 校验hooks
 * @param {Validator} validator 校验函数
 * @param {trigger} trigger 触发校验函数事件类型 目前仅支持 change
 * @param {options} options 其它配置
 * @returns {UseInputValidatorResult}
 */
const useInputValidator = (
  validator: Validator,
  trigger: Trigger | Trigger[] = 'change',
  options?: {
    maxLength: number
    defalutValue?: number | string
    message?: string
  },
): UseInputValidatorResult => {
  const [msg, setMsg] = useState(options?.message || '')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [input, setInput] = useState<number | string>(options?.defalutValue)
  const onValid = useCallback(
    (val: number | string) => {
      const valid = !validator?.(val)
      setMsg('')
      setIsValid(valid)
      return valid
    },
    [trigger],
  )
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value
    if (options?.maxLength && `${val}`?.length > options?.maxLength) {
      return
    }
    if (
      (typeof trigger === 'string' && trigger === 'change') ||
      (trigger instanceof Array && trigger.includes('change'))
    ) {
      onValid(val)
    } else {
      const valid = validator?.(val)
      if (valid) {
        setIsValid(!valid)
      }
    }
    setInput(val)
  }, [])
  useEffect(() => {
    setInput(options?.defalutValue)
  }, [options?.defalutValue])

  return {
    isValid,
    input,
    onChange,
    onValid,
    setVaildMsg: (valid?: boolean, msg?: string) => {
      setIsValid(valid)
      setMsg(msg)
    },
    message: msg,
  }
}

export default useInputValidator
