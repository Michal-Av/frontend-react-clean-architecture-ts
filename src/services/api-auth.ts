import axios from "axios";

const url: string | undefined = process.env.REACT_APP_URL_AUTH;

export const login = async (username: string, password: string): Promise<any> => {
    let details = { email: username, password: password };
    return axios.post(`${url}/login`, details, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
}

export const logout = async (): Promise<any> => {
    return axios
      .post(`${url}/logout`, {}, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
}

export const signup = async (email: string, username: string, password: string): Promise<any> => {
    let details = { email: email, username: username, password: password };
    return axios
      .post(`${url}/signup`, details)
      .then((response) => {
        return response.data;
      });
}

export const forgot_pass = async (email: string): Promise<any> => {
  let mail = { email: email };
  return axios
    .post(`${url}/forgot-password`, mail)
    .then((response) => {
      return response.data;
    });
}

export const resetPassword = async (token: string, newPassword: string): Promise<any> => {
  let data = { token, newPassword };
  return axios
    .post(`${url}/reset-password`, data)
    .then((response) => {
      return response.data;
    });
}
