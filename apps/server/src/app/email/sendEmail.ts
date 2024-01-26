import AWS from "aws-sdk";
import settings from "../../config";

const ses = new AWS.SES({
  region: settings.aws.region,
  accessKeyId: settings.aws.keyID,
  secretAccessKey: settings.aws.secretKey,
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  settings.nodeEnv === "development" && console.log(html);

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

  try {
    const data = await ses.sendEmail(params).promise();
    console.log("Email sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
