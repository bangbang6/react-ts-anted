import { useState, useEffect } from 'react'

let useDebounce = (val: any, delay: number = 300) => {
  let [debounceVal, setDebounceVal] = useState(val)
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceVal(val)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [val, delay])
  return debounceVal
}

export default useDebounce
