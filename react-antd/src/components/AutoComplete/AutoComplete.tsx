import React, {
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef,
} from 'react'
import Input, { InputProps } from '../Input/Input'
import Icon from '../icon/icon'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutSide'
interface DataObj {
  value: string
}
export type DataProps<T = {}> = T & DataObj
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => DataProps[] | Promise<DataProps[]>
  onSelect?: (item: string) => void
  renderOption?: (item: DataProps) => ReactElement
}

let AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  let { fetchSuggestion, onSelect, value, renderOption, ...restProps } = props
  let [inputValue, setInputValue] = useState(value as string)
  let [suggestions, setSuggestions] = useState<DataProps[]>([])
  let [loading, setLoading] = useState(false)
  let [highLightIndex, setHighLightIndex] = useState(-1)
  let trigger = useRef(false) //useRef两个作用一个和dom打交道 另外一个当作一个js变量但这个变量是和当前状态一样的不是和触发时一样的
  let componentRef = useRef<HTMLDivElement>(null)
  let debounceVal = useDebounce(inputValue) //这里面有个useeffect所以不能放到回调函数里，当inputval改变时useeffect也会自动执行
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debounceVal && trigger.current) {
      let res: DataProps[] | Promise<DataProps[]> = fetchSuggestion(debounceVal)
      setLoading(true)
      if (res instanceof Promise) {
        res.then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setLoading(false)
        setSuggestions(res)
      }
      //let newSuggestions = fetchSuggestion(key)
    } else {
      setSuggestions([])
    }
    setHighLightIndex(-1)
  }, [debounceVal, fetchSuggestion]) //effect里面需要用到外面的变量全部需要在这里写上而且会根据这些变量变化自动执行
  let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let key = e.target.value.trim()
    trigger.current = true
    setInputValue(key)
  }
  let handleClick = (key: DataProps) => {
    setInputValue(key.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(key.value)
    }
    trigger.current = false
  }
  let handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highLightIndex]) {
          handleClick(suggestions[highLightIndex])
        }
        break
      case 38:
        highlight(highLightIndex - 1)
        break
      case 40:
        highlight(highLightIndex + 1)
        break
      case 27:
        setSuggestions([])
        break
      default:
        break
    }
  }
  let highlight = (index: number) => {
    console.log(index)
    if (index < 0) setHighLightIndex(0)
    else if (index >= suggestions.length)
      setHighLightIndex(suggestions.length - 1)
    else setHighLightIndex(index)
  }
  let renderTemplate = (item: DataProps) => {
    return renderOption ? renderOption(item) : item.value
  }
  let generateADrag = () => {
    return loading ? (
      <Icon icon="spinner" spin></Icon>
    ) : (
      <ul className="viking-suggestion-list">
        {suggestions.length > 0 &&
          suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highLightIndex,
            })
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleClick(item)}
              >
                {renderTemplate(item)}
              </li>
            )
          })}
      </ul>
    )
  }
  return (
    <>
      <div className="viking-auto-complete" ref={componentRef}>
        <Input
          value={inputValue}
          {...restProps}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></Input>
        {suggestions.length > 0 && generateADrag()}
      </div>
    </>
  )
}
export default AutoComplete
