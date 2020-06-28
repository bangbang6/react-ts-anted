import React, { useState } from 'react'

import Button, { BtnType, BtnSize } from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'

import Icon from './components/icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' //所有图标引入
import Transition from './components/Transition/transition'
library.add(fas) //把所有图标加入库中
function App() {
  let [show, setShow] = useState(false)
  return (
    <>
      <Icon icon="coffee" theme="danger" size="lg"></Icon>
      <Icon icon="spinner" theme="primary" size="lg"></Icon>
      <Menu defaultOpenSubMenus={['3']}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link2</MenuItem>
        <MenuItem>cool link3</MenuItem>
        <SubMenu title="dragDown">
          <MenuItem>dragDown link</MenuItem>
          <MenuItem>dragDown link2</MenuItem>
          <MenuItem>dragDown link3</MenuItem>
        </SubMenu>
      </Menu>

      <Button>hello</Button>
      <Button btnType={BtnType.Primary} disabled size={BtnSize.Large}>
        hello
      </Button>
      <Button
        btnType={BtnType.Danger}
        classname="btnP"
        size={BtnSize.Small}
        onClick={() => {
          alert(1)
        }}
      >
        hello
      </Button>
      <Button btnType={BtnType.Link} href="https://www.baidu.com">
        hello
      </Button>
      <Button btnType={BtnType.Link} href="https://www.baidu.com" disabled>
        hello
      </Button>

      <Button onClick={() => setShow(!show)}> toggle</Button>
      <Transition in={show} timeout={300} animation="zoom-in-top">
        <div>
          <p>test transiiton</p>
          <p>est transiiton</p>
          <p>test transiiton</p>
          <p>test transiiton</p>
          <p>test transiiton</p>
        </div>
      </Transition>
      <Transition in={show} timeout={300} animation="zoom-in-top" wrapper>
        <Button btnType={BtnType.Primary} size={BtnSize.Large}>
          hello
        </Button>
      </Transition>
    </>
  )
}

export default App
