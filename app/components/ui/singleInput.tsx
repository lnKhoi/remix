import {
  FC,
  InputHTMLAttributes,
  memo,
  useLayoutEffect,
  useRef,
} from 'react';

import usePrevious from '~/hooks/usePrevious';

export type SingleOTPInputProps = InputHTMLAttributes<HTMLInputElement> & {
  focus?: boolean
}

const SingleCharacterInput: FC<SingleOTPInputProps> = (props) => {
  const { focus, autoFocus, className, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const prevFocus = usePrevious(!!focus)

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])

  return (
    <input
      className={`no-spin text-center border-y text-3xl font-medium bg-transparent border-l 
  w-[73.333px] h-[94px] 
  focus:outline-none focus:border-blue border-gray-400 focus:border ${className}`}
      ref={inputRef}
      {...rest}
    />
  )
}

export default memo(SingleCharacterInput)
