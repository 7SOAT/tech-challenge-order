import { Module } from '@nestjs/common';
import { JwtHelperService } from './jwt-helper.service';

@Module({
  imports: [],
  controllers: [],
  providers: [JwtHelperService],
  exports: [JwtHelperService],
})
export class JwtHelperModule {}
