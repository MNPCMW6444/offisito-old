/*
import pairModel from "../../../mongo/contacts/pairModel";
import {composeWithMongoose} from "graphql-compose-mongoose";
import {safeResolvers} from "../../schema";
import sessionModel from "../../../mongo/messages/sessionModel";

let SessionTC;

export default () => {
    if (!SessionTC) {

        const Pair = pairModel();
        const Session = sessionModel();


        try {
            SessionTC = composeWithMongoose(Session);
        } catch (e) {
            SessionTC = composeWithMongoose(Session, {resolvers: safeResolvers, name: "newsession"});
        }

        SessionTC.addResolver({
            name: 'getsessions',
            type: [SessionTC],
            args: {pairId: 'String!'},
            resolve: async ({context, args}) => {
                if (!context.user) throw new Error("Please sign in first");
                const pair = await Pair.findById(args.pairId);
                return (await Session.find({pairId: pair._id})).filter(session => (!(session.hiddenFor === context.user._id.toString() || session.hiddenFor === "all")))
            }
        });

        SessionTC.addResolver({
            name: 'createsession',
            type: SessionTC,
            args: {pairId: 'String!', sessionName: 'String!', role: 'String'},
            resolve: async ({context, args}) => {
                if (!context.user) throw new Error("Please sign in first");

                const newSession = new Session({
                    pairId: args.pairId,
                    roleId: args.role || "null",
                    name: args.sessionName
                });
                return newSession.save();
            }
        });

        SessionTC.addResolver({
            name: 'renamesession',
            type: SessionTC,
            args: {sessionId: 'String!', newName: 'String!'},
            resolve: async ({context, args}) => {
                if (!context.user) throw new Error("Please sign in first");

                const session = await Session.findById(args.sessionId);
                if (!session) throw new Error("Session not found");

                // Additional checks can be added here to make sure that the user has permission to rename the session
                session.name = args.newName;
                await session.save();
                return session;
            }
        });

        SessionTC.addResolver({
            name: 'deleteSession',
            type: 'String',
            args: {
                sessionId: 'String!',
            },
            resolve: async ({args, context}) => {
                if (!context.user) throw new Error("You are not signed in");
                const session = await Session.findById(args.sessionId);
                if (!session) throw new Error("Session not found");
                if (session.hiddenFor) session.hiddenFor = "all"; else session.hiddenFor = context.user._id.toString();
                await session.save();
                return "good";
            }
        });


    }

    return SessionTC;
}
*/
