import settings from "../../config";
import axios from "axios";

export const getAddressByPoint = async (lat: number, long: number) => {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&key=" +
        settings.googleGeoCoding,
    );
    return res.data.results[0].formatted_address.split(",")[1];
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getPointByAddress = async (address: string) => {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        settings.googleGeoCoding,
    );
    console.log(res.data.results[0].geometry.location);
    return res.data.results[0].formatted_address.split(",")[1];
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const autocompleteAddress = async (query: string) => {
  try {
    return (
      await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${settings.googleGeoCoding}`,
      )
    ).data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
