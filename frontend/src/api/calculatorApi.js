import { request } from "./client.js";

export const calculate = (op, a, b) =>
  request(`/api/calculator/${op}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
