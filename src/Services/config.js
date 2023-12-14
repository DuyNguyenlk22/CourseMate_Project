import axios from "axios";
import { localServices } from "./localServices";

export const BASE_URL = "https://elearningnew.cybersoft.edu.vn";
export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjIxLzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMDk3OTIwMDAwMCIsIm5iZiI6MTY4NzE5NDAwMCwiZXhwIjoxNzExMTI2ODAwfQ.I9iDnvUJNQaG_RBPSODU3vvlNF0JJ7lRamr221wclIQ";
export const GROUPID = "GP09";

export const configHeader = () => {
  return { TokenCybersoft: TOKEN_CYBER };
};

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBER,
    Authorization: "Bearer " + localServices.get()?.accessToken,
  },
});
