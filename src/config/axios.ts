import lib from "axios";
import { APP_API_URI } from "./env";

lib.defaults.baseURL = APP_API_URI;

export const axios = lib.create({
  baseURL: APP_API_URI,
});
