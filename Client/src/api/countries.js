const { API } = require("../config/api");

export const getCountries = async (setData) => {
  try {
    const response = await API.get(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    setData(response.data);
  } catch (error) {
    console.log(error);
  }
};
