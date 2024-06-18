import { getModel } from "../";
import { ErrorLog } from "@offisito/shared";

export default () =>
  getModel<ErrorLog>("errorLog", {
    stringifiedError: {
      type: String,
    },
  });
