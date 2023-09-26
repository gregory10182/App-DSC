import axios from "axios";

// const baseurl = "http://localhost:8080/";
// const baseurl = "https://cd-q3eh.onrender.com/";
const baseurl = "https://sventasapi.gregorypf.site/";

let token = null;

const setToken = (newToken) => {
  token = "Bearer " + newToken;
};

const getAll = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const req = axios.get(baseurl, config);
  return req.then((res) => {
    return res.data;
  });
};

const getOne = (month) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const req = axios.get(baseurl + "Month/" + month, config);
  return req.then((res) => res.data);
};

const create = (month) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const req = axios.post(baseurl + "NewMonth", month, config);
  return req.then((res) => res.data);
};

const ModifyDay = (month) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const req = axios.put(baseurl + "ModifyDay/", month, config);
  return req.then((res) => res.data);
};

const updateDay = (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const req = axios.put(baseurl + "UpdateDay/" + id, undefined, config);
  return req.then((res) => res.data);
};

// const switchValidDay = (month) => {
//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };

//   const req = axios.put(baseurl + "DailySale/", month, config);
//   return req.then((res) => res.data);
// };

export default {
  getAll,
  getOne,
  setToken,
  create,
  ModifyDay,
  updateDay,
};
