import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CompanyProps } from "../../models/Company";

interface CompanyState {
    companies: Array<CompanyProps>
    isLoaded: boolean;
}

const initialState: CompanyState = {
    companies: [],
    isLoaded: false
}


const companySlice = createSlice({
    name:'company',
    initialState,
    reducers: {
        setCompanies: (state, action: PayloadAction<Array<CompanyProps>>) => {
            state.companies = action.payload;
            state.isLoaded = true 
        },
        addCompany: (state, action: PayloadAction<CompanyProps>) => {
            state.companies.push(action.payload);
        }
    }
})

export const {setCompanies, addCompany} = companySlice.actions;
export default companySlice.reducer;