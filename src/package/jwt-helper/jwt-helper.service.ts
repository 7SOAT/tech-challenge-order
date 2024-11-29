import { Injectable, Logger } from '@nestjs/common';
import { decodeJwt, JWTPayload } from 'jose';

@Injectable()
export class JwtHelperService {
  private readonly logger = new Logger(JwtHelperService.name, {
    timestamp: true,
  });
  constructor() {}

  decodeToken(token: string): JWTPayload {
    this.logger.log('Decoding token');
    const decoded = decodeJwt(token);
    return decoded;
  }
}
