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
