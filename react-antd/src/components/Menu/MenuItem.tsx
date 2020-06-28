import React, { useContext } from 'react'
import { MenuContext } from './Menu'
import classNames from 'classnames'
export interface MenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

let MenuItem: React.FC<MenuItemProps> = (props) => {
  let { index, disabled, className, style, children } = props

  //创建上下文
  let context = useContext(MenuContext)
  let classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  })
  function handleClick() {
    if (context.onSelect && !disabled && typeof index === 'string') {
      console.log(index)
      context.onSelect(index)
    }
  }
  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem
