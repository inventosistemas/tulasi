import querystring from 'querystring';
import Axios from 'axios';
import 'whatwg-fetch';

// if(!!loadState().login.token) {
//   Axios.interceptors.request.use(config => {
//     config.headers.Authorization = 'Bearer ' + loadState().login.token.access_token;
//     return config
//   })
// }


// const apiUrl = "http://tulasi.yaapbrasil.com.br:8092/v1";
// export const apiUrl = "http://tulasi.yaapbrasil.com.br:8092/v1";
let enviroment = process.env.NODE_ENV;
console.log("ENVO_NODE_ENV", enviroment)
export const apiUrl = enviroment === "development" ? "http://homapi.tulasiorganicos.com.br/v1" : "https://webapi.tulasiorganicos.com.br/v1" ;
export const baseUrl = enviroment === "development" ? "http://homapi.tulasiorganicos.com.br" : "https://webapi.tulasiorganicos.com.br";

// export const baseUrl = "http://tulasi.yaapbrasil.com.br:8092";
// querystring.stringify({
//   UserName: 'roger@abilitatecnologia.com.br',
//   password: '536r3d0',
//   grant_type: 'password'
// })
function getCredentials(UserName, password) {
  return (
    querystring.stringify({
      UserName,
      password,
      grant_type: 'password'
    })
  );
};

export const headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}

export const get_data = (route, token, username, password) => {
  return Axios.get(apiUrl + route,
    getCredentials(username, password), {
      headers
    },
  )
}

export const post_data = (route, token, username, password) => {
  // return Axios.post(baseUrl + route,
  //   getCredentials(username, password), {
  //     headers
  //   },
  // )
  return fetch(baseUrl + route, {
    method: 'POST',
    headers: {
    'Content-Type': 'text/plain'
    },
    mode: 'cors',
    body: `grant_type=password&UserName=${username}&Password=${password}`
  })
}

export const put_data = (route, username, password) => {
  // return Axios.put(apiUrl + route,
  //   getCredentials(username, password), {
  //     headers
  //   },
  // )

}
