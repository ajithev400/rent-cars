import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'



const initialState = {
    user :{},
    isLoading : false,
    isError : false,
    isSuccess : false,
    isAuthenticated: false,
    registered : false,
    isVerifeyed : false 
}

export const registerUser = createAsyncThunk(
    'api/register',
    async(userData, thunkApi) => {
        try{
            return await authService.registerUser(userData)
        }catch(err){
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'api/token',
    async(userData,thunkApi) => {
        try{
            return await authService.loginUser(userData)
        }catch(err){
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const sendOtp = createAsyncThunk(
    'api/verify-otp',
    async(data,thunkApi) => {
        try{
            return await authService.verifyOtp(data)
        }catch(err){
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'api/verify',
    async(_,thunkApi)=>{
        try{
            return await authService.checkAuth()
        }catch(err){
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const getUser = createAsyncThunk(
    'api/getuser',
    async(_,thunkApi)=>{
        try{
            return await authService.getUser()
        }catch(err){
            const message = (
                err.response && err.response.data && err.response.data.message
            ) || err.message || err.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
)



export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        reset:{
            user:{},
            isLoading: false,
            isError: false,
            isVerifeyed: false,
            isAuthenticated: false,
            registered : false
        }
    },
    extraReducers: builder =>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state)=>{
            state.isLoading = false
            state.isAuthenticated = true
        })
        .addCase(login.rejected,(state)=>{
            state.isLoading = false
        })
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled,(state)=>{
            state.isLoading = false
            state.registered = true
        })
        .addCase(registerUser.rejected,(state)=>{
            state.isLoading = false
        })
        .addCase(sendOtp.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(sendOtp.fulfilled, (state) => {
            state.isLoading = false
            state.isVerifeyed = true
        } )
        .addCase(sendOtp.rejected,(state) =>{
            state.isLoading = false
        })
        .addCase(checkAuth.pending, state => {
            state.isLoading = true;
          })
          .addCase(checkAuth.fulfilled, (state,user) => {
            state.isLoading = false;
            state.isAuthenticated = true;
          })
          .addCase(checkAuth.rejected, state => {
            state.isLoading = false;
          })
          .addCase(getUser.pending, state =>{
            state.isLoading =true
        })
          .addCase(getUser.fulfilled, (state,actions) =>{
            state.user = actions.payload
            state.isLoading = false
          })
          .addCase(getUser.rejected, state =>{
            state.isLoading = false
          })
          
    }
})

export const {rest} = authSlice.actions
export default authSlice.reducer