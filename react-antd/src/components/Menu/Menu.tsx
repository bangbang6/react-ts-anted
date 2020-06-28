import React, { useState, createContext } from 'react'
import { MenuItemProps } from './MenuItem'
import classNames from 'classnames'
type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: (selectIndex: string) => void
  defaultOpenSubMenus?: string[]
}
interface IMenuContext {
  index: string
  onSelect?: (selectIndex: string) => void
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}
export let MenuContext = createContext<IMenuContext>({ index: '0' }) //创建上下文

let Menu: React.FC<MenuProps> = (props) => {
  let {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props
  let [currentIndex, setCurrentIndex] = useState(defaultIndex)
  let classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  function handleClick(index: string) {
    setCurrentIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  let renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      let childEle = child as React.FunctionComponentElement<MenuItemProps>
      let { displayName } = childEle.type

      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childEle, { index: index.toString() })
      } else {
        console.error('Warning:Mune has a child which is not a MenuItem')
      }
    })
  }
  //创建上下文的链接对象
  let passContext: IMenuContext = {
    index: currentIndex ? currentIndex : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus: defaultOpenSubMenus,
  }
  return (
    <ul style={style} className={classes} data-testid="test-menu">
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu
