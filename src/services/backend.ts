import { AddProjectDto, Project } from "../models/project"
import api from "./api"

export const getTeste = async () => {
  const response = await api.get<string>("/")
  return response.data
}

export const postAddProject = async (newProject: AddProjectDto) => {
  const formData = new FormData()

  formData.append("name", newProject.name)
  formData.append("filename", newProject.filename)
  formData.append("blob", newProject.blob, newProject.filename)

  await api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getProjects = async () => {
  const response = await api.get<Project[]>("/files")

  return response.data
}
