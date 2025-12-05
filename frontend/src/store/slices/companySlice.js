import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
  currentCompany: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    fetchCompaniesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCompaniesSuccess: (state, action) => {
      state.loading = false;
      state.companies = action.payload;
    },
    fetchCompaniesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCompanyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createCompanySuccess: (state, action) => {
      state.loading = false;
      state.companies.push(action.payload);
      state.currentCompany = action.payload;
    },
    createCompanyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
  },
});

export const {
  fetchCompaniesStart,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
  createCompanyStart,
  createCompanySuccess,
  createCompanyFailure,
  setCurrentCompany,
} = companySlice.actions;

export default companySlice.reducer;
