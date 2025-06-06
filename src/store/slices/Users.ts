import UsersApi, { TypeUser } from "@/services/UsersApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../redux"

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: Pick<TypeUser, "username" | "email"> & { password: string }, { rejectWithValue }) => {
    try {
      return await UsersApi.create(userData)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    userData: Pick<TypeUser, "username" | "email" | "image"> & { password: string },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as AppState
    try {
      return await UsersApi.update({ ...userData, token: state.users.token })
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await UsersApi.login(userData)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const selectToken = (state: AppState) => state.users.token
export const selectUser = (state: AppState) => state.users

const initialState: TypeUser = { bio: "", email: "", image: "", token: "", username: "" }

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload }
      })
      .addCase(createUser.rejected, (state, action) => {
        return state
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload }
      })
      .addCase(loginUser.rejected, (state, action) => {
        return state
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload }
      })
      .addCase(updateUser.rejected, (state, action) => {
        return state
      })
  },
})

export const { reducer: UsersReducer } = UsersSlice

export const { logout: logoutUser } = UsersSlice.actions
