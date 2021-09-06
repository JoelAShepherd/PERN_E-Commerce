import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../../api/api'

export const getProductsThunk = createAsyncThunk(
    'products/getProductsThunk',
    async() => {
        console.log('getProductsThunk has run')
        const products = await api.getProducts();

        return products;
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        resultsLoading: false,
        resultsError: false,
        data: false
    },
    reducers: {},
    extraReducers: {
        [getProductsThunk.pending]: (state) => {
            state.resultsLoading = true;
            state.resultsError = false;
            state.data = false
        },
        [getProductsThunk.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.resultsLoading = false;
            state.resultsError = false;
            state.data = true
        },
        [getProductsThunk.rejected]: (state) => {
            state.resultsLoading = false;
            state.resultsError = true;
        }
    }
})

export const selectProducts = state => state.products.products;
export const selectProductsState = state => state.products;
export default productsSlice.reducer;