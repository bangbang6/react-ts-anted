import React from 'react'

import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
let testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}
let testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}

let NiceMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>cool link3</MenuItem>
      <SubMenu title="drag">
        <MenuItem>drag1</MenuItem>
        <MenuItem disabled>drag3</MenuItem>
        <MenuItem>drag2</MenuItem>
      </SubMenu>
    </Menu>
  )
}
let createStyleFile = () => {
  let cssFile: string = `
  .viking-submenu {
    display:none
  }
  .viking-submenu.menu-opened{
    display:block
  }


  `
  let style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuEle: HTMLElement,
  activeEle: HTMLElement,
  disabledEle: HTMLElement
describe('test menu function', () => {
  //每个case前面均会跑
  beforeEach(() => {
    wrapper = render(NiceMenu(testProps))
    //container是html元素
    wrapper.container.append(createStyleFile())
    menuEle = wrapper.getByTestId('test-menu')
    activeEle = wrapper.getByText('active')
    disabledEle = wrapper.getByText('disabled')
  })
  test('should render with  default props', () => {
    expect(menuEle).toBeInTheDocument()
    expect(menuEle).toHaveClass('viking-menu')
    //expect(menuEle.getElementsByTagName('li').length).toBe(3)
    expect(activeEle).toHaveClass('menu-item is-active')
    expect(disabledEle).toHaveClass('menu-item is-disabled')
  })

  test('click item should change active', () => {
    let thirdItem = wrapper.getByText('cool link3')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeEle).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledEle)
    expect(disabledEle).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  test('mode = vectical should have the correct class', () => {
    cleanup()
    wrapper = render(NiceMenu(testVerProps))
    let menuEle = wrapper.getByTestId('test-menu')
    expect(menuEle).toHaveClass('menu-vertical')
  })

  test('subMenu when hover can get the ele', async () => {
    //querybytest可以返回一个没出先的html元素为undeied 但是gettextbyid不会返回undefined 直接报错
    expect(wrapper.queryByText('drag1')).not.toBeVisible()
    let dragele = wrapper.getByText('drag')

    fireEvent.mouseEnter(dragele)
    await wait(() => {
      expect(wrapper.queryByText('drag1')).toBeVisible()
    })

    fireEvent.click(wrapper.getByText('drag1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

    fireEvent.mouseLeave(dragele)
    await wait(() => {
      expect(wrapper.queryByText('drag1')).not.toBeVisible()
    })
  })
})
