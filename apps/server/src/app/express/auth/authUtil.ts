import jsonwebtoken, {JwtPayload} from "jsonwebtoken";
import * as process from "process";
import userModel from "../../mongo/auth/userModel";


export const authUser = async (token: string) => {
    try {
        if (!token) return null;
        const validatedUser = jsonwebtoken.verify(
            token as string,
            process.env.JWT + ""
        );
        return userModel().findById((validatedUser as JwtPayload).id);
    } catch (err) {
        return null;
    }
};
