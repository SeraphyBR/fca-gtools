import { AxiosRequestConfig } from "axios"
import { TriadicContextData } from "../models/context"
import { FcatoolsTriadicData } from "../models/data"
import { AddContextDto, Context } from "../models/project"
import api from "./api"

export const getTeste = async () => {
  const response = await api.get<string>("/")
  return response.data
}

export const postAddContext = async (newContext: AddContextDto) => {
  const formData = new FormData()

  formData.append("name", newContext.name)
  formData.append("filename", newContext.filename)
  formData.append("blob", newContext.blob, newContext.filename)

  await api.post("/contexts/file", formData, {
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

export const getContextData = async (id: string) => {
  const response = await api.get<TriadicContextData>(`/contexts/${id}`)
  return response.data
}

export const updateContextData = async (id: string, data: TriadicContextData) => {
  await api.put(`/contexts/${id}`, data)
}

export const postContextData = async (data: TriadicContextData) => {
  await api.post(`/contexts`, data)
}

export const getDataFromFcatools = async (id: string) => {
  const response = await api.get<FcatoolsTriadicData>(`/fca/${id}`)
  return response.data
}
