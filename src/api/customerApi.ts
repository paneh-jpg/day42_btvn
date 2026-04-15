import axiosClient from "./axiosClient";

export const getCustomersApi = async () => {
  const res = await axiosClient.get("/customers");

  return res.data;
};

export const createCustomerApi = async (data: any) => {
  const res = await axiosClient.post("/customers", data);
  return res.data;
};

export const updateCustomerApi = async (id: number, data: any) => {
  const res = await axiosClient.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomerApi = async (id: number) => {
  const res = await axiosClient.delete(`/customers/${id}`);
  return res.data;
};
