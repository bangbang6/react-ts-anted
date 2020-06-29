import React, { useState, ChangeEvent, ReactElement } from 'react'
import Input, { InputProps } from '../Input/Input'

interface DataObj {
  value: string
}
export type DataProps<T = {}> = T & DataObj
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => DataProps[]
  onSelect?: (item: string) => void
  renderOption?: (item: DataProps) => ReactElement
}

let AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  let { fetchSuggestion, onSelect, value, renderOption, ...restProps } = props
  let [inputValue, setInputValue] = useState(value)
  let [suggestions, setSuggestions] = useState<DataProps[]>([])
  let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let key = e.target.value.trim()
    let newSuggestions: DataProps[] = []
    setInputValue(key)
    if (key) {
      newSuggestions = fetchSuggestion(key)
    }
    //let newSuggestions = fetchSuggestion(key)
    setSuggestions(newSuggestions)
  }
  /* let handleClick = (key: DataProps) => {
    setInputValue(key.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(key.value)
    }
  } */
  let renderTemplate = (item: DataProps) => {
    return renderOption ? renderOption(item) : <li>item.value</li>
  }
  return (
    <>
      <Input value={inputValue} {...restProps} onChange={handleChange}></Input>
      <ul>
        {suggestions.length > 0 &&
          suggestions.map((item, index) => {
            {
              return renderTemplate(item)
            }
          })}
      </ul>
    </>
  )
}
export default AutoComplete
