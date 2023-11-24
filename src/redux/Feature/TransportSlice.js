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
const ref = collection(DB, "transport");

export const All = createAsyncThunk(
  "Transport/All",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(ref);
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
export const Create = createAsyncThunk(
  "Transport/Create",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await addDoc(ref, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const Delete = createAsyncThunk(
  "Transport/Delete",
  async (id, { rejectWithValue }) => {
    try {
      deleteDoc(doc(ref, id));
      // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Update = createAsyncThunk(
  "Transport/Update",
  async (data, { rejectWithValue }) => {
    try {
     
      const datas = doc(ref, data.id);
     const response=  await updateDoc(datas, data);
      return response; // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const TransportDetails = createSlice({
  name: "transport",
  initialState: {
    transport: [],
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
    [All.pending]: (state) => {
      state.loading = true;
    },
    [All.fulfilled]: (state, action) => {
      state.loading = false;
      state.transport = action.payload;
    },
    [All.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [Create.pending]: (state) => {
      state.loading = true;
    },
    [Create.fulfilled]: (state, action) => {
      state.loading = false;
      state.transport.push(action.payload)
    },
    [Create.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [Delete.pending]: (state) => {
      state.loading = true;
    },
    [Delete.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [Delete.rejected]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.transport = state.transport.filter((item) => item.id !== id);
      }
      state.error = action.payload;
    },
    [Update.pending]: (state) => {
      state.loading = true;
    },
    [Update.fulfilled]: (state, action) => {
      state.loading = false;
      state.transport = action.payload;
      state.error = null;
    },
    [Update.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default TransportDetails.reducer;

export const { searchCity } = TransportDetails.actions;
