import { Router } from "express";
import { Request } from "../../middleware";
import conversationModel from "../../../mongo/chats/conversationModel";
import messageModel from "../../../mongo/chats/messageModel";
import { SendMessageReq } from "@monorepo/types";

const router = Router();

router.get("/conversationMessages/:id", async (req: Request, res, next) => {
  try {
    const Message = messageModel();
    const Conversation = conversationModel();
    const conversation = await Conversation.findById(req.params.id);
    if (
      req.user._id !== conversation.hostId &&
      req.user._id !== conversation.memberId
    )
      return res.status(401).send("You are not part of the conversation");
    const messages = await Message.find({
      conversationId: conversation._id.toString(),
    });
    return res.status(200).json(messages);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req: Request, res, next) => {
  try {
    const { conversationIdOrAddressee, message } = req.body as SendMessageReq;
    const Message = messageModel();
    const Conversation = conversationModel();
    let conversation = await Conversation.findById(conversationIdOrAddressee);
    if (!conversation?._id)
      conversation = await new Conversation({
        ...(req.user.type === "host"
          ? { hostId: req.user._id }
          : { memberId: req.user._id }),
        ...(req.user.type === "member"
          ? { memberId: conversationIdOrAddressee }
          : { hostId: conversationIdOrAddressee }),
      }).save();
    if (
      req.user._id !== conversation.hostId &&
      req.user._id !== conversation.memberId
    )
      return res.status(401).send("You are not part of the conversation");
    const newMessage = new Message({
      ownerId: req.user._id.toString(),
      conversationId: conversation._id,
      message,
    });

    await newMessage.save();

    return res.status(201).json("Message Sent");
  } catch (e) {
    next(e);
  }
});

export default router;
