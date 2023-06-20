import { Router } from "react-router-dom";

//import joi from "joi";
//import { joiPassword } from "joi-password";
import jwtDecode from "jwt-decode";

import { configEnv } from '../configs/config'

import client, { getToken } from "./httpClient";

const loginUri = "/Auth/Login";

async function loginAsync(username, email, password) {
  const { headers } = await client.post(loginUri, {
    username,
    email,
    password
  }).then((response) => {
    if (response !== '') {
      localStorage.setItem(configEnv.TOKEN_KEY, response.data.token);
      window.location = "/";
    }
  });
}

function logout() {
  localStorage.removeItem(configEnv.TOKEN_KEY);
  Router.replace("/");
}

function getCurrentUser() {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// const loginSchema = {
//   username: joi
//               .string()
//               .min(5)
//               .max(50)
//               .label("Username"),
//   email: joi
//           .string()
//           .min(5)
//           .max(100)
//           .label("Email"),
//   password: joiPassword
//               .string()
//               .min(5)
//               .max(24)
//               .noWhiteSpaces()
//               .messages({
//                 "password.noWhiteSpaces": "{#label} should not contain white spaces",
//               })
//               .label("Password")
//               .required(),
// };

export default { loginAsync, logout, getCurrentUser };
