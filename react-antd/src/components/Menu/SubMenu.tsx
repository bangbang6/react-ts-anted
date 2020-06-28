import React, { useContext, useState } from 'react'
import { MenuItemProps } from './MenuItem'
import classNames from 'classnames'

import { MenuContext } from './Menu'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

let SubMenu: React.FC<SubMenuProps> = (props) => {
  let { title, index, className, children } = props
  let context = useContext(MenuContext)
  let classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  })
  let openSubMenus = context.defaultOpenSubMenus as string[]
  let isOpend =
    index && context.mode === 'vertical' ? openSubMenus.includes(index) : false
  let [menuOpen, setMenuOpen] = useState(isOpend)
  let timer: any
  let handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)

    e.preventDefault()
    //测试是不会等这个异步的·
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  let handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}

  let hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}

  let renderChildren = () => {
    let subMenuClass = classNames('viking-submenu', { 'menu-opened': menuOpen })
    let childrenComponent = React.Children.map(children, (child, i) => {
      let childEle = child as React.FunctionComponentElement<MenuItemProps>
      if (childEle.type.displayName === 'MenuItem') {
        //可以把第二个参数的index属性放到i组件上
        return React.cloneElement(childEle, { index: `${index}-${i}` })
      } else {
        console.error('Warning:Mune has a child which is not a MenuItem')
      }
    })

    return <ul className={subMenuClass}>{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="subMenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
