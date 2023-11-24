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
const qualityRef = collection(DB, "quality");

export const AllQuality = createAsyncThunk(
  "Quality/all",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(qualityRef);
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
export const createQuality = createAsyncThunk(
  "createQuality",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addDoc(qualityRef, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteQuality = createAsyncThunk(
  "deleteQuality",
  async (id, { rejectWithValue }) => {
    try {
      deleteDoc(doc(qualityRef, id));
      // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateQuality = createAsyncThunk(
  "updateQuality",
  async (data, { rejectWithValue }) => {
    try {
      const datas = doc(qualityRef, data.id);
      const response = await updateDoc(datas, data);
      return response; // Access data directly
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const QualityDetail = createSlice({
  name: "quality",
  initialState: {
    quality: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchQuality: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [AllQuality.pending]: (state) => {
      state.loading = true;
    },
    [AllQuality.fulfilled]: (state, action) => {
      state.loading = false;
      state.quality = action.payload;
    },
    [AllQuality.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createQuality.pending]: (state) => {
      state.loading = true;
    },
    [createQuality.fulfilled]: (state, action) => {
      state.loading = false;
      state.quality.push(action.payload)
    },
    [createQuality.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteQuality.pending]: (state) => {
      state.loading = true;
    },
    [deleteQuality.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteQuality.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default QualityDetail.reducer;

export const { searchQuality } = QualityDetail.actions;
