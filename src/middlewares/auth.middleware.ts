import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Giả sử bạn đã giải mã token và có thông tin người dùng ở đây
        const token = req.headers.authorization?.split("Bearer ")?.[1] ?? undefined;

        if (token) {
            try {
                const decodedToken = verify(token, process.env.JWT_SECRET); // Thay 'your-secret-key' bằng secret key thực tế
                req["auth"] = decodedToken;
            } catch (error) {
                // Xử lý lỗi xác thực token (ví dụ: token hết hạn, không hợp lệ)
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
        next();
    }
}
