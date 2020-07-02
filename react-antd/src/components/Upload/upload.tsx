import axios from 'axios'
import React, { useRef, ChangeEvent, useState } from 'react'
import Button, { BtnType } from '../Button/Button'
interface fileProps {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percentage?: number
  raw?: File
  response?: any
  error?: any
}
export interface uploadPorps {
  action: string
  beforeUpload?: (file: File) => boolean | Promise<File>
  onChange?: (file: File) => void
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onErr?: (err: any, file: File) => void
}
type UploadFileStatus = 'ready' | 'success' | 'uploading' | 'err'

let Uplaod: React.FC<uploadPorps> = (props) => {
  let { action, onProgress, onSuccess, onErr, beforeUpload, onChange } = props
  let fileInput = useRef<HTMLInputElement>(null)
  let [fileList, setFileList] = useState<fileProps[]>([])
  let handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  let updateFileProps = (_file: fileProps, propsObj: Partial<fileProps>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === _file.uid) {
          return { ...file, ...propsObj }
        } else {
          return file
        }
      })
    })
    console.log(fileList)
  }
  let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files
    if (!files) {
      return
    }
    let fileList = Array.from(files)
    fileList.forEach((file) => {
      if (!beforeUpload) {
        uploadFile(file)
      } else {
        let res = beforeUpload(file)
        if (res && res instanceof Promise) {
          res.then((resp) => {
            uploadFile(resp)
          })
        } else if (res !== false) {
          uploadFile(file)
        }
      }
    })

    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  let uploadFile = (file: File) => {
    let _file: fileProps = {
      uid: Date.now() + 'uploadFile',
      size: file.size,
      name: file.name,
      status: 'ready',
      percentage: 0,
      raw: file,
    }
    let formData = new FormData()
    formData.append(file.name, file)
    setFileList((prevList) => {
      return [_file, ...prevList]
    }) //这样才类似tongbu
    /* setFileList([_file, ...fileList])
    console.log('file', _file)
    console.log('fileList', fileList) */
    axios
      .post(action, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        onUploadProgress: function (e) {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          updateFileProps(_file, {
            percentage: percentage,
            status: 'uploading',
          })

          // console.log(1)
          if (onProgress) {
            onProgress(percentage, file)
          }
        },
      })
      .then((resp) => {
        console.log(resp)
        updateFileProps(_file, {
          response: resp.data,
          status: 'success',
        })
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch((err) => {
        updateFileProps(_file, {
          error: err,
          status: 'err',
        })
        if (onErr) {
          onErr(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }
  return (
    <div className="viking-upload-component">
      <Button btnType={BtnType.Primary} onClick={handleClick}>
        {' '}
        upload file
      </Button>
      <input
        className="viking-file-input"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleChange}
        type="file"
      ></input>
    </div>
  )
}
export default Uplaod
