import { Router } from "express";
import userModel from "../../../../mongo/auth/userModel";
import requestForAccountModel from "../../../../mongo/auth/requestForAccountModel";
import { sendEmail } from "../../../../sendgrid/sendEmail";
import { signupreq } from "../../../../../assets/email-templates/authEmails";
import settings from "../../../../../config";
import { v4 } from "uuid";

const router = Router();

router.post("/req", async (req, res) => {
  const User = userModel();
  const RequestForAccount = requestForAccountModel();
  if (User && RequestForAccount)
    try {
      const { email } = req.body;
      if (!email)
        return res.status(400).json({
          clientError: "The email is missing",
        });
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({
          clientError: "An account with this email already exists",
        });

      const key = v4();

      await new RequestForAccount({
        email,
        key,
      }).save();

      const url = `${settings.clientDomain}/register?key=${key}`;

      const { subject, body } = signupreq(url);

      sendEmail(email, subject, body)
        .then(() => console.log("sent registration email - " + body))
        .catch((err) => console.error(err));

      return res.json({ result: "email successfully sent to " + email });
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        serverError:
          "Unexpected error occurred in the server" + JSON.stringify(err),
      });
    }
  else return res.status(500).json({ serverError: "error" });
});

export default router;
