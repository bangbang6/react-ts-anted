import React from 'react'
import classNames from 'classnames'
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome'

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

let Icon: React.FC<IconProps> = (props) => {
  let { theme, className, ...restProps } = props
  let classes = classNames(className, 'viking-icon', {
    [`icon-${theme}`]: theme,
  })
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
}

export default Icon
