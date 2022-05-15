import { createAsyncThunk } from "@reduxjs/toolkit"
import { getContexts } from "../../services/backend"

export const fetchContexts = createAsyncThunk("fetch/contexts", async (_, { signal }) => await getContexts({ signal }))
