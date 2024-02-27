import axios from "axios";
import { getEncryptedData } from "@/utils/encryptData";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
})

API.interceptors.request.use((req) => {
  const storedUser: any = getEncryptedData("chipay-user");
  if (storedUser) {
    console.log(storedUser.uid)

    req.headers["X-UserId"] = `${storedUser.uid}`
  }

  return req;
});

export default API;

