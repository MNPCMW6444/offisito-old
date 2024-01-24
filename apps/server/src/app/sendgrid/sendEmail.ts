import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import settings from "../../config";
import Name from "../../assets/name";

dotenv.config();

export const sendEmail = async (to: string, subject: string, html: string) => {
  settings.nodeEnv === "development" && console.log(html);
  sgMail.setApiKey(settings.sendgridApiKey);
  return await sgMail.send({
    from: {
      email: "service@offisito.com",
      name: Name.up,
    },
    to,
    subject,
    html,
  });
};
