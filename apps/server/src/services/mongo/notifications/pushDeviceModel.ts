import { getModel } from "../";
import { PushDevice } from "@offisito/shared";

export default () =>
  getModel<PushDevice>("pushDevice", {
    userId: { type: String },
    name: { type: String, unique: true },
    subscription: {
      endpoint: { type: String },
      keys: {
        p256dh: { type: String },
        auth: { type: String },
      },
    },
  });
