import { AddProjectDto } from "../models/project"
import api from "./api"

export const getTeste = async () => {
  const response = await api.get<string>("/")
  return response.data
}

export const postNewProject = async (newProject: AddProjectDto) => {
  const formData = new FormData()

  formData.append("name", newProject.name)
  formData.append("filename", newProject.filename)
  formData.append("blob", newProject.blob, newProject.filename)

  await api.post("/files/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
