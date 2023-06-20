import { configEnv, SuccessStatusCodes } from "../configs/config";
import axios from "axios";

const request = async (url, params = {}, method = "GET", extras = {}) => {
  var token = localStorage.getItem(configEnv.TOKEN_KEY);

  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  let options = {
    method,
    headers,
    timeout: configEnv.TIME_OUT,
  };

  if (extras !== {}) {
    if (extras.responseType !== undefined) {
      options.responseType = extras.responseType;
    }
    if (extras.isSendFile === true) {
      headers["Content-Type"] = "multipart/form-data";
    }
  }

  try {
    var response;

    url = configEnv.FETCH_STRING + url;

    if ("GET" === method || "DELETE" === method) {
      url = url + "?" + new URLSearchParams(params).toString();
      if ("GET" === method) {
        response = await axios.get(url, options);
      } else {
        response = await axios.delete(url, options);
      }
    } else {
      //var data = JSON.stringify( params );
      if ("POST" === method) {
        response = await axios.post(url, params, options);
      } else {
        response = await axios.put(url, params, options);
      }
    }

    //const response = await fetch( url, options );

    if (SuccessStatusCodes.includes(response.status)) {
      return {
        message: response.statusText,
        success: true,
        data: response.data,
        headers: response.headers,
      };
    } else {
      return {
        message: response.statusText,
        success: false,
      };
    }
  }
  catch (err) {
    return {
      message: err.response.data.message,
      success: false
    }
  }
};

const httpGet = (url, params, extras) => request(url, params, "GET", extras);
const httpPost = (url, params, extras) => request(url, params, "POST", extras);
const httpPut = (url, params, extras) => request(url, params, "PUT", extras);
const httpDelete = (url, params, extras) =>
  request(url, params, "DELETE", extras);

export { httpGet, httpPost, httpPut, httpDelete };
