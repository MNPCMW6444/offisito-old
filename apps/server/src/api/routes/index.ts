import { AuthenticatedRequest } from "../middleware";
import { Response, NextFunction } from "express";
import { 
  MissingInputError,
  ResourceNotFoundError
 } from "@offisito/shared";

export interface APIResponse {
  code: number;
  body: {};
}

export default (handler: (req: AuthenticatedRequest) => Promise<APIResponse>) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { code, body } = await handler(req);
      if (code >= 500) throw Error("Internal Server Error");
      const ret = res.status(code);
      return typeof body === "string" ? ret.send(body) : ret.json(body);
    } catch (err) {
      const findError = identifyError(err);
      if(findError)
        {
          const ret = res.status(findError.code);
          return ret.send(findError.body);
        }
      next(err);
    }
  };

const identifyError = (error:Error) : APIResponse  => {
  if(error instanceof MissingInputError){
    return  {code: 400, body: error.message}
  }
  if(error instanceof ResourceNotFoundError){
    return  {code: 404, body: error.message}
    }

  return undefined;
}

