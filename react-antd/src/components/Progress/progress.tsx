import React from 'react'
import { ThemeProps } from '../icon/icon'
export interface ProgressProps {
  percentage: number
  strokeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: ThemeProps
}

let Progress: React.FC<ProgressProps> = (props) => {
  let { percentage, strokeHeight, showText, styles, theme } = props
  return (
    <div className="viking-progress-bar" style={styles}>
      <div
        className="viking-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{ width: `${percentage}%` }}
        >
          {showText && <span className="inner-text">{`${percentage}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  percentage: 0,
  showText: true,
  theme: 'primary',
  strokeHeight: 20,
}
export default Progress
