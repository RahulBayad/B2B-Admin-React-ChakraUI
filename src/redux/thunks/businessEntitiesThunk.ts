import { createCompanies, getAllCompanies } from "@/api/business-entities/companies";
import { createThunk } from "./createThunk";

export const fetchAllCompaniesThunk = createThunk("/business-entity/getCompanies", getAllCompanies)
export const createCompanyThunk = createThunk("/business-entity/createCompanies", createCompanies)