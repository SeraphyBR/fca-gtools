import { createAsyncThunk } from "@reduxjs/toolkit"
import { getRulesFromFcatools } from "../../services/backend"

export const fetchDataFromFcatools = createAsyncThunk("fetch/fcatoolsData", getRulesFromFcatools)
