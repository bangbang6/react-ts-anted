import { RefObject, useEffect } from 'react'

let useClickOutside = function (
  ref: RefObject<HTMLElement>,
  handler: Function
) {
  useEffect(() => {
    //当ref时dom元素连用时ref.current指的是dom元素 否则是初始化的一个变量更新

    let listener = (e: MouseEvent) => {
      //console.log('监听')
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return
      }
      //console.log(ref.current)
      handler(e)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}
export default useClickOutside
