import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ErrorCodeEnum, PUBLIC_PATH } from "@src/config";
import { HandleError } from "@src/utils";

@Injectable()
export class UserGuard extends AuthGuard("jwt-user") {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info, context) {
        if (!PUBLIC_PATH?.includes(context?.getRequest()?.route.path)) {
            // You can throw an exception based on either "info" or "err" arguments
            if (info?.name === "TokenExpiredError") {
                HandleError(info, ErrorCodeEnum.UNAUTHORIZED, 401);
            }
            if (err || !user) {
                HandleError("unAthorized!", ErrorCodeEnum.UNAUTHORIZED, 401);
                //   throw err || new UnauthorizedException();
            }
        }
        return user;
    }
}
