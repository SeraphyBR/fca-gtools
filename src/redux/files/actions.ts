import { createAsyncThunk } from "@reduxjs/toolkit"
import { getProjects } from "../../services/backend"

export const fetchProjects = createAsyncThunk("fetch/projects", async (_, { signal }) => await getProjects({ signal }))
