import axios from "axios";


export const get_latest_ship_info = (params) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/get_ship_info`, params);
}

