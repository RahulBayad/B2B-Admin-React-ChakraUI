import { apiRequest } from "../api";

export const getAllCompanies = ()=> apiRequest({ url: "/business-entities/companies" })
export const createCompanies = ()=> apiRequest({ url: "/business-entities/companies/create" })