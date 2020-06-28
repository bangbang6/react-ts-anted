import React from 'react'

import Button, { BtnType, BtnSize } from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
function App() {
  return (
    <>
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
    </>
  )
}

export default App
