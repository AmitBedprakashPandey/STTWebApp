import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DB } from "../../config/db.firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
const cityRef = collection(DB, "City");

export const AllCity = createAsyncThunk(
  "City/all",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(cityRef);
      const response = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return response; // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createCity = createAsyncThunk(
  "createCity",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addDoc(cityRef, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteCity = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      deleteDoc(doc(cityRef, id));
      // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateCity = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const datas = doc(cityRef, data.id);
      const response = await updateDoc(datas, data);
      return response; // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CityDetail = createSlice({
  name: "city",
  initialState: {
    city: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchCity: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [AllCity.pending]: (state) => {
      state.loading = true;
    },
    [AllCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.city = action.payload;
    },
    [AllCity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createCity.pending]: (state) => {
      state.loading = true;
    },
    [createCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.city.push(action.payload);
    },
    [createCity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteCity.pending]: (state) => {
      state.loading = true;
    },
    [deleteCity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteCity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default CityDetail.reducer;

export const { searchCity } = CityDetail.actions;
