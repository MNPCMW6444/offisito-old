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
      return res.json({ user: await User.findById(user._id) });
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
      if (!email || !password) {
        return res
          .status(400)
          .json({ errorMessage: "Wrong email or password" });
      }
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(401).json({
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
