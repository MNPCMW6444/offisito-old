import webpush from "web-push";
import settings from "../../config";

const vapidKeys = {
  publicKey:
    "BFGe7oDdXd6dQYvCdBsu_46CBUmtAZ-viJsQX3P5r9S78Pp_3nL5X8D57WLebwn-xG8W9559a2UbahoWh4DT0Fs",
  privateKey: settings.push,
};

webpush.setVapidDetails(
  "mailto:michael@offisito.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey ||
    (() => {
      throw new Error("No private key set");
    })(),
);

export const sendPushNotification = async (
  subscription: any,
  payload: { title: string; body: string },
  data = {},
) => {
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({ ...payload, ...data }),
    );
    console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
