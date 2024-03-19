import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const decoded = jwt.verify(token, process.env.STRONG_KEY) as { adminId: string };
            req.adminId = decoded.adminId;
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}