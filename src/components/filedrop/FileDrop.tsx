import { Box } from "@mui/material"
import React from "react"
import { useDropzone } from "react-dropzone"
import * as S from "./FileDrop.style"

type FileDropProps = {
  onDrop?: (files: File[]) => void
  label: string
}

const FileDrop: React.FC<FileDropProps> = (props) => {
  const handleOnDrop = (acceptedFiles: File[]) => {
    props.onDrop?.(acceptedFiles)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleOnDrop })

  return (
    <Box component="section" height="100%" width="100%">
      <S.Dropzone {...getRootProps()}>
        <input {...getInputProps()} />
        <span>{props.label}</span>
      </S.Dropzone>
    </Box>
  )
}

export default FileDrop
