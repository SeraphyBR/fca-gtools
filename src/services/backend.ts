import api from "./api"

export const getTeste = async () => {
  const response = await api.get<string>("/")
  return response.data
}
