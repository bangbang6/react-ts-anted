import React, { useState } from 'react'

import Button, { BtnType, BtnSize } from './components/Button/Button'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Input from './components/Input/Input'
import Icon from './components/icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' //所有图标引入
import Transition from './components/Transition/transition'
import AutoComplete, { DataProps } from './components/AutoComplete/AutoComplete'
library.add(fas) //把所有图标加入库中
function App() {
  let [show, setShow] = useState(false)
  interface Player {
    value: string
    number: number
  }
  let handleFetch = (key: string) => {
    /* const lakers = [
      'bradley',
      'pope',
      'caruso',
      'cook',
      'cousins',
      'james',
      'AD',
      'green',
      'howard',
      'kuzma',
      'McGee',
      'rando',
    ]
    return lakers.filter((item) => item.includes(key)).map((item,index)=>{return {value:item}}) */

    const lakersWithNumber = [
      { value: 'bradley', number: 11 },
      { value: 'pope', number: 1 },
      { value: 'caruso', number: 4 },
      { value: 'cook', number: 2 },
      { value: 'cousins', number: 15 },
      { value: 'james', number: 23 },
      { value: 'AD', number: 3 },
      { value: 'green', number: 14 },
      { value: 'howard', number: 39 },
      { value: 'kuzma', number: 0 },
    ]
    return lakersWithNumber.filter((item, index) => {
      return item.value.includes(key)
    })
  }
  let renderOptions = (key: DataProps) => {
    let keyPlayer = key as DataProps<Player>
    return (
      <>
        <p>
          value = {keyPlayer.value} number = {keyPlayer.number}
        </p>
      </>
    )
  }
  let onSelect = (key: string) => {
    console.log('你出发啦自己1的onslelect' + key)
  }
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

      <Input placeholder="this is input" prepend="https://"></Input>
      <Input placeholder="this is smallinput" append=".com" size="sm"></Input>
      <Input
        placeholder="this is  input"
        icon="coffee"
        prepend="https://"
      ></Input>
      <div>
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
      </div>

      <AutoComplete
        fetchSuggestion={handleFetch}
        onSelect={onSelect}
        renderOption={renderOptions}
      ></AutoComplete>
    </>
  )
}

export default App
