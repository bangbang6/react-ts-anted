import React from 'react'

import { render } from '@testing-library/react'

import Button from './Button'
/* test('our first react test ', () => {
  let wraper = render(<Button>Nice</Button>) //dom元素渲染
  let ele = wraper.queryByText('Nice')
  expect(ele).toBeTruthy()
  expect(ele).toBeInTheDocument()
})
 */

describe('test button component', () => {
  test('should render the defalut button', () => {
    let wraper = render(<Button>Nice</Button>)
    let ele = wraper.getByText('Nice')

    expect(ele.tagName).toEqual('BUTTON')
    expect(ele).toHaveClass('btn btn-default')
  })
  test('should render the diffenert props button', () => {})
  test('should render a link when href is privoide', () => {})
  test('test render disabled button', () => {})
})
