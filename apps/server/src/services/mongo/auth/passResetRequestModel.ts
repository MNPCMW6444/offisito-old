import { getModel } from "..";
import { PassResetRequest } from "@offisito/shared";

export default () =>
  getModel<PassResetRequest>("passResetRequest", {
    email: {
      type: String,
    },
    key: {
      type: String,
    },
  });
