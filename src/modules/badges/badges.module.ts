import { Module } from '@nestjs/common';
import { BadgesController } from './badges.controller';
import { BadgesService } from './badges.service';

@Module({
  controllers: [BadgesController],
  providers: [BadgesService]
})
export class BadgesModule {}
