import { request } from "./client.js";

const BASE = "/api/employees";

export const getEmployees = () => request(BASE);

export const getEmployee = id => request(`${BASE}/${id}`);

export const createEmployee = employee =>
  request(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });

export const deleteEmployee = id => request(`${BASE}/${id}`, { method: "DELETE" });
