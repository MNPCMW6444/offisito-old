import { Router } from "express";
import { Request } from "../../middleware";
import conversationModel from "../../../mongo/chats/conversationModel";

const router = Router();

router.get("/", async (req: Request, res, next) => {
  try {
    if (!req.user) return res.status(401).send("Please Log In First");
    const Conversation = conversationModel();
    const conversations = await Conversation.find({
      $or: [
        { hostId: req.user._id.toString() },
        { memberId: req.user._id.toString() },
      ],
    });
    return res.status(200).json(conversations);
  } catch (e) {
    next(e);
  }
});

export default router;
