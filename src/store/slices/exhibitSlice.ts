import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    exhibitions: [],
    url: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/exhibits',
    currentPage: 1,
    totalPage: 1
}

interface IFetchExhibits {
    currentPage: number,
    url: string,
}

export const fetchExhibits = createAsyncThunk(
    'exhibit/fetchExhibits',
    async function (payload: IFetchExhibits, {rejectWithValue}) {
        const response = await axiosInstance.get(payload.url, {
            params: {
                page: payload.currentPage,
                limit: 10
            }
        });
        console.log(response.data);
        return response.data;
    }
)

export const exhibitSlice = createSlice({
    name: 'exhibit',
    initialState,
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload.url;
            console.log(action.payload.url)
        },
        setCurrentPageSlice: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExhibits.fulfilled, (state, action) => {
            state.exhibitions = action.payload.data;
            state.totalPage = action.payload.lastPage;
            state.currentPage = action.payload.page;
        })
    },
})

export const {setUrl, setCurrentPageSlice} = exhibitSlice.actions;
export default exhibitSlice.reducer