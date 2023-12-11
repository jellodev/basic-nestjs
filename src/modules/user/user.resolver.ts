import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { BusinessInfo } from '../businessInfo/model/businessInfo.model';
import { BusinessInfoService } from '../businessInfo/businessInfo.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly businessInfoService: BusinessInfoService,
  ) {}

  @Query(() => User, { name: 'user' })
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @ResolveField(() => BusinessInfo, { name: 'businessInfo' })
  async businessInfo(@Parent() user: User): Promise<BusinessInfo> {
    return await this.businessInfoService.findOne(user.id);
  }
}
