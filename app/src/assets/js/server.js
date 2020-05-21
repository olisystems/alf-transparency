const axios = require("axios");
const url =
  "https://cors-anywhere.herokuapp.com/http://80.158.4.115:9000/api/connectors";

const auth = {
  username: "cpo_admin",
  password: "123!@#AFAF$#@fa!",
};

const getData = async () => {
  try {
    const response = await axios.get(url, { auth: auth });
    return JSON.stringify(response);
  } catch (error) {
    console.log(error);
  }
};

export default getData;
