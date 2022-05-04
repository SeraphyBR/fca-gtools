import { AxiosRequestConfig } from "axios"
import { TriadicContextData } from "../models/context"
import { FcatoolsTriadicData } from "../models/data"
import { AddContextDto, Context } from "../models/project"
import api from "./api"

export const getTeste = async () => {
  const response = await api.get<string>("/")
  return response.data
}

export const postAddProject = async (newProject: AddContextDto) => {
  const formData = new FormData()

  formData.append("name", newProject.name)
  formData.append("filename", newProject.filename)
  formData.append("blob", newProject.blob, newProject.filename)

  await api.post("/contexts", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getProjects = async (config?: AxiosRequestConfig<any>) => {
  const response = await api.get<Context[]>("/contexts", config)
  return response.data
}

export const deleteAllProjects = async () => {
  await api.delete("/contexts")
}

export const getDataFromFcatools = async (id: string) => {
  const response = await api.get<FcatoolsTriadicData>(`/fca/${id}`)
  console.log(response.data)
  return response.data
}

export const getContextData = async (id: string) => {
  const response = await api.get<TriadicContextData>(`/contexts/${id}`)
  return response.data
}
