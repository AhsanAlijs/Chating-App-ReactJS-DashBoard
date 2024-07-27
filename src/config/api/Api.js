// export const BASE_URL = `http://192.168.100.3:3000`;
export const BASE_URL = `https://chatting-app-backend-rw5k.onrender.com`;

export const API = {
  USER: {
    BLOCKED_USER: `${BASE_URL}/auth/block`,
    GET_DATA: `${BASE_URL}/admin-route/get-users`,
    LOGIN: `${BASE_URL}/admin-route/login`,
  },
};
export default API;
