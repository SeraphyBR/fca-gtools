export type Project = {
  id: string
  name: string
}

export type AddProjectDto = {
  name: string
  filename: string
  blob: Blob
}
