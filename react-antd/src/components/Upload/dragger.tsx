import React, { DragEvent, useState } from 'react'

import classNames from 'classnames'
export interface dragProps {
  onFile: (files: FileList) => void
}

let Dragger: React.FC<dragProps> = (props) => {
  let { onFile, children } = props
  let [dragOver, setDragOver] = useState(false)
  const klass = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver,
  })

  let handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  let handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handleDrag(e, true)
      }}
      onDragLeave={(e) => {
        handleDrag(e, false)
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}
export default Dragger
