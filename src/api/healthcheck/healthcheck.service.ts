import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HealthcheckService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public async checkHealth() {
    switch (this.connection.readyState) {
      case 0:
        return { status: 'connecting' };
      case 1:
        return { status: 'connected' };
      case 2:
        return { status: 'disconnecting' };
      case 3:
        return { status: 'disconnected' };
      default:
        return { status: 'unknown' };
    }
  }
}
