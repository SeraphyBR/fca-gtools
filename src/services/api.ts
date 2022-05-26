import axios from "axios"
import { invoke } from "@tauri-apps/api/tauri"

let api = axios.create({
  baseURL: "http://localhost:8080"
})

invoke("get_server_port").then((port) => {
  api.defaults.baseURL = "http://localhost:" + port
})

export default api
