import settings from "../../config";
import { Stripe } from "stripe";
import stripeEventModel from "../mongo/stripe/stripeEventModel";

export const stripeInstance = new Stripe(settings.stripeApiKey, {
  apiVersion: "2024-04-10",
});

export const webhookHandler = async (event) => {
  try {
    const doc = new (stripeEventModel())({
      stringifiedEvent: JSON.stringify(event),
    });
    console.log("logging stripe event...");
    await doc.save();
    console.log("stripe event logged");
  } catch (e) {
    console.log("stipe event logging error!!");
  }
};
