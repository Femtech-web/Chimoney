import axios from "axios";
import { getEncryptedData } from "@/utils/encryptData";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_TWO;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req: any) => {
  const storedUser: any = getEncryptedData("chipay-user");
  if (storedUser) {
    req.headers["X-UserId"] = `${storedUser.uid}`;
  }

  return req;
});

export default API;
