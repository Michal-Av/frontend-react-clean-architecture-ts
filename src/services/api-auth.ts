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
