import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Unique identifier' })
  id: number;

  @Field(() => String, { description: 'Unique username' })
  username: string;

  @Field(() => String, { description: 'Password' })
  password: string;

  @Field(() => String, { description: 'Name' })
  name: string;

  @Field({ nullable: true, description: 'Email' })
  email?: string;
}
