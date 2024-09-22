import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import SingleCharacterInput from './singleInput';

export type InputOTPProps = {
  length: number
  value: string
  onChange: (otp: string) => void
  autoFocus?: boolean
  isNumberInput?: boolean
  disabled?: boolean
  className?: string
  inputClassName?: string
  otpClassName?: string
  type?: 'text' | 'number'
}

const InputOTP: FC<InputOTPProps> = (props) => {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    value,
    onChange,
    inputClassName,
    otpClassName,
    ...rest
  } = props

  const [activeInput, setActiveInput] = useState<number>(0)
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''))

  useEffect(() => {
    if (value === '') {
      setOTPValues(Array<string>(length).fill(''))
      setActiveInput(0)
    }
  }, [value, length])

  // Helper to return OTP from inputs
  const handleCharacterChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('')
      onChange(otpValue)
    },
    [onChange]
  )

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (value: string) => {
      const changedValue = value
      if (!isNumberInput || !changedValue) {
        return changedValue
      }
      return Number(changedValue) >= 0 ? changedValue : ''
    },
    [isNumberInput]
  )

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (stringValue: string) => {
      const updatedOTPValues = [...otpValues]
      updatedOTPValues[activeInput] = stringValue[0] || ''
      setOTPValues(updatedOTPValues)
      handleCharacterChange(updatedOTPValues)
    },
    [activeInput, handleCharacterChange, otpValues]
  )

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
      setActiveInput(selectedIndex)
    },
    [length]
  )

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1)
  }, [activeInput, focusInput])

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1)
  }, [activeInput, focusInput])

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index)
    },
    [focusInput]
  )

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = getRightValue(e.currentTarget.value)
      if (!value) {
        e.preventDefault()
        return
      }
      changeCodeAtFocus(value)
      focusNextInput()
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  )

  // Handle onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1)
  }, [])

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const pressedKey: string = e.key

      switch (pressedKey) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault()
          if (otpValues[activeInput]) {
            changeCodeAtFocus('')
          } else {
            focusPrevInput()
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          focusPrevInput()
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          focusNextInput()
          break
        }
        default: {
          // if (pressedKey.match(NOT_ALLOW_SEPCIAL_CHARACTER)) {
          //   e.preventDefault()
          // }
          break
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  )

  const handleOnPaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('')

      if (pastedData) {
        let nextFocusIndex = 0
        const updatedOTPValues = [...otpValues]
        updatedOTPValues.forEach((value: string, index: number) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || value)
            if (changedValue) {
              updatedOTPValues[index] = changedValue
              nextFocusIndex = index
            }
          }
        })

        setOTPValues(updatedOTPValues)
        handleCharacterChange(updatedOTPValues)
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
      }
    },
    [activeInput, getRightValue, length, otpValues, handleCharacterChange]
  )

  return (
    <div
      className="bg-gray-500 w-fit border-none flex overflow-hidden justify-start rounded-lg"
      {...rest}
    >
      {Array(length)
        .fill('')
        .map((_: unknown, index: number) => (
          <SingleCharacterInput
            key={`SingleInput-${index}`}
            type={rest.type}
            focus={activeInput === index}
            value={otpValues && otpValues[index]}
            autoFocus={autoFocus}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
            onPaste={handleOnPaste}
            disabled={disabled}
            className={` ${
              index === 0
                ? 'rounded-s-lg border-l'
                : index === length - 1
                ? 'rounded-e-lg border-r'
                : ''
            } ${inputClassName}`}
          />
        ))}
    </div>
  )
}

export default memo(InputOTP)
