import { Module } from '@nestjs/common';
import { PingService } from './ping.service';
import { PingResolver } from './ping.resolver';

@Module({
  providers: [PingService, PingResolver]
})
export class PingModule {}
