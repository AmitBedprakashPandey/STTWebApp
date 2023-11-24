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
const ref = collection(DB, "supplier");

export const All = createAsyncThunk(
  "Customer/All",
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
  "Customer/Create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addDoc(ref, data);
      return response.data();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const Delete = createAsyncThunk(
  "Customer/Delete",
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
  "Customer/Update",
  async (data, { rejectWithValue }) => {
    try {
      const datas = doc(ref, data.id);
      const response = await updateDoc(datas, data);
      return response; // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const SupplierDetails = createSlice({
  name: "Supplier",
  initialState: {
    Supplier: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchSupplier: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [All.pending]: (state) => {
      state.loading = true;
    },
    [All.fulfilled]: (state, action) => {
      state.loading = false;
      state.Supplier = action.payload;
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
      state.Supplier.push(action.payload);
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
      state.error = action.payload;
    },
  },
});

export default SupplierDetails.reducer;

export const { searchSupplier } = SupplierDetails.actions;
