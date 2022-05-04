export type Context = {
  id: string
  name: string
}

export type AddContextDto = {
  name: string
  filename: string
  blob: Blob
}
