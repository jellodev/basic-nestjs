import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { BusinessInfoModule } from '../businessInfo/businessInfo.module';

@Module({
  imports: [BusinessInfoModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
