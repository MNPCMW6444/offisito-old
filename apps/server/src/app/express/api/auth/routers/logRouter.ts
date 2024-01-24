import { Router } from "express";
import userModel from "../../../../mongo/auth/userModel";
import requestForAccountModel from "../../../../mongo/auth/requestForAccountModel";
import settings from "../../../../../config";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { authUser } from "../authUtil";
// import { GetInReq, GetInRes, PostInReq, PostInRes } from "@monorepo/types";

const router = Router();
//const MIN_PASSWORD_STRENGTH = 3;

/**
 * @route GET /in
 * @group Authentication - Operations about authentication
 * @produces application/json
 * @returns {object} 200 - An object with user details
 * @returns {object} 401 - Unauthorized, with error message
 * @returns {object} 500 - Server Error, with error message
 */
router.get("/in", async (req, res) => {
  const User = userModel();
  if (User)
    try {
      const user = await authUser(req.cookies.jsonwebtoken);
      if (!user) {
        return res
          .status(401)
          .json({ errorMessage: "Unauthorized. Try to login (post)" });
      }
      delete user.passwordHash;
      return res.json({ user });
    } catch (err) {
      return res
        .status(401)
        .json({ errorMessage: "Unauthorized. Try to login (post)" });
    }
  else
    return res
      .status(500)
      .json({ errorMessage: "Server Error nichal todo api" });
});

router.post("/in", async (req, res) => {
  const User = userModel();
  const RequestForAccount = requestForAccountModel();
  if (User && RequestForAccount) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ errorMessage: "Must pass an email" });
      }
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(402).json({
          errorMessage: "please register",
        });
      }
      const correctPassword = await bcrypt.compare(
        password,
        existingUser.passwordHash,
      );
      if (!correctPassword) {
        return res.status(401).json({
          errorMessage: "Wrong email or password",
        });
      }
      const token = jsonwebtoken.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT + "",
      );
      return res
        .cookie("jsonwebtoken", token, {
          httpOnly: true,
          sameSite:
            (settings.nodeEnv === "development"
              ? "lax"
              : settings.nodeEnv === "production" && "none") || false,
          secure:
            settings.nodeEnv === "development"
              ? false
              : settings.nodeEnv === "production" && true,
        })
        .send();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ errorMessage: "Unexpected error occurred in the server" });
    }
  } else
    return res
      .status(500)
      .json({ errorMessage: "Server Error nichal todo api" });
});

router.get("/out", async (_, res) => {
  const User = userModel();
  if (User)
    try {
      return res
        .cookie("jsonwebtoken", "", {
          httpOnly: true,
          sameSite:
            (settings.nodeEnv === "development"
              ? "lax"
              : settings.nodeEnv === "production" && "none") || false,
          secure:
            settings.nodeEnv === "development"
              ? false
              : settings.nodeEnv === "production" && true,
          expires: new Date(0),
        })
        .send();
    } catch (err) {
      return res
        .status(500)
        .json({ errorMessage: "Server Error nichal todo api" });
    }
  else
    return res
      .status(500)
      .json({ errorMessage: "Server Error nichal todo api" });
});

export default router;
