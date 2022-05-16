import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDataFromFcatools } from "../../services/backend"

export const fetchDataFromFcatools = createAsyncThunk("fetch/fcatoolsData", getDataFromFcatools)
