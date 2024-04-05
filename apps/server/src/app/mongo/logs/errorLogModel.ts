import { getModel } from "../";
import { ErrorLog } from "@offisito/shared";

export default () =>
  getModel<ErrorLog>("errorLog", {
    stringifiedErrorLog: {
      type: String,
    },
  });
