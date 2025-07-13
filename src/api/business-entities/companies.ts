import { apiRequest } from "../api";

export const getAllCompanies = () => apiRequest({ url: "/business-entities/companies" });

export const createCompanies = (data:any) => {
  return apiRequest({
    url: "/business-entities/companies/create",
    method: "post",
    data,
  });
};
