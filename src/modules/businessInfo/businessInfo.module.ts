import { Module } from '@nestjs/common';
import { BusinessInfoService } from './businessInfo.service';

@Module({
  providers: [BusinessInfoService],
  exports: [BusinessInfoService],
})
export class BusinessInfoModule {}
