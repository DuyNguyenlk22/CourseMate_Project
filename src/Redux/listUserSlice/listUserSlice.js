import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { layDanhSachNguoiDung, capNhatThongTinNguoiDung, timKiemNguoiDung, xoaNguoiDung, } from "../../Services/api";
import { message } from "antd";

const initialState = {
  listUser: [],
  loading: false,
};

export const fetchList = createAsyncThunk(
  "listUser/fetchListUser",
  async (data, { dispatch, getState }) => {
    try {
      const res = await layDanhSachNguoiDung();
      if (res.status === 200) {
        dispatch(setListUser(res.data));
      }
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },
);
export const updateUser = createAsyncThunk(
  "listUser/updateUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await capNhatThongTinNguoiDung(userData);
      if (response.status === 200) {
        message.success("Update successfully");
        dispatch(fetchList());
        return response.data;
      }
    } catch (error) {
      message.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "listUser/deleteUser",
  async (taiKhoan, { dispatch, rejectWithValue }) => {
    try {
      const response = await xoaNguoiDung(taiKhoan);
      if (response.status === 200) {
        message.success(response.data);
        dispatch(fetchList());
        return response.data;
      }
    } catch (error) {
      message.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const searchUser = createAsyncThunk(
  "listUser/searchUser",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await timKiemNguoiDung(taiKhoan);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const listUserSlice = createSlice({
  name: "listUser",
  initialState,
  reducers: {
    setListUser: (state, { payload }) => {
      state.listUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.loading = true;
        state.listUser = action.payload;
      })
      .addCase(fetchList.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUserIndex = state.listUser.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (updateUser !== -1) {
          state.listUser[updatedUserIndex] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.error("Update failed:", action.payload);
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
      })

      .addCase(searchUser.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.searchError = null;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.searchError = action.error.message || "Failed to search users";
        state.searchResults = null;
      });
  },
});

export const { setListUser } = listUserSlice.actions;

export default listUserSlice.reducer;
