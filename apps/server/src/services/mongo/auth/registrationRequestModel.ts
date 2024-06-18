import { getModel } from "..";
import { RegistrationRequest } from "@offisito/shared";

export default () =>
  getModel<RegistrationRequest>("registrationRequest", {
    email: {
      type: String,
    },
    key: {
      type: String,
    },
  });
