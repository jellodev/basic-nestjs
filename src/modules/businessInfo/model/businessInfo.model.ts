import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BusinessInfo {
  @Field(() => String, { description: 'business Number' })
  businessNo: number;

  @Field(() => String, { description: 'FAX' })
  fax: string;

  @Field(() => String, { description: 'address' })
  address: string;
}
