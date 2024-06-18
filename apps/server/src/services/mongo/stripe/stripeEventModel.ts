import { getModel } from "../";
import { StripeEvent } from "@offisito/shared";

export default () =>
  getModel<StripeEvent>("stripeEvent", {
    stringifiedEvent: { type: String, required: true },
  });
