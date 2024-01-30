import { SES } from "@aws-sdk/client-ses";
import settings from "../../config";

const ses = new SES({
  region: settings.aws.region,

  credentials: {
    accessKeyId: settings.aws.keyID,
    secretAccessKey: settings.aws.secretKey,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const params = {
      Source: `service@offisito.com`,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };

    const data = await ses.sendEmail(params);
    console.log("Successfully sent email to " + to);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
