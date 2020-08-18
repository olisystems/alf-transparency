const axios = require("axios");
const url = "http://80.158.4.115:9000/api/connectors";

import auth from "./auth";

const getData = async () => {
  try {
    const response = await axios.get(url, { auth: auth });
    console.log(response);

    return JSON.stringify(response);
  } catch (error) {
    console.log(error);
  }
};

export default getData;
