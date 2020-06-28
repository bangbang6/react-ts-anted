import React from 'react'
import classNames from 'classnames'

export enum BtnType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

export enum BtnSize {
  Large = 'lg',
  Small = 'sm',
}
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> //button原始属性
type NativeAnchorProps = React.AnchorHTMLAttributes<HTMLElement> //a链接原始属性
interface BaseButtonProps {
  btnType?: BtnType
  size?: BtnSize
  disabled?: boolean
  classname?: string
  children: React.ReactNode
  href?: string
} //自己定义的button类型
//交叉类型  用& 是并集
type buttonTypes = NativeButtonProps & BaseButtonProps
type finalButtonTypes = Partial<buttonTypes & NativeAnchorProps> //partial 表示里面属性都可选
let Button: React.FC<finalButtonTypes> = (props: finalButtonTypes) => {
  let {
    children,
    btnType,
    size,
    disabled,
    href,
    classname,
    ...resprops
  } = props
  let classes = classNames('btn', classname, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === BtnType.Link && disabled,
  })

  if (btnType === BtnType.Link && href) {
    return (
      <a className={classes} href={href} {...resprops}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...resprops}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: BtnType.Default,
}

export default Button
