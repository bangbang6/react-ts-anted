import React from 'react'

import Button, { BtnType, BtnSize } from './components/Button/Button'

function App() {
  return (
    <>
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
